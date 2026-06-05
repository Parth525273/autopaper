from fastapi import APIRouter
from app.schemas.paper import PaperCreate, PaperResponse
import uuid

router = APIRouter()


@router.post("/", response_model=PaperResponse)
def create_paper(paper: PaperCreate):
    """
    Save paper data (in-memory for Phase 1, database in Phase 2)
    """
    return PaperResponse(
        id=str(uuid.uuid4()),
        **paper.model_dump(),
        message="Paper saved successfully",
    )


@router.get("/templates")
def get_templates():
    """
    Return all available template configurations
    """
    return {
        "templates": [
            {
                "id": "ieee-conference",
                "name": "IEEE Conference",
                "columns": 2,
                "description": "Standard IEEE two-column conference format",
            },
            {
                "id": "ieee-journal",
                "name": "IEEE Journal",
                "columns": 2,
                "description": "IEEE journal two-column format",
            },
            {
                "id": "springer",
                "name": "Springer",
                "columns": 1,
                "description": "Springer LNCS single-column format",
            },
            {
                "id": "acm",
                "name": "ACM",
                "columns": 2,
                "description": "ACM two-column computing format",
            },
            {
                "id": "elsevier",
                "name": "Elsevier",
                "columns": 1,
                "description": "Elsevier single-column journal format",
            },
        ]
    }
