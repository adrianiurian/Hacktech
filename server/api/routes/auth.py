import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
from fastapi.security import OAuth2PasswordBearer
# from dependencies.database import get_db_session

import base64

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Authorization"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/create-user")
def create_user(response: Response, token: str = Depends(oauth2_scheme)):
    return token