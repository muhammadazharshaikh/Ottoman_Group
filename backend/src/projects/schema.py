from pydantic import BaseModel

class UserMinimal(BaseModel):
    userId:int
    fullName:str

    class Config:
        from_attributes = True

class ProjectResponseSchema(BaseModel):
    id:int
    projectId:str
    name:str
    location:str
    totalFlats:int
    totalFloors:int
    description:str
    status:bool
    creator:UserMinimal

    class Config:
        from_attributes = True

class ProjectSchema(BaseModel):
    name:str
    location:str
    totalFlats:int
    totalFloors:int
    description:str | None