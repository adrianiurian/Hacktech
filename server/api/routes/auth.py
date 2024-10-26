import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
# from dependencies.database import get_db_session

import base64

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Authorization"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

@router.post("/create-user")
def create_user(response: Response, user_agent: str | None = Header(default=None)):
    logging.info(user_agent)
    return user_agent