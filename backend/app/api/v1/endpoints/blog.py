from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("/")
async def get_all_articles(db: AsyncSession = Depends(get_db)):
    """Get all blog articles"""
    # TODO: Implement database query
    return {
        "articles": [],
        "total": 0,
        "message": "Blog endpoint - Coming soon!"
    }

@router.get("/{article_id}")
async def get_article(article_id: str, db: AsyncSession = Depends(get_db)):
    """Get single blog article"""
    # TODO: Implement database query
    return {
        "id": article_id,
        "message": "Article detail - Coming soon!"
    }
