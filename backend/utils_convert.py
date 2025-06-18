from pathlib import Path
from uuid import uuid4

import pdfkit
from fastapi import HTTPException, UploadFile


def convert_html_to_pdf_logic(html_file: UploadFile, pdf_output_dir: Path) -> Path:
    if html_file.content_type not in {"text/html", "application/xhtml+xml"}:
        raise HTTPException(400, "HTML 파일을 업로드해주세요.")

    html_raw = html_file.file.read().decode("utf-8", "replace")

    stem = Path(html_file.filename or "document").stem
    pdf_name = f"{stem}_{uuid4().hex}.pdf"
    pdf_path = pdf_output_dir / pdf_name

    options = {
        'disable-smart-shrinking': '',
        'margin-top': '0',
        'margin-bottom': '0',
        'margin-left': '0',
        'margin-right': '0'
    }
    
    pdfkit.from_string(html_raw, str(pdf_path), options=options)
    return pdf_path
