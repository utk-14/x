from app.utils.user_helper import verify_user
from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Dict, Any

from app.models.alphabet_model import TypingTestRequest
from app.services.alphabet_service import handle_typing_test
from app.services.mistake_service import evaluate_final_test, get_user_mistakes
from app.services.report_service import generate_report

from app.utils.jwt_handler import get_current_user

router = APIRouter(prefix="/alphabet", tags=["Alphabet"])


# ✅ TYPING TEST
@router.post("/test/typing")
def typing_test(
    data: TypingTestRequest,
    user=Depends(get_current_user)
):
    user_id = verify_user(user)
    return handle_typing_test(data.expected, data.actual, user_id)


# ✅ FINAL TEST (FIXED PROPERLY)
@router.get("/final-test")
def get_final_test(user=Depends(get_current_user)):
    user_id = verify_user(user)

    mistakes = get_user_mistakes(user_id, "alphabet")

    # 🔥 extract unique expected letters
    questions = list(dict.fromkeys([
        m["expected"] for m in mistakes if "expected" in m
    ]))

    print("🎯 FINAL TEST QUESTIONS:", questions)  # debug

    if not questions:
        return {
            "status": "no_mistakes",
            "questions": []
        }

    return {
        "status": "has_mistakes",
        "questions": questions
    }


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