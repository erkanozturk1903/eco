from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class SiteSetting(Base):
    """Key-value store for site settings"""
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(Text)
    category = Column(String(50), index=True)  # general, contact, social
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class HeroSlide(Base):
    """Hero carousel slides"""
    __tablename__ = "hero_slides"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(500), nullable=False)
    text_position = Column(String(50), default="center")
    show_text = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class HeroContent(Base):
    """Hero section text content"""
    __tablename__ = "hero_content"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    subtitle = Column(Text)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class StatItem(Base):
    """Statistics section items"""
    __tablename__ = "stat_items"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(50), nullable=False)
    value = Column(String(50), nullable=False)
    label = Column(String(100), nullable=False)
    description = Column(String(255))
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class WhyUsItem(Base):
    """Why Us section items"""
    __tablename__ = "why_us_items"

    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
