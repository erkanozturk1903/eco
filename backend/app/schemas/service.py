from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ============ Service Item ============

class ServiceItemBase(BaseModel):
    description: str
    order: Optional[int] = 0


class ServiceItemCreate(ServiceItemBase):
    pass


class ServiceItemUpdate(BaseModel):
    description: Optional[str] = None
    order: Optional[int] = None


class ServiceItemResponse(ServiceItemBase):
    id: int
    service_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Service ============

class ServiceBase(BaseModel):
    slug: str
    title: str
    subtitle: Optional[str] = None
    mission: Optional[str] = None
    image_url: Optional[str] = None
    gradient: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class ServiceCreate(ServiceBase):
    items: Optional[List[ServiceItemCreate]] = []


class ServiceUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    subtitle: Optional[str] = None
    mission: Optional[str] = None
    image_url: Optional[str] = None
    gradient: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class ServiceResponse(ServiceBase):
    id: int
    items: List[ServiceItemResponse] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ServiceListResponse(BaseModel):
    id: int
    slug: str
    title: str
    subtitle: Optional[str] = None
    image_url: Optional[str] = None
    gradient: Optional[str] = None
    color: Optional[str] = None
    order: int
    is_active: bool

    class Config:
        from_attributes = True


# ============ Process Step ============

class ProcessStepBase(BaseModel):
    number: str
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class ProcessStepCreate(ProcessStepBase):
    pass


class ProcessStepUpdate(BaseModel):
    number: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class ProcessStepResponse(ProcessStepBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Services Page ============

class ServicesPageResponse(BaseModel):
    services: List[ServiceResponse]
    process_steps: List[ProcessStepResponse]
