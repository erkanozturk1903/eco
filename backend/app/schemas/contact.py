from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ============ Contact Submission ============

class ContactSubmissionCreate(BaseModel):
    """Public form submission"""
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str


class ContactSubmissionUpdate(BaseModel):
    """Admin update (read status, notes, etc.)"""
    is_read: Optional[bool] = None
    is_archived: Optional[bool] = None
    is_starred: Optional[bool] = None
    notes: Optional[str] = None


class ContactSubmissionResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str
    is_read: bool
    is_archived: bool
    is_starred: bool
    notes: Optional[str] = None
    created_at: datetime
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ContactSubmissionListResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    company: Optional[str] = None
    subject: Optional[str] = None
    is_read: bool
    is_archived: bool
    is_starred: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactStatsResponse(BaseModel):
    total: int
    unread: int
    starred: int
    archived: int
    today: int
    this_week: int
