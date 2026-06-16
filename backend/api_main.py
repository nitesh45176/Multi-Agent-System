from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.research import router

app = FastAPI(title="Multi-Agent-System API")
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← allow all origins during dev
    allow_credentials=False,  # ← must be False when using "*"
    allow_methods=["*"],
    allow_headers=["*"],
)