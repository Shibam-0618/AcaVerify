from pydantic import BaseModel

class SimulateVerificationInput(BaseModel):
    certificateId: str
    documentDataUri: str  # base64 string with mimetype

class SimulateVerificationOutput(BaseModel):
    isValid: bool
    reason: str

class OcrResponse(BaseModel):
    text: str
    confidence: float
