"""
IEEE Journal Paper Format
- Two-column layout
- Times New Roman, 10pt body
- 1in top/bottom, 0.75in left/right margins
"""

IEEE_JOURNAL = {
    "id": "ieee-journal",
    "name": "IEEE Journal",
    "columns": 2,
    "page": {
        "width_inches": 8.5,
        "height_inches": 11,
        "margin_top_inches": 1.0,
        "margin_bottom_inches": 1.0,
        "margin_left_inches": 0.75,
        "margin_right_inches": 0.75,
        "column_spacing_inches": 0.25,
    },
    "fonts": {
        "title": {"name": "Times New Roman", "size_pt": 24, "bold": True},
        "authors": {"name": "Times New Roman", "size_pt": 11, "bold": False},
        "affiliation": {"name": "Times New Roman", "size_pt": 10, "italic": True},
        "section_heading": {"name": "Times New Roman", "size_pt": 10, "bold": True, "all_caps": True},
        "subsection_heading": {"name": "Times New Roman", "size_pt": 10, "bold": True, "italic": True},
        "body": {"name": "Times New Roman", "size_pt": 10, "bold": False},
        "abstract_heading": {"name": "Times New Roman", "size_pt": 9, "bold": True, "italic": True},
        "abstract_body": {"name": "Times New Roman", "size_pt": 9},
        "caption": {"name": "Times New Roman", "size_pt": 8},
        "references": {"name": "Times New Roman", "size_pt": 8},
        "keywords": {"name": "Times New Roman", "size_pt": 9, "italic": True},
    },
    "spacing": {
        "line_spacing": 1.0,
        "paragraph_space_before_pt": 0,
        "paragraph_space_after_pt": 6,
        "section_space_before_pt": 12,
    },
    "numbering": {
        "sections": True,
        "figures": True,
        "tables": True,
        "roman_tables": True,
        "equations": True,
    },
    "reference_style": "ieee",
    "abstract_style": "inline",
}
