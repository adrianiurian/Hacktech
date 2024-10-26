from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..data.database import Base  # Adjust this import based on your project structure
from .users import User  # Adjust this import based on your project structure


class Symptom(Base):
    __tablename__ = 'symptoms'

    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String(255), nullable=False)  # Text of the symptom
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey to users.id
    user = relationship("User")  # Define relationship to Users model

    def __init__(self, id=None, text=None, user_id=None):
        self.id = id
        self.text = text
        self.user_id = user_id

    def __repr__(self):
        return f"<Context(id={self.id}, text={self.text}, user_id={self.user_id})>"
