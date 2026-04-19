# from app.services.mistake_service import store_mistake
# from app.services.ai_service import get_explanation_and_practice
# from ..utils.comparison import compare_text

# def handle_typing_test(expected: str, actual: str, user_id="demo_user"):
#     result = compare_text(expected, actual)

#     if result["correct"]:
#         return {
#             "correct": True,
#             "message": "Correct! ✅",
#             "next_action": "continue"
#         }

#     # 🔥 store mistake
#     store_mistake(
#         user_id=user_id,
#         module="alphabet",
#         submodule="A-E",
#         expected=expected,
#         actual=actual,
#         mistake_type=f"{expected}/{actual}"
#     )

#     # AI response
#     ai_response = get_explanation_and_practice(expected, actual)

#     return {
#         "correct": False,
#         "message": ai_response["explanation"],
#         "practice": ai_response["practice"],
#         "next_action": "continue"
#     }


# app/services/alphabet_service.py
from app.services.ai_service import get_explanation_and_practice


def normalize(text):
    text = text.lower().strip()

    mapping = {
        "bee": "b",
        "see": "c",
        "dee": "d",
        "ee": "e"
    }

    return mapping.get(text, text)


def handle_typing_test(expected, actual, user_id=None):
    expected_n = normalize(expected)
    actual_n = normalize(actual)

    is_correct = expected_n == actual_n

    if is_correct:
        return {
            "correct": True,
            "expected": expected,
            "actual": actual,
            "message": "Correct! Well done!",
            "practice": []
        }

    # ❌ wrong → call AI
    ai_response = get_explanation_and_practice(expected, actual)

    return {
        "correct": False,
        "expected": expected,
        "actual": actual,
        "message": ai_response.get("message", f"'{actual}' is not correct"),
        "practice": ai_response.get("practice", [])
    }