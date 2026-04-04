from pwdlib import PasswordHash
from fastapi import HTTPException, Request, Depends, status
from sqlalchemy.orm import Session
import jwt
from jwt import InvalidTokenError
from src.users.model import UserModel
from src.utils.db import get_db
import os
from dotenv import load_dotenv
load_dotenv()

password_hash = PasswordHash.recommended()

def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

def is_auth(request:Request, db:Session = Depends(get_db)):
    try:
        token = request.headers.get("authorization")
        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized !")
        token = token.split(" ")[-1]

        # validate token
        data = jwt.decode(token, os.getenv("SECRET_KEY"), os.getenv("ALGORITHM"))
        user_id = data.get("user_id")
        email = data.get("email")


        # check user id has user or not
        user = db.query(UserModel).filter(UserModel.userId == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized !")
        # check email exist or not
        user = db.query(UserModel).filter(UserModel.email == email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized !")
        return user
    except InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized !")