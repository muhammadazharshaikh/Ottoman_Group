from pwdlib import PasswordHash
from fastapi import HTTPException, Request, Depends, status
from sqlalchemy.orm import Session
import jwt
from jwt import InvalidTokenError
from src.users.model import UserModel
from src.projects.model import Projects
from src.flats.model import Flats
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
    

def generate_project_id(db: Session):
    # 1. Sab se last project uthao
    last_project = db.query(Projects).order_by(Projects.id.desc()).first()
    
    if not last_project:
        return "PRJ-00001"
    
    # 2. Last ID se number nikalo (e.g., "PRJ-00003" -> 3)
    # last_project.projectId.split('-')[1] se "00003" milega
    last_id_number = int(last_project.projectId.split('-')[1])
    
    # 3. Increment karo
    new_id_number = last_id_number + 1
    
    # 4. Wapis format karo (zfill use hota hai zeros ke liye)
    return f"PRJ-{str(new_id_number).zfill(5)}"

def generate_flat_id(db: Session):
    last_flat = db.query(Flats).order_by(Flats.id.desc()).first()
    
    if not last_flat:
        return "FLT-00001"
    
    last_id_number = int(last_flat.flatId.split('-')[1])
    
    # 3. Increment karo
    new_id_number = last_id_number + 1
    
    # 4. Wapis format karo (zfill use hota hai zeros ke liye)
    return f"FLT-{str(new_id_number).zfill(5)}"