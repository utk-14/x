from app.database.mistake_collection import mistakes_collection
from app.database.final_result_collection import final_result_collection

def generate_report(user_id, module, total_questions=20):

    mistakes = list(mistakes_collection.find({
        "user_id": user_id,
        "module": module
    }))

    total_mistakes = len(mistakes)

    accuracy_before = ((total_questions - total_mistakes) / total_questions) * 100

    # 🔥 fetch final test result
    final = final_result_collection.find_one({
        "user_id": user_id,
        "module": module
    })

    # ✅ FIX: remove ObjectId
    if final:
        final.pop("_id", None)

        correct = final["correct_in_final"]
        total = final["total_mistakes"]

        accuracy_after = (correct / total) * 100 if total > 0 else 0
    else:
        accuracy_after = 0

    return {
        "initial_mistakes": total_mistakes,
        "accuracy_before": round(accuracy_before, 2),
        "final_correct": final["correct_in_final"] if final else 0,
        "accuracy_after": round(accuracy_after, 2),
        "improved": final["improved"] if final else 0,
        "remaining_errors": final["remaining_errors"] if final else 0
    }