import logging

from fastapi import APIRouter, Depends, Response
from model.health_report import HealthReport
# from dependencies.database import get_db_session

from data.database import get_db_session
from pydantic import BaseModel



logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-health-report", tags=["Create-Medication"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

class BodyReport(BaseModel):
    id: int
    report_text: str
    file_name: str
    file_path: str
    user_id: str

@router.post("/create-health-report")
def create_report(report: BodyReport, response: Response, db_session = Depends(get_db_session)):
    report_text = report.report_text

    logger.info("Report: " + report_text)

    new_report = HealthReport(1, report_text, report.file_name, report.file_path, report.user_id)

    db_session.add(new_report)
    db_session.commit()