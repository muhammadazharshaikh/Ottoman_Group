from sqlalchemy.orm import Session
from src.users.schema import UserLoginSchema, UserSchema, UserUpdateSchema
from src.users.model import UserModel
from fastapi import HTTPException
import jwt
from src.utils.helper_methods import verify_password, get_password_hash
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
    
    # Update User Login Time
    user.lastLogin = datetime.now()
    db.commit()
    db.refresh(user)
    
    # Generate JWT Token
    expTime = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    payload = {
        "user_id": user.userId,
        "email": user.email,
        "exp": datetime.now() + timedelta(minutes=expTime)
    }
    token = jwt.encode(payload, os.getenv("SECRET_KEY"), os.getenv("ALGORITHM"))
    
    return {
        "token":token,
        "user":{"id": user.userId, "username": user.username, "fullName": user.fullName, "email": user.email}
    }

def create_user(body:UserSchema, db:Session):
    # username validation
    user = db.query(UserModel).filter(UserModel.username == body.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    # email validation
    user = db.query(UserModel).filter(UserModel.email == body.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    
    # hash password and create user
    hashed_password = get_password_hash(body.password)
    new_user = UserModel(
        username=body.username,
        email=body.email,
        password=hashed_password,
        fullName=body.fullName,
        phoneNumber=body.phoneNumber
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def update_user(userId:int, body:UserUpdateSchema, db:Session):
    print(body);
    user = db.query(UserModel).filter(UserModel.userId == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    # Update fields
    data = body.model_dump()
    for field, value in data.items():
        setattr(user, field, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Delete User 
def delete_user(userId:int, db:Session):
    user = db.query(UserModel).filter(UserModel.userId == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    user.deletedAt = datetime.now()
    user.status = False
    db.add(user)
    db.commit()
    return {"detail": "User deleted successfully."}

# Get User by ID
def get_user_by_id(userId:int, db:Session):
    user = db.query(UserModel).filter(UserModel.userId == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return user

# Get All Users
def get_all_users(db:Session, user:UserSchema):
    users = db.query(UserModel).filter(UserModel.status == True, UserModel.userId != user.userId).all()
    return users
