from fastapi import APIRouter
from app.schemas.paper import GenerateRequest, GenerateResponse

router = APIRouter()


@router.post("/docx", response_model=GenerateResponse)
def generate_docx(request: GenerateRequest):
    """
    Generate a DOCX file from paper data.
    Full implementation in Commit 8.
    """
    return GenerateResponse(
        download_url="/generated/sample.docx",
        filename="paper.docx",
        format="docx",
        message="DOCX generation coming in Commit 8",
    )


@router.post("/pdf", response_model=GenerateResponse)
def generate_pdf(request: GenerateRequest):
    """
    Generate a PDF file from paper data.
    Full implementation in Phase 2.
    """
    return GenerateResponse(
        download_url="/generated/sample.pdf",
        filename="paper.pdf",
        format="pdf",
        message="PDF generation coming in Phase 2",
    )
