"""
ACM Conference Format
- Two-column layout
- Linux Libertine / Times New Roman, 9pt body
- 1in top/bottom, 0.75in left/right margins
"""

ACM = {
    "id": "acm",
    "name": "ACM",
    "columns": 2,
    "page": {
        "width_inches": 8.5,
        "height_inches": 11,
        "margin_top_inches": 1.0,
        "margin_bottom_inches": 1.0,
        "margin_left_inches": 0.75,
        "margin_right_inches": 0.75,
        "column_spacing_inches": 0.33,
    },
    "fonts": {
        "title": {"name": "Times New Roman", "size_pt": 14, "bold": True},
        "authors": {"name": "Times New Roman", "size_pt": 11, "bold": False},
        "affiliation": {"name": "Times New Roman", "size_pt": 10, "italic": False},
        "section_heading": {"name": "Times New Roman", "size_pt": 9, "bold": True, "all_caps": True},
        "subsection_heading": {"name": "Times New Roman", "size_pt": 9, "bold": True},
        "body": {"name": "Times New Roman", "size_pt": 9},
        "abstract_heading": {"name": "Times New Roman", "size_pt": 9, "bold": True, "italic": True},
        "abstract_body": {"name": "Times New Roman", "size_pt": 9},
        "caption": {"name": "Times New Roman", "size_pt": 9, "bold": True},
        "references": {"name": "Times New Roman", "size_pt": 8},
        "keywords": {"name": "Times New Roman", "size_pt": 9},
    },
    "spacing": {
        "line_spacing": 1.0,
        "paragraph_space_before_pt": 0,
        "paragraph_space_after_pt": 6,
        "section_space_before_pt": 12,
    },
    "numbering": {
        "sections": True,         # 1. INTRODUCTION
        "figures": True,          # Figure 1
        "tables": True,           # Table 1
        "roman_tables": False,
        "equations": True,
    },
    "reference_style": "acm",    # [1], [2]
    "abstract_style": "block",
}
