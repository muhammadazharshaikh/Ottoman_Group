from dotenv import load_dotenv
from fastapi import FastAPI
from src.utils.db import Base, engine
from src.users.model import UserModel
from src.users import router as user_router

load_dotenv()

try:
    Base.metadata.create_all(engine)
    print("Database tables created successfully.")
except Exception as e:
    print(f"Error creating database tables: {e}")
    
app = FastAPI()

app.include_router(user_router.user_routes)