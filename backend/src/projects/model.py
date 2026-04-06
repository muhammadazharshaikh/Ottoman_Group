from src.utils.db import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Projects(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    totalFlats = Column(Integer, nullable=False)
    totalFloors = Column(Integer, nullable=False)
    description = Column(String)
    status = Column(Boolean, default=True)
    createdBy = Column(Integer, ForeignKey("users.userId"), nullable=False)
    deletedAt = Column(DateTime, default=None)

    creator = relationship("UserModel")