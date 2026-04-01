from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from src.utils.db import Base

class UserModel(Base):
    __tablename__ = "users"

    userId = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String, unique=True)
    fullName = Column(String)
    phoneNumber = Column(String)
    status = Column(Boolean, default=True)
    lastLogin = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    otp = Column(String)
    otpExpiry = Column(DateTime)
    deletedAt = Column(DateTime, default=None)