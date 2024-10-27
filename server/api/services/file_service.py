import io
from PyPDF2 import PdfReader

import os
import requests

ocr_key = os.getenv('OCR_KEY')

def extract_text(uploaded_file, type):
    data = ""
    extracted_bytes = ""
    if type == "application/pdf":
        extracted_bytes = uploaded_file.file.read()
        with io.BytesIO(extracted_bytes) as opened_pdf_file:
            reader = PdfReader(opened_pdf_file)
            for page in reader.pages:
                data += page.extract_text()
    if type == "text/plain":
        extracted_bytes = uploaded_file.file.read()
        data = extracted_bytes.decode("utf-8")
    if type == "image/png":
       payload = {'isOverlayRequired': False,
           'apikey': "K83832667288957",
           'language': "eng",
        }
       res = requests.post('https://api.ocr.space/parse/image',
                          files={uploaded_file.filename: uploaded_file.file},
                          data=payload,
                          )
       results = res.json()["ParsedResults"]
       extracted_bytes = uploaded_file.file.read()
       for result in results:
           data += result["ParsedText"]
    write_file(extracted_bytes, uploaded_file.filename)
    return data

def write_file(extracted_bytes, filename):
    with open("./media/" + filename, 'wb+') as f:
            f.write(extracted_bytes)