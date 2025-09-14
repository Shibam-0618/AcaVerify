from models import SimulateVerificationInput, SimulateVerificationOutput
from ocr_service import extract_text_from_datauri

def simulate_verification(input: SimulateVerificationInput) -> SimulateVerificationOutput:
    ocr_results = extract_text_from_datauri(input.documentDataUri)
    texts = " ".join([r["text"] for r in ocr_results])

    if input.certificateId in texts:
        return SimulateVerificationOutput(
            isValid=True,
            reason=f"Certificate ID {input.certificateId} found in OCR text."
        )
    else:
        return SimulateVerificationOutput(
            isValid=False,
            reason=f"Certificate ID {input.certificateId} NOT found in OCR text."
        )
