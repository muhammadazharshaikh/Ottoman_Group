from pydantic import BaseModel
from datetime import datetime

class UserLoginSchema(BaseModel):
    email:str
    password:str

class UserSchema(BaseModel):
    username:str
    email:str
    fullName:str
    phoneNumber:str
    password:str

class UserResponseSchema(BaseModel):
    userId:int
    email:str
    username:str
    fullName:str
    phoneNumber:str
    status:bool
    lastLogin:datetime | None

class UserUpdateSchema(BaseModel):
    fullName:str
    phoneNumber:str