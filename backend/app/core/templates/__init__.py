from app.core.templates.ieee_conference import IEEE_CONFERENCE
from app.core.templates.ieee_journal import IEEE_JOURNAL
from app.core.templates.springer import SPRINGER
from app.core.templates.acm import ACM
from app.core.templates.elsevier import ELSEVIER

# Single registry — all templates accessible by ID
TEMPLATE_REGISTRY: dict = {
    "ieee-conference": IEEE_CONFERENCE,
    "ieee-journal":    IEEE_JOURNAL,
    "springer":        SPRINGER,
    "acm":             ACM,
    "elsevier":        ELSEVIER,
}


def get_template(template_id: str) -> dict:
    """Get a template config by ID. Raises ValueError if not found."""
    template = TEMPLATE_REGISTRY.get(template_id)
    if not template:
        raise ValueError(
            f"Template '{template_id}' not found. "
            f"Available: {list(TEMPLATE_REGISTRY.keys())}"
        )
    return template


def list_templates() -> list:
    """Return all templates as a list."""
    return list(TEMPLATE_REGISTRY.values())
