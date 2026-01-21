from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class AboutContent(Base):
    """About page content sections (intro, mission, vision)"""
    __tablename__ = "about_content"

    id = Column(Integer, primary_key=True, index=True)
    section = Column(String(50), unique=True, index=True, nullable=False)  # 'intro', 'mission', 'vision'
    title = Column(String(255))
    content = Column(Text, nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class TeamMember(Base):
    """Team members"""
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(100), nullable=False)
    photo_url = Column(String(500))
    linkedin_url = Column(String(255))
    bio = Column(Text)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Certification(Base):
    """Certifications and partnerships"""
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    short_name = Column(String(50), nullable=False)
    full_name = Column(String(255), nullable=False)
    logo_url = Column(String(500))
    description = Column(Text)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Milestone(Base):
    """Company history milestones"""
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String(10), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    icon = Column(String(50))
    color = Column(String(100))  # gradient class like 'from-primary to-secondary'
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
