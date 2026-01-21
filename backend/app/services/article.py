from typing import Optional, List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func
from sqlalchemy.orm import selectinload
from datetime import datetime

from app.models.article import ArticleCategory, Article
from app.schemas.article import (
    ArticleCategoryCreate, ArticleCategoryUpdate,
    ArticleCreate, ArticleUpdate
)


class ArticleCategoryService:
    """Service for article category management"""

    @staticmethod
    async def get_all_categories(db: AsyncSession) -> List[ArticleCategory]:
        result = await db.execute(
            select(ArticleCategory).order_by(ArticleCategory.order)
        )
        return result.scalars().all()

    @staticmethod
    async def get_category_by_id(db: AsyncSession, category_id: int) -> Optional[ArticleCategory]:
        result = await db.execute(
            select(ArticleCategory).where(ArticleCategory.id == category_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_category_by_slug(db: AsyncSession, slug: str) -> Optional[ArticleCategory]:
        result = await db.execute(
            select(ArticleCategory).where(ArticleCategory.slug == slug)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_category(db: AsyncSession, data: ArticleCategoryCreate) -> ArticleCategory:
        category = ArticleCategory(**data.model_dump())
        db.add(category)
        await db.commit()
        await db.refresh(category)
        return category

    @staticmethod
    async def update_category(db: AsyncSession, category_id: int, data: ArticleCategoryUpdate) -> Optional[ArticleCategory]:
        category = await ArticleCategoryService.get_category_by_id(db, category_id)
        if not category:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(category, key, value)
        await db.commit()
        await db.refresh(category)
        return category

    @staticmethod
    async def delete_category(db: AsyncSession, category_id: int) -> bool:
        category = await ArticleCategoryService.get_category_by_id(db, category_id)
        if not category:
            return False
        await db.delete(category)
        await db.commit()
        return True


class ArticleService:
    """Service for article management"""

    @staticmethod
    async def get_all_articles(
        db: AsyncSession,
        published_only: bool = False,
        category_id: Optional[int] = None,
        page: int = 1,
        per_page: int = 10
    ) -> Tuple[List[Article], int]:
        """Get paginated articles with optional filters"""
        query = select(Article).options(selectinload(Article.category))

        if published_only:
            query = query.where(Article.is_published == True)

        if category_id:
            query = query.where(Article.category_id == category_id)

        # Count total
        count_query = select(func.count(Article.id))
        if published_only:
            count_query = count_query.where(Article.is_published == True)
        if category_id:
            count_query = count_query.where(Article.category_id == category_id)
        total_result = await db.execute(count_query)
        total = total_result.scalar()

        # Paginate
        query = query.order_by(Article.created_at.desc())
        query = query.offset((page - 1) * per_page).limit(per_page)

        result = await db.execute(query)
        articles = result.scalars().all()

        return articles, total

    @staticmethod
    async def get_featured_articles(db: AsyncSession, limit: int = 3) -> List[Article]:
        """Get featured published articles"""
        result = await db.execute(
            select(Article)
            .options(selectinload(Article.category))
            .where(Article.is_published == True, Article.is_featured == True)
            .order_by(Article.published_at.desc())
            .limit(limit)
        )
        return result.scalars().all()

    @staticmethod
    async def get_article_by_id(db: AsyncSession, article_id: int) -> Optional[Article]:
        result = await db.execute(
            select(Article).options(selectinload(Article.category)).where(Article.id == article_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_article_by_slug(db: AsyncSession, slug: str) -> Optional[Article]:
        result = await db.execute(
            select(Article).options(selectinload(Article.category)).where(Article.slug == slug)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_article(db: AsyncSession, data: ArticleCreate) -> Article:
        article_dict = data.model_dump()
        if data.is_published and not article_dict.get("published_at"):
            article_dict["published_at"] = datetime.utcnow()
        article = Article(**article_dict)
        db.add(article)
        await db.commit()
        await db.refresh(article, ["category"])
        return article

    @staticmethod
    async def update_article(db: AsyncSession, article_id: int, data: ArticleUpdate) -> Optional[Article]:
        article = await ArticleService.get_article_by_id(db, article_id)
        if not article:
            return None

        updates = data.model_dump(exclude_unset=True)

        # Set published_at if publishing for the first time
        if updates.get("is_published") and not article.is_published and not article.published_at:
            updates["published_at"] = datetime.utcnow()

        for key, value in updates.items():
            setattr(article, key, value)
        await db.commit()
        await db.refresh(article, ["category"])
        return article

    @staticmethod
    async def delete_article(db: AsyncSession, article_id: int) -> bool:
        article = await ArticleService.get_article_by_id(db, article_id)
        if not article:
            return False
        await db.delete(article)
        await db.commit()
        return True

    @staticmethod
    async def increment_views(db: AsyncSession, article_id: int) -> Optional[Article]:
        """Increment article view count"""
        await db.execute(
            update(Article).where(Article.id == article_id).values(views=Article.views + 1)
        )
        await db.commit()
        return await ArticleService.get_article_by_id(db, article_id)

    @staticmethod
    async def get_related_articles(db: AsyncSession, article_id: int, limit: int = 3) -> List[Article]:
        """Get related articles based on category"""
        article = await ArticleService.get_article_by_id(db, article_id)
        if not article or not article.category_id:
            return []

        result = await db.execute(
            select(Article)
            .options(selectinload(Article.category))
            .where(
                Article.is_published == True,
                Article.category_id == article.category_id,
                Article.id != article_id
            )
            .order_by(Article.published_at.desc())
            .limit(limit)
        )
        return result.scalars().all()
