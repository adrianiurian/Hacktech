import logging

from fastapi import APIRouter, Depends, Response
from model.health_report import HealthReport

from fastapi.security import OAuth2PasswordBearer

# from dependencies.database import get_db_session

from data.database import get_db_session
from pydantic import BaseModel



logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-health-report", tags=["Create-Health-Report"], include_in_schema=False)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

class BodyReport(BaseModel):
    report_text: str
    file_name: str
    file_path: str

@router.post("/")
def create_report(report: BodyReport, response: Response, token: str = Depends(oauth2_scheme), db_session = Depends(get_db_session)):
    report_text = report.report_text

    logger.info("Report: " + report_text)

    new_report = HealthReport(report_text, report.file_name, report.file_path, token)

    db_session.add(new_report)
    db_session.commit()