from app.services.ai_service import get_explanation_and_practice
from app.services.mistake_service import store_mistake   # 🔥 ADD THIS


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

    # 🔥🔥🔥 ADD THIS BLOCK (THIS IS YOUR BUG FIX)
    store_mistake(
        user_id=user_id,
        module="alphabet",
        submodule="typing",
        expected=expected,
        actual=actual,
        mistake_type=f"{expected}/{actual}"
    )

    print("✅ MISTAKE STORED:", expected, actual)  # debug

    # ❌ wrong → call AI
    ai_response = get_explanation_and_practice(expected, actual)

    return {
        "correct": False,
        "expected": expected,
        "actual": actual,
        "message": ai_response.get("message", f"'{actual}' is not correct"),
        "practice": ai_response.get("practice", [])
    }