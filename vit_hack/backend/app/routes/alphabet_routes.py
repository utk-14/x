from fastapi import APIRouter, Depends, Body
from typing import List, Dict, Any

from app.utils.user_helper import verify_user
from app.utils.jwt_handler import get_current_user

from app.models.alphabet_model import TypingTestRequest
from app.services.alphabet_service import handle_typing_test
from app.services.mistake_service import (
    evaluate_final_test,
    get_user_mistakes
)
from app.services.report_service import generate_report

router = APIRouter(prefix="/alphabet", tags=["Alphabet"])


# ✅ TYPING TEST
@router.post("/test/typing")
def typing_test(data: TypingTestRequest, user=Depends(get_current_user)):
    user_id = verify_user(user)
    return handle_typing_test(data.expected, data.actual, user_id)


# ✅ FINAL TEST (FIXED PROPERLY)
@router.get("/final-test")
def get_final_test(user=Depends(get_current_user)):
    user_id = verify_user(user)

    # Generate 10 random mixed case questions
    import random
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    questions = [random.choice(letters) for _ in range(10)]

    print("🎯 FINAL TEST QUESTIONS:", questions)  # debug

    return questions   # 🔥 Return array of 10 mixed case letters


# ✅ SUBMIT FINAL TEST
@router.post("/final-test/submit")
def submit_final_test(
    answers: List[Dict[str, Any]] = Body(...),
    user=Depends(get_current_user)
):
    user_id = verify_user(user)

    return evaluate_final_test(user_id, answers)


# ✅ REPORT
@router.get("/report")
def report(user=Depends(get_current_user)):
    user_id = verify_user(user)
    return generate_report(user_id, "alphabet")