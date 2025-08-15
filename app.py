# pip install pymupdf pytesseract pillow google-generativeai

import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
import google.generativeai as genai

# Optional: set tesseract path on Windows if needed
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

pdf_path = "scanned.pdf"

# --- 1. Open PDF and run OCR directly ---
extracted_text = ""
doc = fitz.open(pdf_path)

for page_num in range(len(doc)):
    pix = doc[page_num].get_pixmap(dpi=300)  # render at high resolution
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    text = pytesseract.image_to_string(img)
    extracted_text += f"\n--- Page {page_num + 1} ---\n{text}"

print(extracted_text)
# --- 2. Send to Gemini for extraction ---
genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel("gemini-pro")

prompt = f"""
You are an information extraction assistant.
From the following info you are supposed to extract information and organize in a clean manner as shown in an example:
Address: 123 Example Road
Name: John Doe
Account Number: 1234
Here is the following information needed to be extracted
- Party names
- Dates
- Amounts
- Addresses


Text:
{extracted_text}
"""

response = model.generate_content(prompt)
print(response.text)
