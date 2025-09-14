from fastapi import FastAPI
from models import SimulateVerificationInput, SimulateVerificationOutput, OcrResponse
from ocr_service import extract_text_from_datauri
from verification_service import simulate_verification

app = FastAPI()

@app.post("/ocr", response_model=list[OcrResponse])
async def run_ocr(input: SimulateVerificationInput):
    return extract_text_from_datauri(input.documentDataUri)

@app.post("/verify", response_model=SimulateVerificationOutput)
async def verify(input: SimulateVerificationInput):
    return simulate_verification(input)
