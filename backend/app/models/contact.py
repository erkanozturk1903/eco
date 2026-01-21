from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime

from app.core.database import Base


class ContactSubmission(Base):
    """Contact form submissions"""
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50))
    company = Column(String(255))
    subject = Column(String(255))
    message = Column(Text, nullable=False)

    # Status
    is_read = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    is_starred = Column(Boolean, default=False)

    # Admin notes
    notes = Column(Text)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    read_at = Column(DateTime, nullable=True)
