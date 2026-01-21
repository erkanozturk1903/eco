from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ============ Article Category ============

class ArticleCategoryBase(BaseModel):
    name: str
    slug: str
    color: Optional[str] = None
    order: Optional[int] = 0


class ArticleCategoryCreate(ArticleCategoryBase):
    pass


class ArticleCategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None


class ArticleCategoryResponse(ArticleCategoryBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Article ============

class ArticleBase(BaseModel):
    slug: str
    title: str
    excerpt: Optional[str] = None
    content: str
    category_id: Optional[int] = None
    read_time: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = False
    is_published: Optional[bool] = False


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category_id: Optional[int] = None
    read_time: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None


class ArticleResponse(ArticleBase):
    id: int
    views: int = 0
    category: Optional[ArticleCategoryResponse] = None
    published_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ArticleListResponse(BaseModel):
    id: int
    slug: str
    title: str
    excerpt: Optional[str] = None
    category: Optional[ArticleCategoryResponse] = None
    read_time: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool
    is_published: bool
    views: int = 0
    published_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Articles Page Response ============

class ArticlesPageResponse(BaseModel):
    articles: List[ArticleListResponse]
    categories: List[ArticleCategoryResponse]
    total: int
    page: int
    per_page: int
