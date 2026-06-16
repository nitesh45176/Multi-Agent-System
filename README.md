<div align="center">

# ⚡ ResearchAI — Multi-Agent Research System

**Autonomous AI agents that search, scrape, write, and critique — delivering structured research in seconds.**

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-Agent_Framework-6366f1?style=flat-square)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-f97316?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)

<br/>
![Demo Screenshot](https://github.com/user-attachments/assets/a541a6b4-22ca-43aa-96cf-5a3da651824f)


</div>

---

## 🧠 What is this?

**ResearchAI** is a full-stack multi-agent AI system that automates the entire research workflow. You type a topic — four specialized AI agents do the rest:

| Agent | Role |
|---|---|
| 🔍 **Search Agent** | Searches the web via Tavily for recent, reliable sources |
| 📖 **Reader Agent** | Scrapes the most relevant URL for deep content |
| ✍️ **Writer Agent** | Drafts a structured, professional research report |
| 🧠 **Critic Agent** | Reviews and scores the report with actionable feedback |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│              Next.js 14 + TypeScript             │
│         (Search UI → Results Display)            │
└─────────────────┬───────────────────────────────┘
                  │ HTTP POST /research
┌─────────────────▼───────────────────────────────┐
│                   Backend                        │
│              FastAPI + Uvicorn                   │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│              Research Pipeline                   │
│                                                  │
│  [Search Agent] → [Reader Agent]                 │
│       ↓                  ↓                       │
│  [Writer Chain] → [Critic Chain]                 │
│                                                  │
│  Powered by: LangGraph + Groq (LLaMA 3.3 70B)   │
└─────────────────────────────────────────────────┘
```

---

## ✨ Features

- 🤖 **4 autonomous AI agents** working in a pipeline
- ⚡ **Groq-powered** — blazing fast LLaMA 3.3 70B inference
- 🌐 **Real-time web search** via Tavily API
- 🕸️ **Intelligent web scraping** with BeautifulSoup
- 📝 **Structured reports** with Introduction, Key Findings & Conclusion
- 🎯 **AI critic** that scores and reviews every report
- 🎨 **Beautiful dark UI** with animated loading states
- 🐳 **Docker ready** — one command to run everything

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- [Groq API Key](https://console.groq.com) (free)
- [Tavily API Key](https://tavily.com) (free)

---

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/multi-agent-research.git
cd multi-agent-research
```

### 2. Setup the Backend

```bash
cd backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Add your API keys
cp .env.example .env
```

Edit `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

```bash
# Start the backend
uvicorn api_main:app --reload
# Running at http://localhost:8000
```

### 3. Setup the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
# Running at http://localhost:3000
```

### 4. Open the app

Visit **http://localhost:3000**, type any research topic and hit **Run Research**.

---

## 🐳 Docker Setup

Run the entire stack with a single command:

```bash
# From the root folder
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |

To stop:
```bash
docker-compose down
```

---

## 📁 Project Structure

```
multi-agent/
├── backend/
│   ├── api/
│   │   └── routes/
│   │       └── research.py       # POST /research endpoint
│   ├── core/
│   │   ├── agents.py             # Search, Reader, Writer, Critic agents
│   │   ├── pipeline.py           # 4-step research pipeline
│   │   └── tools.py              # web_search + scrape_url tools
│   ├── api_main.py               # FastAPI app + CORS config
│   ├── requirements.txt
│   ├── .env                      # API keys (not committed)
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       └── page.tsx          # Main UI
│   ├── lib/
│   │   └── api.ts                # Axios instance
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Reference

### `POST /research`

**Request:**
```json
{
  "topic": "The future of quantum computing"
}
```

**Response:**
```json
{
  "search_results": "Title: ...\nURL: ...\nSnippet: ...",
  "scraped_content": "Full text from top source...",
  "report": "## Introduction\n...\n## Key Findings\n...",
  "feedback": "Score: 8/10\n\nStrengths:\n- ..."
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, TypeScript, Axios |
| **Backend** | FastAPI, Python 3.11, Uvicorn |
| **AI Framework** | LangGraph, LangChain |
| **LLM** | Groq — LLaMA 3.3 70B Versatile |
| **Search** | Tavily API |
| **Scraping** | BeautifulSoup4, Requests |
| **Containerization** | Docker, Docker Compose |

---

## 🔑 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GROQ_API_KEY` | `backend/.env` | Groq API key for LLM inference |
| `TAVILY_API_KEY` | `backend/.env` | Tavily API key for web search |
| `NEXT_PUBLIC_API_URL` | `frontend/.env` | Backend URL (default: `http://localhost:8000`) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project however you like.

---

<div align="center">

Built with ❤️ using **LangGraph** · **Groq** · **FastAPI** · **Next.js**

⭐ Star this repo if you found it useful!

</div>
