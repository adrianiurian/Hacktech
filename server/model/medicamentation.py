from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from data.database import Base  # Adjust this import based on your project structure
from model.users import User  # Adjust this import based on your project structure


class Medicamentation(Base):
    __tablename__ = 'medicamentation'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey to users.id
    user = relationship("User")  # Define relationship to Users model

    def __init__(self, id=None, name=None, user_id=None):
        self.id = id
        self.name = name
        self.user_id = user_id

    def __repr__(self):
        return f"<Medicamentation(id={self.id}, name={self.name}, user_id={self.user_id})>"
