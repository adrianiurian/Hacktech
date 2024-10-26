from sqlalchemy import Column, String
from data.database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(String(255), primary_key=True)

    def __init__(self, id: str):
        self.id = id

    def __repr__(self):
        return f"User({id})"