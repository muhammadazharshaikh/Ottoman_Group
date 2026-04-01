from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.users.schema import UserLoginSchema
from src.users import controller

user_routes = APIRouter(prefix="/user")

# User Login
@user_routes.post("/login", status_code=status.HTTP_200_OK)
def login(body:UserLoginSchema ,db:Session = Depends(get_db)):
    return controller.login_user(body, db)