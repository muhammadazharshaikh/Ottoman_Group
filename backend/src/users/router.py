from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.users.schema import UserLoginSchema, UserSchema, UserResponseSchema, UserUpdateSchema
from src.users import controller

user_routes = APIRouter(prefix="/users")

# User Login
@user_routes.post("/login", status_code=status.HTTP_200_OK)
def login(body:UserLoginSchema, db:Session = Depends(get_db)):
    return controller.login_user(body, db)

# Create User
@user_routes.post("/create", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
def create_user(body:UserSchema, db:Session = Depends(get_db)):
    return controller.create_user(body, db)

# Update User
@user_routes.put("/update/{userId}", response_model=UserResponseSchema, status_code=status.HTTP_200_OK)
def update_user(userId:int, body:UserUpdateSchema, db:Session = Depends(get_db)):
    return controller.update_user(userId, body, db)

# Delete User
@user_routes.delete("/delete/{userId}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(userId:int, db:Session = Depends(get_db)):
    return controller.delete_user(userId, db)

# Get User by ID
@user_routes.get("/user/{userId}", response_model=UserResponseSchema, status_code=status.HTTP_200_OK)
def get_user_by_id(userId:int, db:Session = Depends(get_db)):
    return controller.get_user_by_id(userId, db)

# Get All Users
@user_routes.get("/all", response_model=list[UserResponseSchema], status_code=status.HTTP_200_OK)
def get_all_users(db:Session = Depends(get_db)):
    return controller.get_all_users(db)
