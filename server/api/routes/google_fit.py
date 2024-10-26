import logging

from fastapi import APIRouter, Depends, Response
from model.google_fit import GoogleFit
# from dependencies.database import get_db_session

from data.database import get_db_session
from pydantic import BaseModel



logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-google-fit-report", tags=["Create-Google-Report"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

class GoogleFitReport(BaseModel):
    id: int
    parameter_name: str
    parameter_value: str

@router.post("/")
def create_report(report: GoogleFitReport, response: Response, db_session = Depends(get_db_session)):
    report_text = report.parameter_name + ':' + report.parameter_value

    logger.info("Google Report: " + report_text)

    new_report = GoogleFit(1, report.parameter_name, report.parameter_value, "1234")

    db_session.add(new_report)
    db_session.commit()