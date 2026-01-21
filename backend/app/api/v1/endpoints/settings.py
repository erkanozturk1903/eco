from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.settings import SettingsService
from app.schemas.settings import (
    SettingResponse,
    SettingsByCategoryResponse,
    GeneralSettingsUpdate,
    ContactSettingsUpdate,
    SocialSettingsUpdate
)

router = APIRouter()


# ============ Public Endpoints ============

@router.get("/", response_model=SettingsByCategoryResponse)
async def get_all_settings(db: AsyncSession = Depends(get_db)):
    """Get all settings grouped by category (public)"""
    settings_dict = await SettingsService.get_settings_dict(db)
    return SettingsByCategoryResponse(**settings_dict)


@router.get("/general", response_model=Dict[str, str])
async def get_general_settings(db: AsyncSession = Depends(get_db)):
    """Get general settings (public)"""
    settings = await SettingsService.get_settings_by_category(db, "general")
    return {s.key: s.value or "" for s in settings}


@router.get("/contact", response_model=Dict[str, str])
async def get_contact_settings(db: AsyncSession = Depends(get_db)):
    """Get contact settings (public)"""
    settings = await SettingsService.get_settings_by_category(db, "contact")
    return {s.key: s.value or "" for s in settings}


@router.get("/social", response_model=Dict[str, str])
async def get_social_settings(db: AsyncSession = Depends(get_db)):
    """Get social media settings (public)"""
    settings = await SettingsService.get_settings_by_category(db, "social")
    return {s.key: s.value or "" for s in settings}


# ============ Admin Endpoints ============

@router.put("/general", response_model=Dict[str, str])
async def update_general_settings(
    data: GeneralSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update general settings (admin only)"""
    return await SettingsService.update_general_settings(db, data)


@router.put("/contact", response_model=Dict[str, str])
async def update_contact_settings(
    data: ContactSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update contact settings (admin only)"""
    return await SettingsService.update_contact_settings(db, data)


@router.put("/social", response_model=Dict[str, str])
async def update_social_settings(
    data: SocialSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update social media settings (admin only)"""
    return await SettingsService.update_social_settings(db, data)
