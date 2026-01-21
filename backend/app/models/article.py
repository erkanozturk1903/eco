from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class ArticleCategory(Base):
    """Article categories"""
    __tablename__ = "article_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    color = Column(String(100))  # bg-primary/10 text-primary
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    articles = relationship("Article", back_populates="category")


class Article(Base):
    """Blog articles"""
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)  # Markdown content
    category_id = Column(Integer, ForeignKey("article_categories.id"), nullable=True)
    read_time = Column(String(20))
    author = Column(String(100))
    image_url = Column(String(500))
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=False)
    views = Column(Integer, default=0)
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    category = relationship("ArticleCategory", back_populates="articles")
