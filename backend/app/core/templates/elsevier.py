"""
Elsevier Journal Format
- Single-column layout
- Times New Roman, 11pt body
- 1in top/bottom, 1.25in left/right margins
"""

ELSEVIER = {
    "id": "elsevier",
    "name": "Elsevier",
    "columns": 1,
    "page": {
        "width_inches": 8.5,
        "height_inches": 11,
        "margin_top_inches": 1.0,
        "margin_bottom_inches": 1.0,
        "margin_left_inches": 1.25,
        "margin_right_inches": 1.25,
        "column_spacing_inches": 0,
    },
    "fonts": {
        "title": {"name": "Times New Roman", "size_pt": 16, "bold": True},
        "authors": {"name": "Times New Roman", "size_pt": 12, "bold": False},
        "affiliation": {"name": "Times New Roman", "size_pt": 11, "italic": True},
        "section_heading": {"name": "Times New Roman", "size_pt": 12, "bold": True},
        "subsection_heading": {"name": "Times New Roman", "size_pt": 11, "bold": True, "italic": True},
        "body": {"name": "Times New Roman", "size_pt": 11},
        "abstract_heading": {"name": "Times New Roman", "size_pt": 11, "bold": True, "italic": True},
        "abstract_body": {"name": "Times New Roman", "size_pt": 11},
        "caption": {"name": "Times New Roman", "size_pt": 10},
        "references": {"name": "Times New Roman", "size_pt": 10},
        "keywords": {"name": "Times New Roman", "size_pt": 10, "italic": True},
    },
    "spacing": {
        "line_spacing": 1.5,
        "paragraph_space_before_pt": 0,
        "paragraph_space_after_pt": 8,
        "section_space_before_pt": 14,
    },
    "numbering": {
        "sections": True,         # 1. Introduction
        "figures": True,          # Fig. 1.
        "tables": True,           # Table 1
        "roman_tables": False,
        "equations": True,
    },
    "reference_style": "elsevier",  # [1], [2]
    "abstract_style": "block",
}
