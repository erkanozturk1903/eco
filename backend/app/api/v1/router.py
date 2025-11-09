from fastapi import APIRouter
from app.api.v1.endpoints import health, blog, services

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(blog.router, prefix="/blog", tags=["blog"])
api_router.include_router(services.router, prefix="/services", tags=["services"])

# TODO: Add more routers
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
# api_router.include_router(team.router, prefix="/team", tags=["team"])
# api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
