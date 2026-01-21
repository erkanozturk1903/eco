from fastapi import APIRouter
from app.api.v1.endpoints import health, blog, services, auth, settings, content, upload, about, articles, contact, dashboard

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(blog.router, prefix="/blog", tags=["blog"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(about.router, prefix="/about", tags=["about"])
api_router.include_router(articles.router, prefix="/articles", tags=["articles"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
