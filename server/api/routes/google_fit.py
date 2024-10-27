import logging

from fastapi import APIRouter, Depends, Response
from google_fit_service.load_data import get_fitness_data
from model.google_fit import GoogleFit
# from dependencies.database import get_db_session

from fastapi.security import OAuth2PasswordBearer
from data.database import get_db_session
from pydantic import BaseModel



logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-google-fit-report", tags=["Create-Google-Report"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



@router.post("/")
def create_report(response: Response, token: str = Depends(oauth2_scheme), db_session = Depends(get_db_session)):

    results = get_fitness_data(token=token)

    for key in results.keys():
        new_report = GoogleFit(key, results[key], token)
        db_session.add(new_report)
    db_session.commit()
