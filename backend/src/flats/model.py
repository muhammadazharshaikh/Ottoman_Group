from src.utils.db import Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, Boolean
import enum
from sqlalchemy.orm import relationship
from datetime import datetime

# flat type options
class FlatType(enum.Enum):
    residential = "residential"
    commercial = "commercial"

# flat status options
class FlatStatus(enum.Enum):
    available = "available"
    booked = "booked"
    blocked = "blocked"
    sold = "sold"

class Flats(Base):
    __tablename__ = "flats"
    
    id = Column(Integer, primary_key=True)
    flatId = Column(String, unique=True, nullable=False)
    project = Column(Integer, ForeignKey("projects.id"), nullable=False)
    flatNumber = Column(String, nullable=False)
    floor = Column(Integer, nullable=False)
    size = Column(Integer, nullable=False)
    type = Column(Enum(FlatType), nullable=False, default=FlatType.residential)
    flatStatus = Column(Enum(FlatStatus), nullable=False, default=FlatStatus.available)
    status = Column(Boolean, default=True)
    description = Column(String)
    createdBy = Column(Integer, ForeignKey("users.userId"), nullable=False)
    deletedAt = Column(DateTime, default=None)
    createdAt = Column(DateTime, default=datetime.now())

    creator = relationship("UserModel")
    ParentProject = relationship("Projects")