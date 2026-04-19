# app/services/ai_service.py
import os
import requests
import json
from app.ai.prompts import EXPLAIN_AND_PRACTICE_PROMPT

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_explanation_and_practice(expected: str, actual: str):
    prompt = EXPLAIN_AND_PRACTICE_PROMPT.format(
        expected=expected,
        actual=actual
    )

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=10
        )

        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            return get_fallback_response(expected, actual)

        data = response.json()

        if "choices" not in data or len(data["choices"]) == 0:
            print(f"Unexpected response: {data}")
            return get_fallback_response(expected, actual)

        content = data["choices"][0]["message"]["content"]

        try:
            parsed = json.loads(content)
            # Handle both 'practice_exercises' and 'practice' keys
            practice = parsed.get("practice_exercises") or parsed.get("practice", [])
            return {
                "explanation": parsed.get("explanation", f"'{actual}' should be '{expected}'"),
                "practice_exercises": practice if practice else [f"Practice typing {expected}"]
            }
        except json.JSONDecodeError:
            return {
                "explanation": content,
                "practice_exercises": [f"Practice typing {expected} 5 times"]
            }

    except Exception as e:
        print(f"AI Service Error: {str(e)}")
        return get_fallback_response(expected, actual)


def get_fallback_response(expected: str, actual: str):
    return {
        "explanation": f"'{actual}' is not correct. The correct letter is '{expected}'. Keep practicing!",
        "practice_exercises": [
            f"Practice typing '{expected}' 5 times",
            f"Say the sound of '{expected}' out loud"
        ]
    }