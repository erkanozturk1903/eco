from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ============ About Content ============

class AboutContentBase(BaseModel):
    section: str
    title: Optional[str] = None
    content: str


class AboutContentCreate(AboutContentBase):
    pass


class AboutContentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class AboutContentResponse(AboutContentBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Team Member ============

class TeamMemberBase(BaseModel):
    name: str
    title: str
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    bio: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    bio: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class TeamMemberResponse(TeamMemberBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Certification ============

class CertificationBase(BaseModel):
    short_name: str
    full_name: str
    logo_url: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class CertificationCreate(CertificationBase):
    pass


class CertificationUpdate(BaseModel):
    short_name: Optional[str] = None
    full_name: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class CertificationResponse(CertificationBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Milestone ============

class MilestoneBase(BaseModel):
    year: str
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class MilestoneCreate(MilestoneBase):
    pass


class MilestoneUpdate(BaseModel):
    year: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class MilestoneResponse(MilestoneBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Combined About Page ============

class AboutPageResponse(BaseModel):
    content: List[AboutContentResponse]
    team: List[TeamMemberResponse]
    certifications: List[CertificationResponse]
    milestones: List[MilestoneResponse]
