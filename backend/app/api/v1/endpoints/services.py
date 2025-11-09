from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("/")
async def get_all_services(db: AsyncSession = Depends(get_db)):
    """Get all services"""
    # TODO: Implement database query
    return {
        "services": [],
        "total": 0,
        "message": "Services endpoint - Coming soon!"
    }

@router.get("/{service_id}")
async def get_service(service_id: str, db: AsyncSession = Depends(get_db)):
    """Get single service"""
    # TODO: Implement database query
    return {
        "id": service_id,
        "message": "Service detail - Coming soon!"
    }
