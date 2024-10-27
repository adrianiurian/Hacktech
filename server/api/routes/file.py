import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
from fastapi.security import OAuth2PasswordBearer
from model.users import User
# from dependencies.database import get_db_session

from data.database import get_db_session
from api.services.user_service import get_or_create_user

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/file", tags=["Files"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/work-file")
def work_file(response: Response, uploaded_file: UploadFile, token: str = Depends(oauth2_scheme), db_session=Depends(get_db_session)):
    logger.info(uploaded_file.headers["content-type"])

    