import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
# from dependencies.database import get_db_session

import base64

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/prompting", tags=["Prompting"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"