from sqlalchemy import Column, String, ForeignKey, Integer
from data.database import Base
from sqlalchemy.orm import relationship
from model.users import User


class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    question_text = Column(String(255), nullable=False)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    user = relationship(User)

    def __init__(self, id, question_text, user_id) -> None:
        self.id = id
        self.question_text = question_text
        self.user_id = user_id

    def __repr__(self) -> str:
        return f'<Question:\n \
                id: {self.id}\n \
                question_text: {self.question_text} \
                user_id: {self.user_id}>'
