from pydantic import BaseModel

class TypingTestRequest(BaseModel):
    expected: str   # what system asks
    actual: str     # what user types

class SpeakingTestRequest(BaseModel):
    expected: str
    transcript: str   # text from STT

class TestResponse(BaseModel):
    correct: bool
    expected: str
    actual: str
    error_position: int | None = None
    message: str