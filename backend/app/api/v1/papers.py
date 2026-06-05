from fastapi import APIRouter, HTTPException
from app.schemas.paper import PaperCreate, PaperResponse
from app.core.templates import get_template, list_templates
import uuid

router = APIRouter()


@router.post("/", response_model=PaperResponse)
def create_paper(paper: PaperCreate):
    """Save paper data (in-memory for Phase 1, database in Phase 2)"""
    # Validate template exists
    try:
        get_template(paper.templateId.value)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return PaperResponse(
        id=str(uuid.uuid4()),
        **paper.model_dump(),
        message="Paper saved successfully",
    )


@router.get("/templates")
def get_templates():
    """Return all available template configurations"""
    templates = list_templates()
    return {
        "templates": [
            {
                "id": t["id"],
                "name": t["name"],
                "columns": t["columns"],
                "fonts": t["fonts"],
                "margins": t["page"],
                "spacing": t["spacing"],
                "reference_style": t["reference_style"],
            }
            for t in templates
        ]
    }


@router.get("/templates/{template_id}")
def get_template_by_id(template_id: str):
    """Return a single template config by ID"""
    try:
        template = get_template(template_id)
        return template
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
