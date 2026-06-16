"""
DOCX Generation Engine
Generates properly formatted Word documents based on template configs.
"""

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import re
import os
from app.core.templates import get_template


def strip_html(html: str) -> str:
    """Remove HTML tags from TipTap content."""
    clean = re.sub(r"<[^>]+>", " ", html)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean


def set_paragraph_font(paragraph, font_name: str, font_size: int, bold: bool = False, italic: bool = False, all_caps: bool = False):
    """Apply font settings to all runs in a paragraph."""
    for run in paragraph.runs:
        run.font.name = font_name
        run.font.size = Pt(font_size)
        run.font.bold = bold
        run.font.italic = italic
        run.font.all_caps = all_caps


def add_run_with_font(paragraph, text: str, font_name: str, font_size: int, bold=False, italic=False, all_caps=False):
    """Add a run with specific font settings."""
    run = paragraph.add_run(text)
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.all_caps = all_caps
    return run


def set_two_columns(section):
    """Set two-column layout for a section."""
    sectPr = section._sectPr
    cols = OxmlElement("w:cols")
    cols.set(qn("w:num"), "2")
    cols.set(qn("w:space"), "360")  # ~0.25 inch gap
    sectPr.append(cols)


def generate_docx(paper_data: dict, output_path: str) -> str:
    """
    Generate a DOCX file from paper data using the selected template.
    Returns the output file path.
    """
    template_id = paper_data.get("templateId", "ieee-conference")
    template = get_template(template_id)

    doc = Document()
    page_cfg = template["page"]
    fonts = template["fonts"]
    spacing = template["spacing"]
    numbering = template["numbering"]

    # ── Page margins ─────────────────────────────────────────
    section = doc.sections[0]
    section.page_width = Inches(page_cfg["width_inches"])
    section.page_height = Inches(page_cfg["height_inches"])
    section.top_margin = Inches(page_cfg["margin_top_inches"])
    section.bottom_margin = Inches(page_cfg["margin_bottom_inches"])
    section.left_margin = Inches(page_cfg["margin_left_inches"])
    section.right_margin = Inches(page_cfg["margin_right_inches"])

    title_font = fonts["title"]
    author_font = fonts["authors"]
    affil_font = fonts["affiliation"]
    body_font = fonts["body"]
    heading_font = fonts["section_heading"]
    abstract_heading_font = fonts["abstract_heading"]
    abstract_body_font = fonts["abstract_body"]
    keyword_font = fonts["keywords"]
    ref_font = fonts["references"]

    # ── Title ─────────────────────────────────────────────────
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_para.paragraph_format.space_after = Pt(6)
    add_run_with_font(
        title_para,
        paper_data.get("title", "Untitled Paper"),
        title_font["name"],
        title_font["size_pt"],
        bold=title_font.get("bold", True),
    )

    # ── Authors ───────────────────────────────────────────────
    authors = paper_data.get("authors", [])
    author_names = ", ".join([a.get("name", "") for a in authors if a.get("name")])
    if author_names:
        author_para = doc.add_paragraph()
        author_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        author_para.paragraph_format.space_after = Pt(2)
        add_run_with_font(author_para, author_names, author_font["name"], author_font["size_pt"])

    # Affiliations
    for author in authors:
        parts = []
        if author.get("department"):
            parts.append(author["department"])
        if author.get("affiliation"):
            parts.append(author["affiliation"])
        if author.get("email"):
            parts.append(author["email"])
        if parts:
            affil_para = doc.add_paragraph()
            affil_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            affil_para.paragraph_format.space_after = Pt(2)
            add_run_with_font(
                affil_para,
                ", ".join(parts),
                affil_font["name"],
                affil_font.get("size_pt", 10),
                italic=affil_font.get("italic", False),
            )

    # ── Abstract ──────────────────────────────────────────────
    abstract_text = strip_html(paper_data.get("sections", {}).get("abstract", ""))
    if abstract_text:
        doc.add_paragraph()  # spacer
        abs_para = doc.add_paragraph()
        abs_para.paragraph_format.space_after = Pt(4)

        add_run_with_font(
            abs_para, "Abstract—",
            abstract_heading_font["name"],
            abstract_heading_font.get("size_pt", 9),
            bold=abstract_heading_font.get("bold", True),
            italic=abstract_heading_font.get("italic", True),
        )
        add_run_with_font(
            abs_para, abstract_text,
            abstract_body_font["name"],
            abstract_body_font.get("size_pt", 9),
        )

    # ── Keywords ──────────────────────────────────────────────
    keywords = paper_data.get("keywords", [])
    if keywords:
        kw_para = doc.add_paragraph()
        kw_para.paragraph_format.space_after = Pt(8)
        add_run_with_font(kw_para, "Keywords—", keyword_font["name"], keyword_font.get("size_pt", 9), bold=True, italic=True)
        add_run_with_font(kw_para, ", ".join(keywords), keyword_font["name"], keyword_font.get("size_pt", 9))

    # ── Two-column section break ───────────────────────────────
    if template["columns"] == 2:
        new_section = doc.add_section(WD_SECTION.CONTINUOUS)
        set_two_columns(new_section)
        new_section.top_margin = Inches(page_cfg["margin_top_inches"])
        new_section.bottom_margin = Inches(page_cfg["margin_bottom_inches"])
        new_section.left_margin = Inches(page_cfg["margin_left_inches"])
        new_section.right_margin = Inches(page_cfg["margin_right_inches"])

    # ── Body sections ─────────────────────────────────────────
    section_order = [
        ("introduction", "Introduction"),
        ("literatureReview", "Literature Review"),
        ("methodology", "Methodology"),
        ("systemDesign", "System Design"),
        ("implementation", "Implementation"),
        ("results", "Results and Discussion"),
        ("conclusion", "Conclusion"),
        ("futureScope", "Future Scope"),
        ("acknowledgement", "Acknowledgement"),
        ("references", "References"),
    ]

    roman_numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"]
    section_count = 0

    for key, default_label in section_order:
        content = strip_html(paper_data.get("sections", {}).get(key, ""))
        if not content:
            continue

        # Section heading
        if numbering["sections"]:
            if template_id in ["ieee-conference", "ieee-journal"]:
                label = f"{roman_numerals[section_count]}. {default_label.upper()}"
            else:
                label = f"{section_count + 1}. {default_label}"
        else:
            label = default_label.upper()

        heading_para = doc.add_paragraph()
        heading_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        heading_para.paragraph_format.space_before = Pt(spacing["section_space_before_pt"])
        heading_para.paragraph_format.space_after = Pt(4)
        add_run_with_font(
            heading_para, label,
            heading_font["name"],
            heading_font["size_pt"],
            bold=heading_font.get("bold", True),
            all_caps=heading_font.get("all_caps", False),
        )

        # Body paragraph
        body_para = doc.add_paragraph()
        body_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        body_para.paragraph_format.space_after = Pt(spacing["paragraph_space_after_pt"])
        add_run_with_font(body_para, content, body_font["name"], body_font["size_pt"])

        section_count += 1

    # ── Save ──────────────────────────────────────────────────
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    return output_path
