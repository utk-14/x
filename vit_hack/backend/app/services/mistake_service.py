from datetime import datetime
from app.database.mistake_collection import mistakes_collection
from app.database.final_result_collection import final_result_collection


# ✅ STORE MISTAKE
def store_mistake(user_id, module, submodule, expected, actual, mistake_type):
    print("✅ STORING MISTAKE:", expected, actual)  # debug

    mistakes_collection.insert_one({
        "user_id": user_id,
        "module": module,
        "submodule": submodule,
        "expected": expected,
        "actual": actual,
        "mistake_type": mistake_type,
        "timestamp": datetime.utcnow()
    })


# ✅ GET RAW MISTAKES (IMPORTANT FIX)
def get_user_mistakes(user_id, module):
    mistakes = list(mistakes_collection.find({
        "user_id": user_id,
        "module": module
    }))

    print("📦 MISTAKES FROM DB:", mistakes)  # debug

    return mistakes   # 🔥 RETURN FULL OBJECTS (NOT JUST LETTERS)


# ✅ FINAL TEST EVALUATION
def evaluate_final_test(user_id, answers):

    mistakes = list(mistakes_collection.find({
        "user_id": user_id,
        "module": "alphabet"
    }))

    # unique letters user got wrong before
    unique_letters = list(dict.fromkeys([
        m["expected"] for m in mistakes if "expected" in m
    ]))

    total = len(unique_letters)
    correct = 0

    for item in answers:
        expected = item["expected"]
        actual = item["actual"]

        if expected.lower() == actual.lower():
            correct += 1

    result = {
        "user_id": user_id,
        "module": "alphabet",
        "total_mistakes": total,
        "correct_in_final": correct,
        "improved": correct,
        "remaining_errors": total - correct
    }

    # ✅ SAVE RESULT
    final_result_collection.update_one(
        {"user_id": user_id, "module": "alphabet"},
        {"$set": result},
        upsert=True
    )

    return {
        "total_mistakes": total,
        "correct_in_final": correct,
        "improved": correct,
        "remaining_errors": total - correct
    }