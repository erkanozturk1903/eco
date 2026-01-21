from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.settings import HeroService, ContentService, SettingsService
from app.schemas.settings import (
    HeroSlideCreate, HeroSlideUpdate, HeroSlideResponse, HeroSlideReorder,
    HeroContentUpdate, HeroContentResponse,
    StatItemCreate, StatItemUpdate, StatItemResponse,
    WhyUsItemCreate, WhyUsItemUpdate, WhyUsItemResponse,
    HomePageContentResponse
)

router = APIRouter()


# ============ Combined Homepage Content ============

@router.get("/homepage", response_model=HomePageContentResponse)
async def get_homepage_content(db: AsyncSession = Depends(get_db)):
    """Get all homepage content in a single request (public)"""
    hero_slides = await HeroService.get_all_slides(db, active_only=True)
    hero_content = await HeroService.get_hero_content(db)
    stats = await ContentService.get_all_stats(db, active_only=True)
    why_us = await ContentService.get_all_why_us(db, active_only=True)
    settings = await SettingsService.get_settings_dict(db)

    return HomePageContentResponse(
        hero_slides=hero_slides,
        hero_content=hero_content,
        stats=stats,
        why_us=why_us,
        settings=settings
    )


# ============ Hero Slides ============

@router.get("/hero/slides", response_model=List[HeroSlideResponse])
async def get_hero_slides(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all hero slides (public)"""
    return await HeroService.get_all_slides(db, active_only)


@router.post("/hero/slides", response_model=HeroSlideResponse, status_code=status.HTTP_201_CREATED)
async def create_hero_slide(
    data: HeroSlideCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new hero slide (admin only)"""
    return await HeroService.create_slide(db, data)


@router.get("/hero/slides/{slide_id}", response_model=HeroSlideResponse)
async def get_hero_slide(slide_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single hero slide"""
    slide = await HeroService.get_slide_by_id(db, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide bulunamadı")
    return slide


@router.put("/hero/slides/{slide_id}", response_model=HeroSlideResponse)
async def update_hero_slide(
    slide_id: int,
    data: HeroSlideUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a hero slide (admin only)"""
    slide = await HeroService.update_slide(db, slide_id, data)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide bulunamadı")
    return slide


@router.delete("/hero/slides/{slide_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_hero_slide(
    slide_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a hero slide (admin only)"""
    success = await HeroService.delete_slide(db, slide_id)
    if not success:
        raise HTTPException(status_code=404, detail="Slide bulunamadı")


@router.put("/hero/slides/reorder", response_model=List[HeroSlideResponse])
async def reorder_hero_slides(
    data: HeroSlideReorder,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Reorder hero slides (admin only)"""
    return await HeroService.reorder_slides(db, data.slide_ids)


# ============ Hero Content ============

@router.get("/hero/text", response_model=HeroContentResponse)
async def get_hero_content(db: AsyncSession = Depends(get_db)):
    """Get hero text content (public)"""
    content = await HeroService.get_hero_content(db)
    if not content:
        return HeroContentResponse(id=0, title="", subtitle="")
    return content


@router.put("/hero/text", response_model=HeroContentResponse)
async def update_hero_content(
    data: HeroContentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update hero text content (admin only)"""
    return await HeroService.update_hero_content(db, data)


# ============ Stats Section ============

@router.get("/stats", response_model=List[StatItemResponse])
async def get_stats(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all stat items (public)"""
    return await ContentService.get_all_stats(db, active_only)


@router.post("/stats", response_model=StatItemResponse, status_code=status.HTTP_201_CREATED)
async def create_stat(
    data: StatItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new stat item (admin only)"""
    return await ContentService.create_stat(db, data)


@router.get("/stats/{stat_id}", response_model=StatItemResponse)
async def get_stat(stat_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single stat item"""
    stat = await ContentService.get_stat_by_id(db, stat_id)
    if not stat:
        raise HTTPException(status_code=404, detail="Stat bulunamadı")
    return stat


@router.put("/stats/{stat_id}", response_model=StatItemResponse)
async def update_stat(
    stat_id: int,
    data: StatItemUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a stat item (admin only)"""
    stat = await ContentService.update_stat(db, stat_id, data)
    if not stat:
        raise HTTPException(status_code=404, detail="Stat bulunamadı")
    return stat


@router.delete("/stats/{stat_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_stat(
    stat_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a stat item (admin only)"""
    success = await ContentService.delete_stat(db, stat_id)
    if not success:
        raise HTTPException(status_code=404, detail="Stat bulunamadı")


# ============ Why Us Section ============

@router.get("/why-us", response_model=List[WhyUsItemResponse])
async def get_why_us(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all Why Us items (public)"""
    return await ContentService.get_all_why_us(db, active_only)


@router.post("/why-us", response_model=WhyUsItemResponse, status_code=status.HTTP_201_CREATED)
async def create_why_us(
    data: WhyUsItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new Why Us item (admin only)"""
    return await ContentService.create_why_us(db, data)


@router.get("/why-us/{item_id}", response_model=WhyUsItemResponse)
async def get_why_us_item(item_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single Why Us item"""
    item = await ContentService.get_why_us_by_id(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item bulunamadı")
    return item


@router.put("/why-us/{item_id}", response_model=WhyUsItemResponse)
async def update_why_us(
    item_id: int,
    data: WhyUsItemUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a Why Us item (admin only)"""
    item = await ContentService.update_why_us(db, item_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="Item bulunamadı")
    return item


@router.delete("/why-us/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_why_us(
    item_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a Why Us item (admin only)"""
    success = await ContentService.delete_why_us(db, item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item bulunamadı")
