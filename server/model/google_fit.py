from sqlalchemy import Column, String, ForeignKey, Integer
from data.database import Base
from sqlalchemy.orm import relationship
from model.users import User


class GoogleFit(Base):
    __tablename__ = 'google_fit'
    id = Column(Integer, primary_key=True, autoincrement=True)
    parameter_name = Column(String(255), nullable=False)
    parameter_value = Column(String(255), nullable=False)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    user = relationship(User)

    def __init__(self, id, parameter_name, parameter_value, user_id) -> None:
        self.id = id
        self.parameter_name = parameter_name
        self.parameter_value = parameter_value
        self.user_id = user_id

    def __repr__(self) -> str:
        return f'<GoogleFit:\n \
                id: {self.id}\n \
                parameter_name: {self.parameter_name} \
                parameter_value: {self.parameter_value} \
                user_id: {self.user_id}>'
