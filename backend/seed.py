from sqlalchemy.orm import Session
from src.utils.db import LocalSession
from src.users.model import UserModel
from contextlib import contextmanager
from src.utils.db import get_db
from src.utils.helper_methods import get_password_hash
import os
from dotenv import load_dotenv
load_dotenv()


def seed_admin():
    with contextmanager(get_db)() as db:
        try:
            # 1. Check Admin already exists or not
            admin_exists = db.query(UserModel).filter(UserModel.email == os.getenv("ADMIN_EMAIL")).first()
            
            if not admin_exists:
                print("Seeding admin user...")
                # convert password to hash before saving
                hashed_password = get_password_hash(os.getenv("ADMIN_PASSWORD"))
                admin_user = UserModel(
                    email="admin@example.com",
                    username="admin",
                    # Password hamesha hash kar ke save karein (abhi simple string hai)
                    password=hashed_password, 
                    fullName="System Admin",
                    status=True
                )
                db.add(admin_user)
                db.commit()
                print("Admin user created successfully!")
            else:
                print("Admin user already exists. Skipping...")
                
        except Exception as e:
            print(f"Error while seeding: {e}")
            db.rollback()
        finally:
            db.close()

if __name__ == "__main__":
    seed_admin()