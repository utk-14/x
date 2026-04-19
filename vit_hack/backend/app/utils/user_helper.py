from fastapi import HTTPException
from app.config.db import users_collection
from bson import ObjectId

def verify_user(user):
    user_id = user.get("user_id")

    try:
        db_user = users_collection.find_one({"_id": ObjectId(user_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return user_id