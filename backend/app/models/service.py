from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Service(Base):
    """Main services (FERA SUSTAIN, HUMAN, SOCIAL, RISK)"""
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(100), nullable=False)  # FERA SUSTAIN
    subtitle = Column(String(255))  # Sürdürülebilirlik Danışmanlığı
    mission = Column(Text)
    image_url = Column(String(500))
    gradient = Column(String(100))  # from-emerald-500 to-teal-600
    color = Column(String(50))  # bg-emerald-500
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship with service items
    items = relationship("ServiceItem", back_populates="service", cascade="all, delete-orphan", order_by="ServiceItem.order")


class ServiceItem(Base):
    """Service sub-items/features"""
    __tablename__ = "service_items"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, nullable=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    service = relationship("Service", back_populates="items")


class ProcessStep(Base):
    """How it works - process steps"""
    __tablename__ = "process_steps"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(10), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    icon = Column(String(50))
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
