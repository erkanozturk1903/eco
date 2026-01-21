from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import time
import os

from app.core.config import settings
from app.core.database import engine, Base, async_session_maker
from app.api.v1.router import api_router
from app.models import User, SiteSetting, HeroSlide, HeroContent, StatItem, WhyUsItem  # Import all models
from app.seeds.initial_data import seed_initial_data

# Upload directory path
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")

# Lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("\n" + "="*50)
    print("🌱 EcoConsult Backend API Starting...")
    print("="*50)

    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed initial data
    async with async_session_maker() as session:
        try:
            result = await seed_initial_data(session)
            if any(result.values()):
                print(f"✓ Seed data: {result}")
        except Exception as e:
            print(f"⚠ Seed data error: {e}")

    print(f"✓ Environment: {settings.ENVIRONMENT}")
    print(f"✓ Database: Connected")
    print(f"✓ Port: {settings.PORT}")
    print("="*50 + "\n")

    yield

    # Shutdown
    print("\n🛑 Shutting down EcoConsult Backend API...")
    await engine.dispose()

# Create FastAPI app
app = FastAPI(
    title="EcoConsult API",
    description="ESG & Sustainability Management Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Mount uploads directory for static files
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "EcoConsult API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/api/docs",
        "environment": settings.ENVIRONMENT
    }

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "environment": settings.ENVIRONMENT
    }

# Custom exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.ENVIRONMENT == "development"
    )
