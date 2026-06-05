# AutoPaper

> Automatically format research papers according to IEEE, Springer, ACM, and Elsevier templates — no manual formatting required.

## What is AutoPaper?

Researchers and students spend hours manually formatting papers for conference and journal submissions. AutoPaper eliminates this by letting you write your paper section-by-section and instantly generating a correctly formatted, submission-ready document.

**Supported templates (Phase 1)**
- IEEE Conference Format
- IEEE Journal Format
- Springer Format
- ACM Format
- Elsevier Format

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, TipTap, Zustand |
| Backend | FastAPI (Python 3.11), python-docx, ReportLab |
| Database | PostgreSQL 15 |
| Cache / Queue | Redis, Celery |
| Infra | Docker, Docker Compose |

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Git

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/autopaper.git
cd autopaper

# 2. Copy environment variables
cp .env.example .env

# 3. Start all services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 4. Open in browser
# Frontend: http://localhost:3000
# Backend API docs: http://localhost:8000/docs
```

## Project Structure

```
autopaper/
├── frontend/       # Next.js app
├── backend/        # FastAPI service
├── docker-compose.yml
└── .env.example
```

## Roadmap

- [x] **Phase 1** — Template selection, section editor, live preview, DOCX download
- [ ] **Phase 2** — User auth, save drafts, PDF download, references formatter
- [ ] **Phase 3** — Live real-time preview, figures/tables, smart template upload
- [ ] **Phase 4** — AI features (abstract generator, grammar check, plagiarism detection)

## Contributing

This project is under active development. See the roadmap above for what's coming next.

## License

VIT
