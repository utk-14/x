def compare_text(expected: str, actual: str):
    expected = expected.lower().strip()
    actual = actual.lower().strip()

    if expected == actual:
        return {
            "correct": True,
            "error_position": None
        }

    # find first mismatch
    min_len = min(len(expected), len(actual))

    for i in range(min_len):
        if expected[i] != actual[i]:
            return {
                "correct": False,
                "error_position": i
            }

    # length mismatch case
    return {
        "correct": False,
        "error_position": min_len
    }