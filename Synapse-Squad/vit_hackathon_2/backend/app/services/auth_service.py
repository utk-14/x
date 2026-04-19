from app.config.db import users_collection
from app.utils.hash_password import hash_password, verify_password
from app.utils.jwt_handler import create_token

def signup_user(user):
    existing = users_collection.find_one({"email": user.email})
    if existing:
        return {"error": "User already exists"}

    hashed = hash_password(user.password)

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed
    })

    return {"message": "User created successfully"}

def login_user(user):
    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        return {"error": "User not found"}

    if not verify_password(user.password, db_user["password"]):
        return {"error": "Invalid password"}

    token = create_token({"user_id": str(db_user["_id"]), "email": db_user["email"]})

    return {"access_token": token, "token_type": "bearer"}