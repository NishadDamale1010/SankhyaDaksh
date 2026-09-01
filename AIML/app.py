from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.llm import check_llm_status
from api.routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "CampusOS AI Service Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "llm": check_llm_status()
    }