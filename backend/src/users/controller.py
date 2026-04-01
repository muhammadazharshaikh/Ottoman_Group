from sqlalchemy.orm import Session
from src.users.schema import UserLoginSchema
from src.users.model import UserModel
from fastapi import HTTPException
import jwt
from src.utils.helper_methods import verify_password
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
load_dotenv()


def login_user(body:UserLoginSchema, db:Session):
    data = body.model_dump()
    # Match Email and Password
    user = db.query(UserModel).filter(UserModel.email == data['email']).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found with this email.")
    if not verify_password(data['password'], user.password):
        raise HTTPException(status_code=401, detail="Incorrect password.")
    
    # Generate JWT Token
    expTime = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    payload = {
        "user_id": user.userId,
        "email": user.email,
        "exp": datetime.now() + timedelta(minutes=expTime)
    }
    token = jwt.encode(payload, os.getenv("SECRET_KEY"), os.getenv("ALGORITHM"))
    
    return token