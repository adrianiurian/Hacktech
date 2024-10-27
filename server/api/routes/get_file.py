import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from model.health_report import HealthReport
# from dependencies.database import get_db_session

from data.database import get_db_session
from pydantic import BaseModel

import base64

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-medication", tags=["Create-Medication"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

class HealthReportResponse(BaseModel):
    id: int
    report_text: str = None
    file_name: str
    file_path: str
    user_id: str

    class Config:
        orm_mode = True

@router.get("/health-report/", response_model=HealthReportResponse)
def get_health_report(file_path: str, file_name: str, db: Session = Depends(get_db)):
    report = db.query(HealthReport).filter_by(file_path=file_path, file_name=file_name).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report_json = jsonable_encoder({
        "id": report.id,
        "report_text": report.report_text,
        "file_name": report.file_name,
        "file_path": report.file_path,
        "user_id": report.user_id
    })
    
    return JSONResponse(content=report_json)