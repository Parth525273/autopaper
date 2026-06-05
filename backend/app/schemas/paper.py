from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum


class TemplateId(str, Enum):
    IEEE_CONFERENCE = "ieee-conference"
    IEEE_JOURNAL = "ieee-journal"
    SPRINGER = "springer"
    ACM = "acm"
    ELSEVIER = "elsevier"


class Author(BaseModel):
    name: str
    affiliation: str
    department: str
    email: str


class PaperSections(BaseModel):
    abstract: str = ""
    introduction: str = ""
    literatureReview: str = ""
    methodology: str = ""
    systemDesign: str = ""
    implementation: str = ""
    results: str = ""
    conclusion: str = ""
    futureScope: str = ""
    acknowledgement: str = ""
    references: str = ""


class PaperCreate(BaseModel):
    title: str
    authors: List[Author]
    keywords: List[str]
    templateId: TemplateId
    sections: PaperSections


class PaperResponse(BaseModel):
    id: str
    title: str
    authors: List[Author]
    keywords: List[str]
    templateId: TemplateId
    sections: PaperSections
    message: str = "Paper saved successfully"


class GenerateRequest(BaseModel):
    paper: PaperCreate
    format: str = "docx"  # "docx" or "pdf"


class GenerateResponse(BaseModel):
    download_url: str
    filename: str
    format: str
    message: str = "Document generated successfully"
