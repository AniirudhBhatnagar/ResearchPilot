import logging
import os
import sys
from typing import Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("researchos-api")

# Import the existing pipeline orchestration function
from pipeline import run_research_pipeline

app = FastAPI(
    title="ResearchOS API",
    description="Multi-Agent Research Assistant API powered by LangChain",
    version="1.0.0"
)

# Configure CORS
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    topic: str = Field(..., description="Research topic or query")

    @field_validator("topic")
    @classmethod
    def validate_topic(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("Research topic cannot be empty or whitespace only.")
        return trimmed


class ResearchResponse(BaseModel):
    topic: str
    search_results: str = ""
    scraped_content: str = ""
    report: str = ""
    feedback: str = ""


@app.get("/api/health", summary="Health Check")
def health_check() -> Dict[str, str]:
    """Health check endpoint to verify backend service status."""
    return {"status": "ok"}


@app.post(
    "/api/research",
    response_model=ResearchResponse,
    summary="Execute Multi-Agent Research Pipeline",
    responses={
        400: {"description": "Invalid input topic"},
        500: {"description": "Research pipeline execution failed"}
    }
)
def execute_research(request: ResearchRequest) -> Dict[str, Any]:
    """
    Executes the multi-agent research pipeline:
    1. Search Agent (Tavily search)
    2. Reader Agent (Deep web scraper)
    3. Writer Chain (Comprehensive report generation)
    4. Critic Chain (Critique and grading)
    """
    topic = request.topic.strip()
    if not topic:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Research topic must not be empty."
        )

    logger.info(f"Starting research pipeline for topic: '{topic}'")

    try:
        pipeline_state = run_research_pipeline(topic)
        
        response_data = {
            "topic": topic,
            "search_results": str(pipeline_state.get("search_results", "")),
            "scraped_content": str(pipeline_state.get("scraped_content", "")),
            "report": str(pipeline_state.get("report", "")),
            "feedback": str(pipeline_state.get("feedback", ""))
        }
        logger.info(f"Successfully completed research pipeline for topic: '{topic}'")
        return response_data

    except Exception as e:
        logger.error(f"Error executing research pipeline for topic '{topic}': {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The research pipeline encountered an error while processing your request. Please ensure valid API keys and try again."
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
