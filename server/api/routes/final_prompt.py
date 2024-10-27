import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordBearer

# from dependencies.database import get_db_session

from pydantic import BaseModel
import json
import base64
import requests

from model.symptoms import Symptom
from model.users import User
from model.medicamentation import Medicamentation
from model.google_fit import GoogleFit
from model.questions import Question
from model.answers import Answer
from model.context import Context
from model.health_report import HealthReport
from data.database import get_db_session

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/prompting", tags=["Prompting"], include_in_schema=False)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

@router.get("/final_prompt")
def get_referrals(token = Depends(oauth2_scheme), db_session = Depends(get_db_session)):
    
    user = db_session.query(User).filter(User.id == token).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    answers = ' '.join([answer.answer_text for answer in db_session.query(Answer).filter(Answer.user_id == token).all()])
    contexts = ' '.join([context.text for context in db_session.query(Context).filter(Context.user_id == token).all()])
    google_fit_names = ' '.join([google_report.parameter_name for google_report in db_session.query(GoogleFit).filter(GoogleFit.user_id == token).all()])
    google_fit_values = ' '.join([google_report.parameter_value for google_report in db_session.query(GoogleFit).filter(GoogleFit.user_id == token).all()])
    health_reports = ' '.join([health_report.report_text for health_report in db_session.query(HealthReport).filter(HealthReport.user_id == token).all()])
    medicamentations = ' '.join([medicamentation.name for medicamentation in db_session.query(Medicamentation).filter(Medicamentation.user_id == token).all()])
    questions = ' '.join([question.question_text for question in db_session.query(Question).filter(Question.user_id == token).all()])
    symptoms = ' '.join([symptom.text for symptom in db_session.query(Symptom).filter(Symptom.user_id == token).all()])


    PROMPT = """
Predict the three most probable medical specialties where a patient should seek consultation.
Patient Information:
Symptoms:""" + symptoms + """
List the current symptoms reported by the patient.
Questions: """ + questions + """
Answers: """ + answers + """
List the additional questions and answers to understand the sympoms better
Medication:""" + medicamentations + """
List current medications, including dosage and frequency. If none, state "None".
Recent Context: """ + contexts + """
Describe any recent lifestyle changes, significant events, or environmental factors affecting the patient. If none, state "None".
Google Fitness Parameter Names: """ + google_fit_names + """
Google Fitness Parameter Values: """ + google_fit_values + """
Provide detailed fitness metrics such as average daily steps, sleep quality scores, heart rate variability, etc. If unavailable, state "None".
Medical History: """ + health_reports + """
Summarize the patient's medical history, including past diagnoses, procedures, and relevant medical documents. If unavailable, state "None".
Response Format:
Provide a JSON array with three objects, each representing a medical specialty recommendation. Each object should include:
name: (string) The name of the medical specialty.
probability: (float) The likelihood (between 0 and 1) that this specialty is relevant.
short_reason: (string) A brief explanation for why this specialty is recommended.
short_suggestion: (string) A concise recommendation for the patient.
Example:
Patient Information:
Symptoms: persistent fatigue, occasional dizziness, intermittent joint pain
Medication: metformin for diabetes management
Recent Context: recently returned from a high-altitude trip, experiencing increased stress due to work changes
Google Fitness Data: irregular sleep patterns with an average of 5 hours per night, resting heart rate of 72 bpm, blood pressure fluctuating between 120/80 and 140/90 mmHg, regular daily activity with moderate exercise, normal oxygen saturation levels, balanced nutrition, and average body temperature
Medical History: previous diagnosis of mild anemia, recent MRI showing slight brain white matter changes

[
    {
        "name": "Endocrinology",
        "probability": float
        "short_reason": "Symptoms of fatigue and joint pain may be related to diabetes management.",
        "short_suggestion": "Consult an endocrinologist to evaluate blood sugar levels and diabetes control."
    },
    {
        "name": "Neurology",
        "probability": float,
        "short_reason": "MRI findings and symptoms like dizziness and blurred vision suggest neurological evaluation.",
        "short_suggestion": "Seek a neurologist for further assessment of brain white matter changes."
    },
    {
        "name": "Rheumatology",
        "probability": float
        "short_reason": "Intermittent joint pain may indicate an underlying rheumatologic condition.",
        "short_suggestion": "Consider consulting a rheumatologist to investigate potential autoimmune disorders."
    }
]

    """
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3.1:70b",
        "format": "json",
        "prompt": PROMPT,
        "stream": False,
        "temperature": "0.15"
    }

    logger.info("Sending request")

    res = requests.post(INFERENCE_LINK, headers=headers, data=json.dumps(data))

    decoder = json.JSONDecoder()
    refferals = res.json()["response"]


    return decoder.decode(refferals)