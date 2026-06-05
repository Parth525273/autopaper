"""
Springer LNCS Format
- Single-column layout
- Times New Roman, 10pt body
- 1.1in top/bottom, 1.3in left/right margins
"""

SPRINGER = {
    "id": "springer",
    "name": "Springer",
    "columns": 1,
    "page": {
        "width_inches": 6.1,
        "height_inches": 9.2,
        "margin_top_inches": 1.1,
        "margin_bottom_inches": 1.1,
        "margin_left_inches": 1.3,
        "margin_right_inches": 1.3,
        "column_spacing_inches": 0,
    },
    "fonts": {
        "title": {"name": "Times New Roman", "size_pt": 14, "bold": True},
        "authors": {"name": "Times New Roman", "size_pt": 12, "bold": False},
        "affiliation": {"name": "Times New Roman", "size_pt": 10, "italic": False},
        "section_heading": {"name": "Times New Roman", "size_pt": 12, "bold": True},
        "subsection_heading": {"name": "Times New Roman", "size_pt": 10, "bold": True, "italic": True},
        "body": {"name": "Times New Roman", "size_pt": 10},
        "abstract_heading": {"name": "Times New Roman", "size_pt": 10, "bold": True},
        "abstract_body": {"name": "Times New Roman", "size_pt": 10},
        "caption": {"name": "Times New Roman", "size_pt": 9},
        "references": {"name": "Times New Roman", "size_pt": 9},
        "keywords": {"name": "Times New Roman", "size_pt": 10},
    },
    "spacing": {
        "line_spacing": 1.0,
        "paragraph_space_before_pt": 0,
        "paragraph_space_after_pt": 6,
        "section_space_before_pt": 12,
    },
    "numbering": {
        "sections": True,         # 1 Introduction
        "figures": True,          # Fig. 1.
        "tables": True,           # Table 1.
        "roman_tables": False,
        "equations": True,
    },
    "reference_style": "springer",  # [1], [2]
    "abstract_style": "block",      # Abstract as indented block
}
