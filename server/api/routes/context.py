import logging

from fastapi import APIRouter, Depends, Response
from model.context import Context
# from dependencies.database import get_db_session

from data.database import get_db_session
from pydantic import BaseModel



logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/create-context", tags=["Create-Context"], include_in_schema=False)

INFERENCE_LINK = "https://inference.ccrolabs.com/api/generate"

class BodyContext(BaseModel):
    text: str

@router.post("/")
def create_report(context: BodyContext, response: Response, db_session = Depends(get_db_session)):
    context_text = context.text

    logger.info("Context: " + context_text)

    new_report = Context(context.text, "1234")

    db_session.add(new_report)
    db_session.commit()