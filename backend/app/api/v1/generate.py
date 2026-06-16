from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.schemas.paper import GenerateRequest, GenerateResponse
from app.core.generator.docx_generator import generate_docx
from app.config import settings
import uuid
import os

router = APIRouter()


@router.post("/docx")
def generate_docx_endpoint(request: GenerateRequest):
    """Generate a DOCX file from paper data and return it for download."""
    try:
        filename = f"{uuid.uuid4()}.docx"
        output_path = os.path.join(settings.GENERATED_DIR, filename)

        paper_data = request.paper.model_dump()
        # Convert enum to string
        paper_data["templateId"] = paper_data["templateId"].value
        # Convert sections to dict with string keys
        paper_data["sections"] = {
            k: v for k, v in paper_data["sections"].items()
        }

        generate_docx(paper_data, output_path)

        paper_title = paper_data.get("title", "paper").strip()
        safe_title = "".join(c for c in paper_title if c.isalnum() or c in " _-")[:50]
        download_name = f"{safe_title or 'paper'}.docx"

        return FileResponse(
            path=output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=download_name,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@router.post("/pdf", response_model=GenerateResponse)
def generate_pdf_endpoint(request: GenerateRequest):
    """PDF generation — coming in Phase 2."""
    return GenerateResponse(
        download_url="",
        filename="paper.pdf",
        format="pdf",
        message="PDF generation coming in Phase 2",
    )
