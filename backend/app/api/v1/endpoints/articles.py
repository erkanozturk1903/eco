from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.article import ArticleCategoryService, ArticleService
from app.schemas.article import (
    ArticleCategoryCreate, ArticleCategoryUpdate, ArticleCategoryResponse,
    ArticleCreate, ArticleUpdate, ArticleResponse, ArticleListResponse,
    ArticlesPageResponse
)

router = APIRouter()


# ============ Combined Articles Page ============

@router.get("/page", response_model=ArticlesPageResponse)
async def get_articles_page(
    category_id: Optional[int] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    """Get articles page with pagination (public)"""
    articles, total = await ArticleService.get_all_articles(
        db, published_only=True, category_id=category_id, page=page, per_page=per_page
    )
    categories = await ArticleCategoryService.get_all_categories(db)

    return ArticlesPageResponse(
        articles=articles,
        categories=categories,
        total=total,
        page=page,
        per_page=per_page
    )


# ============ Article Categories ============

@router.get("/categories", response_model=List[ArticleCategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    """Get all article categories (public)"""
    return await ArticleCategoryService.get_all_categories(db)


@router.get("/categories/{category_id_or_slug}", response_model=ArticleCategoryResponse)
async def get_category(category_id_or_slug: str, db: AsyncSession = Depends(get_db)):
    """Get a single category by ID or slug (public)"""
    if category_id_or_slug.isdigit():
        category = await ArticleCategoryService.get_category_by_id(db, int(category_id_or_slug))
    else:
        category = await ArticleCategoryService.get_category_by_slug(db, category_id_or_slug)

    if not category:
        raise HTTPException(status_code=404, detail="Kategori bulunamadı")
    return category


@router.post("/categories", response_model=ArticleCategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    data: ArticleCategoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new category (admin only)"""
    return await ArticleCategoryService.create_category(db, data)


@router.put("/categories/{category_id}", response_model=ArticleCategoryResponse)
async def update_category(
    category_id: int,
    data: ArticleCategoryUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a category (admin only)"""
    category = await ArticleCategoryService.update_category(db, category_id, data)
    if not category:
        raise HTTPException(status_code=404, detail="Kategori bulunamadı")
    return category


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a category (admin only)"""
    success = await ArticleCategoryService.delete_category(db, category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Kategori bulunamadı")


# ============ Articles ============

@router.get("/", response_model=List[ArticleListResponse])
async def get_all_articles(
    published_only: bool = True,
    category_id: Optional[int] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    """Get all articles with pagination (public shows published only)"""
    articles, _ = await ArticleService.get_all_articles(
        db, published_only=published_only, category_id=category_id, page=page, per_page=per_page
    )
    return articles


@router.get("/featured", response_model=List[ArticleListResponse])
async def get_featured_articles(
    limit: int = Query(3, ge=1, le=10),
    db: AsyncSession = Depends(get_db)
):
    """Get featured articles (public)"""
    return await ArticleService.get_featured_articles(db, limit)


@router.get("/admin", response_model=List[ArticleListResponse])
async def get_all_articles_admin(
    category_id: Optional[int] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all articles including unpublished (admin only)"""
    articles, _ = await ArticleService.get_all_articles(
        db, published_only=False, category_id=category_id, page=page, per_page=per_page
    )
    return articles


@router.get("/{article_id_or_slug}", response_model=ArticleResponse)
async def get_article(article_id_or_slug: str, db: AsyncSession = Depends(get_db)):
    """Get a single article by ID or slug (public)"""
    if article_id_or_slug.isdigit():
        article = await ArticleService.get_article_by_id(db, int(article_id_or_slug))
    else:
        article = await ArticleService.get_article_by_slug(db, article_id_or_slug)

    if not article:
        raise HTTPException(status_code=404, detail="Makale bulunamadı")
    return article


@router.post("/{article_id}/view")
async def increment_article_views(article_id: int, db: AsyncSession = Depends(get_db)):
    """Increment article view count (public)"""
    article = await ArticleService.increment_views(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Makale bulunamadı")
    return {"views": article.views}


@router.get("/{article_id}/related", response_model=List[ArticleListResponse])
async def get_related_articles(
    article_id: int,
    limit: int = Query(3, ge=1, le=10),
    db: AsyncSession = Depends(get_db)
):
    """Get related articles (public)"""
    return await ArticleService.get_related_articles(db, article_id, limit)


@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
async def create_article(
    data: ArticleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new article (admin only)"""
    return await ArticleService.create_article(db, data)


@router.put("/{article_id}", response_model=ArticleResponse)
async def update_article(
    article_id: int,
    data: ArticleUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update an article (admin only)"""
    article = await ArticleService.update_article(db, article_id, data)
    if not article:
        raise HTTPException(status_code=404, detail="Makale bulunamadı")
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_article(
    article_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete an article (admin only)"""
    success = await ArticleService.delete_article(db, article_id)
    if not success:
        raise HTTPException(status_code=404, detail="Makale bulunamadı")
