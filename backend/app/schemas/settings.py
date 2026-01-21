from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


# ============ Site Settings ============

class SettingBase(BaseModel):
    key: str
    value: Optional[str] = None
    category: Optional[str] = None


class SettingCreate(SettingBase):
    pass


class SettingUpdate(BaseModel):
    value: Optional[str] = None


class SettingResponse(SettingBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class SettingsByCategoryResponse(BaseModel):
    """Grouped settings by category"""
    general: Dict[str, str] = {}
    contact: Dict[str, str] = {}
    social: Dict[str, str] = {}


class GeneralSettingsUpdate(BaseModel):
    company_name: Optional[str] = None
    logo_url: Optional[str] = None
    tagline: Optional[str] = None
    footer_text: Optional[str] = None
    copyright_text: Optional[str] = None


class ContactSettingsUpdate(BaseModel):
    email: Optional[str] = None
    phone1: Optional[str] = None
    phone2: Optional[str] = None
    address: Optional[str] = None
    working_hours: Optional[str] = None


class SocialSettingsUpdate(BaseModel):
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    instagram_url: Optional[str] = None
    facebook_url: Optional[str] = None


# ============ Hero Slides ============

class HeroSlideBase(BaseModel):
    image_url: str
    text_position: Optional[str] = "center"
    show_text: Optional[bool] = True
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class HeroSlideCreate(HeroSlideBase):
    pass


class HeroSlideUpdate(BaseModel):
    image_url: Optional[str] = None
    text_position: Optional[str] = None
    show_text: Optional[bool] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class HeroSlideResponse(HeroSlideBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class HeroSlideReorder(BaseModel):
    slide_ids: List[int]  # Ordered list of slide IDs


# ============ Hero Content ============

class HeroContentBase(BaseModel):
    title: str
    subtitle: Optional[str] = None


class HeroContentUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None


class HeroContentResponse(HeroContentBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Stat Items ============

class StatItemBase(BaseModel):
    icon: str
    value: str
    label: str
    description: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class StatItemCreate(StatItemBase):
    pass


class StatItemUpdate(BaseModel):
    icon: Optional[str] = None
    value: Optional[str] = None
    label: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class StatItemResponse(StatItemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Why Us Items ============

class WhyUsItemBase(BaseModel):
    icon: str
    title: str
    description: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True


class WhyUsItemCreate(WhyUsItemBase):
    pass


class WhyUsItemUpdate(BaseModel):
    icon: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class WhyUsItemResponse(WhyUsItemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============ Combined Responses ============

class HomePageContentResponse(BaseModel):
    """Combined response for home page content"""
    hero_slides: List[HeroSlideResponse]
    hero_content: Optional[HeroContentResponse]
    stats: List[StatItemResponse]
    why_us: List[WhyUsItemResponse]
    settings: SettingsByCategoryResponse
