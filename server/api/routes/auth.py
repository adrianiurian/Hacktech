import logging

from fastapi import APIRouter, Depends, Response, status, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi import Header
from fastapi.security import OAuth2PasswordBearer
from model.users import User
# from dependencies.database import get_db_session

from data.database import get_db_session

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Authorization"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/")
def create_user(response: Response, token: str = Depends(oauth2_scheme), db_session=Depends(get_db_session)):
    new_user = User(token)
    db_session.add(new_user)
    db_session.commit()
    return token