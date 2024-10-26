from sqlalchemy import Column, Integer, String, ForeignKey
from ..data.database import Base
from sqlalchemy.orm import relationship
from users import User


class HealthReport(Base):
    __tablename__ = 'health_report'
    id = Column(Integer, primary_key=True)
    report_text = Column(String(512), nullable=True)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    user = relationship(User)

    def __init__(self, id, text, user_id) -> None:
        self.id = id
        self.text = text
        self.user_id = user_id

    def __repr__(self) -> str:
        return f'<HealthReport:\n \
                id: {self.id}\n \
                text: {self.text} \
                user_id: {self.user_id}>'