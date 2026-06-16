"""
DOCX Generation Engine
Generates properly formatted Word documents based on template configs.
"""

from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import re
import os
from app.core.templates import get_template


def strip_html(html: str) -> str:
    clean = re.sub(r"<[^>]+>", " ", html)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean


def add_run_with_font(paragraph, text: str, font_name: str, font_size: int,
                      bold=False, italic=False, all_caps=False):
    run = paragraph.add_run(text)
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.all_caps = all_caps
    return run


def set_two_columns(section):
    sectPr = section._sectPr
    cols = OxmlElement("w:cols")
    cols.set(qn("w:num"), "2")
    cols.set(qn("w:space"), "360")
    sectPr.append(cols)


def remove_table_borders(table):
    tbl = table._tbl
    tblPr = tbl.find(qn("w:tblPr"))
    if tblPr is None:
        tblPr = OxmlElement("w:tblPr")
        tbl.insert(0, tblPr)
    tblBorders = OxmlElement("w:tblBorders")
    for border_name in ["top", "left", "bottom", "right", "insideH", "insideV"]:
        border = OxmlElement(f"w:{border_name}")
        border.set(qn("w:val"), "none")
        tblBorders.append(border)
    tblPr.append(tblBorders)


def add_ieee_authors_table(doc, authors: list, font_name: str):
    """Add authors in IEEE 3-column grid format — always 3 cols per row."""
    if not authors:
        return

    # Always 3 cols per row, pad with None
    raw_rows = [authors[i:i+3] for i in range(0, len(authors), 3)]
    rows = [row + [None] * (3 - len(row)) for row in raw_rows]

    for row_authors in rows:
        table = doc.add_table(rows=1, cols=3)
        remove_table_borders(table)

        for i, author in enumerate(row_authors):
            cell = table.rows[0].cells[i]
            cell.width = Inches(2.4)
            cell.paragraphs[0]._element.getparent().remove(cell.paragraphs[0]._element)

            if author is None:
                cell.add_paragraph()
                continue

            def add_cell_para(text, bold=False, italic=False, size=10, _cell=cell):
                p = _cell.add_paragraph()
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p.paragraph_format.space_before = Pt(0)
                p.paragraph_format.space_after = Pt(2)
                if text:
                    add_run_with_font(p, text, font_name, size, bold=bold, italic=italic)

            add_cell_para(author.get("name", ""), size=11)
            if author.get("department"):
                add_cell_para(author["department"], italic=True, size=10)
            if author.get("affiliation"):
                add_cell_para(author["affiliation"], italic=True, size=10)
            if author.get("email"):
                add_cell_para(author["email"], size=10)

        doc.add_paragraph()


def generate_docx(paper_data: dict, output_path: str) -> str:
    template_id = paper_data.get("templateId", "ieee-conference")
    template = get_template(template_id)

    doc = Document()
    page_cfg = template["page"]
    fonts = template["fonts"]
    spacing = template["spacing"]
    numbering = template["numbering"]
    is_ieee = template_id in ["ieee-conference", "ieee-journal"]

    # Page margins
    section = doc.sections[0]
    section.page_width = Inches(page_cfg["width_inches"])
    section.page_height = Inches(page_cfg["height_inches"])
    section.top_margin = Inches(page_cfg["margin_top_inches"])
    section.bottom_margin = Inches(page_cfg["margin_bottom_inches"])
    section.left_margin = Inches(page_cfg["margin_left_inches"])
    section.right_margin = Inches(page_cfg["margin_right_inches"])

    title_font = fonts["title"]
    body_font = fonts["body"]
    heading_font = fonts["section_heading"]
    abstract_heading_font = fonts["abstract_heading"]
    abstract_body_font = fonts["abstract_body"]
    keyword_font = fonts["keywords"]

    # ── FULL WIDTH: Title ─────────────────────────────────────
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_para.paragraph_format.space_after = Pt(12)
    add_run_with_font(
        title_para,
        paper_data.get("title", "Untitled Paper"),
        title_font["name"], title_font["size_pt"],
        bold=title_font.get("bold", True),
    )

    # ── FULL WIDTH: Authors ───────────────────────────────────
    authors = paper_data.get("authors", [])
    if is_ieee and authors:
        add_ieee_authors_table(doc, authors, fonts["authors"]["name"])
    else:
        author_names = ", ".join([a.get("name", "") for a in authors if a.get("name")])
        if author_names:
            ap = doc.add_paragraph()
            ap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            ap.paragraph_format.space_after = Pt(4)
            add_run_with_font(ap, author_names, fonts["authors"]["name"], fonts["authors"]["size_pt"])
        for author in authors:
            parts = []
            if author.get("department"): parts.append(author["department"])
            if author.get("affiliation"): parts.append(author["affiliation"])
            if parts:
                affil_para = doc.add_paragraph()
                affil_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
                affil_para.paragraph_format.space_after = Pt(2)
                add_run_with_font(affil_para, ", ".join(parts),
                                  fonts["affiliation"]["name"],
                                  fonts["affiliation"].get("size_pt", 10),
                                  italic=fonts["affiliation"].get("italic", False))
            if author.get("email"):
                ep = doc.add_paragraph()
                ep.alignment = WD_ALIGN_PARAGRAPH.CENTER
                ep.paragraph_format.space_after = Pt(2)
                add_run_with_font(ep, author["email"], fonts["authors"]["name"], 10)

    # ── TWO COLUMN SECTION BREAK ──────────────────────────────
    # Abstract, keywords, and all body sections go inside two columns
    if template["columns"] == 2:
        new_section = doc.add_section(WD_SECTION.CONTINUOUS)
        set_two_columns(new_section)
        new_section.top_margin = Inches(page_cfg["margin_top_inches"])
        new_section.bottom_margin = Inches(page_cfg["margin_bottom_inches"])
        new_section.left_margin = Inches(page_cfg["margin_left_inches"])
        new_section.right_margin = Inches(page_cfg["margin_right_inches"])

    # ── Abstract (inside two columns) ────────────────────────
    abstract_text = strip_html(paper_data.get("sections", {}).get("abstract", ""))
    if abstract_text:
        abs_para = doc.add_paragraph()
        abs_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        abs_para.paragraph_format.space_after = Pt(4)
        add_run_with_font(abs_para, "Abstract\u2014",
                          abstract_heading_font["name"],
                          abstract_heading_font.get("size_pt", 9),
                          bold=True, italic=True)
        add_run_with_font(abs_para, " " + abstract_text,
                          abstract_body_font["name"],
                          abstract_body_font.get("size_pt", 9),
                          bold=True)

    # ── Keywords (inside two columns) ────────────────────────
    keywords = paper_data.get("keywords", [])
    if keywords:
        kw_para = doc.add_paragraph()
        kw_para.paragraph_format.space_after = Pt(8)
        add_run_with_font(kw_para, "Keywords\u2014 " + ", ".join(keywords),
                          keyword_font["name"], keyword_font.get("size_pt", 9),
                          bold=True, italic=True)

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

        if numbering["sections"]:
            if is_ieee:
                label = f"{roman_numerals[section_count]}. {default_label.upper()}"
            else:
                label = f"{section_count + 1}. {default_label}"
        else:
            label = default_label.upper()

        heading_para = doc.add_paragraph()
        heading_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        heading_para.paragraph_format.space_before = Pt(spacing["section_space_before_pt"])
        heading_para.paragraph_format.space_after = Pt(4)
        add_run_with_font(heading_para, label,
                          heading_font["name"], heading_font["size_pt"],
                          bold=heading_font.get("bold", True),
                          all_caps=heading_font.get("all_caps", False))

        body_para = doc.add_paragraph()
        body_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        body_para.paragraph_format.space_after = Pt(spacing["paragraph_space_after_pt"])
        add_run_with_font(body_para, content, body_font["name"], body_font["size_pt"])

        section_count += 1

    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else ".", exist_ok=True)
    doc.save(output_path)
    return output_path
