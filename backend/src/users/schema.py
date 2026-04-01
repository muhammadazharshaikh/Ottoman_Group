from pydantic import BaseModel

class UserSchema(BaseModel):
    email:str
    password:str
    fullName:str
    phoneNumber:str

class UserLoginSchema(BaseModel):
    email:str
    password:str