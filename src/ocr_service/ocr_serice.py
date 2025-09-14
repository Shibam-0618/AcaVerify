import easyocr
from io import BytesIO
from PIL import Image
import base64, re

reader = easyocr.Reader(['en'])

def extract_text_from_datauri(data_uri: str):
    match = re.match(r"data:(.*?);base64,(.*)", data_uri)
    if not match:
        raise ValueError("Invalid data URI format")
    
    image_data = base64.b64decode(match.group(2))
    image = Image.open(BytesIO(image_data))

    results = reader.readtext(image)
    extracted = [{"text": text, "confidence": prob} for _, text, prob in results]
    return extracted
