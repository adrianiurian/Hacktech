import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
from fastapi.security import OAuth2PasswordBearer
from model.users import User
# from dependencies.database import get_db_session

from data.database import get_db_session
from api.services.user_service import get_or_create_user
from api.services.file_service import extract_text, write_file

from model.health_report import HealthReport

import base64

import requests
import json

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/file", tags=["Files"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/work-file")
def work_file(response: Response, uploaded_file: UploadFile, token: str = Depends(oauth2_scheme), db_session=Depends(get_db_session)):
    get_or_create_user(token, db_session)
    logger.info(uploaded_file.headers["content-type"])

    text = extract_text(uploaded_file, uploaded_file.headers["content-type"])

    PROMPT = """
    You are a helpful assistant specialized in medical tasks. You will be given a health report of any type and should summary it extensively keeping attention to health problems and unhealthy levels.
    You will respond only with the summary and nothing else.
    Report:
    """ + text + """
    Please respond only in valid json and in the following format:
    {
        "report-type": "str",
        "summary": "str"
    }
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

    res = requests.post(INFERENCE_LINK, headers=headers, data=json.dumps(data))

    report = HealthReport(
        text=res.json("response"),
        user_id=token,
        file_path=f"./media/{uploaded_file.filename}"
    )

    db_session.add(report)
    db_session.commit()

    return res.json()["response"]