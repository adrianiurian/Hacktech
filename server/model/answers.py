from sqlalchemy import Column, String, ForeignKey, Integer
from data.database import Base
from sqlalchemy.orm import relationship
from model.users import User
from model.questions import Question


class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    answer_text = Column(String(255), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    question = relationship(Question)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    user = relationship(User)

    def __init__(self, question_id, answer_text, user_id) -> None:
        self.question_id = question_id
        self.answer_text = answer_text
        self.user_id = user_id

    def __repr__(self) -> str:
        return f'<Answer:\n \
                id: {self.id}\n \
                question_id: {self.question_id} \
                answer_text: {self.answer_text} \
                user_id: {self.user_id}>'
