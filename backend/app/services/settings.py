from typing import Optional, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload

from app.models.settings import SiteSetting, HeroSlide, HeroContent, StatItem, WhyUsItem
from app.schemas.settings import (
    SettingCreate, SettingUpdate,
    HeroSlideCreate, HeroSlideUpdate,
    HeroContentUpdate,
    StatItemCreate, StatItemUpdate,
    WhyUsItemCreate, WhyUsItemUpdate,
    GeneralSettingsUpdate, ContactSettingsUpdate, SocialSettingsUpdate
)


class SettingsService:
    """Service for site settings management"""

    # ============ Site Settings ============

    @staticmethod
    async def get_all_settings(db: AsyncSession) -> List[SiteSetting]:
        result = await db.execute(select(SiteSetting))
        return result.scalars().all()

    @staticmethod
    async def get_settings_by_category(db: AsyncSession, category: str) -> List[SiteSetting]:
        result = await db.execute(
            select(SiteSetting).where(SiteSetting.category == category)
        )
        return result.scalars().all()

    @staticmethod
    async def get_settings_dict(db: AsyncSession) -> Dict[str, Dict[str, str]]:
        """Get all settings grouped by category as dict"""
        settings = await SettingsService.get_all_settings(db)
        result = {"general": {}, "contact": {}, "social": {}}
        for setting in settings:
            if setting.category in result:
                result[setting.category][setting.key] = setting.value or ""
        return result

    @staticmethod
    async def get_setting_by_key(db: AsyncSession, key: str) -> Optional[SiteSetting]:
        result = await db.execute(
            select(SiteSetting).where(SiteSetting.key == key)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def upsert_setting(db: AsyncSession, key: str, value: str, category: str = "general") -> SiteSetting:
        """Create or update a setting"""
        existing = await SettingsService.get_setting_by_key(db, key)
        if existing:
            existing.value = value
            existing.category = category
            await db.commit()
            await db.refresh(existing)
            return existing
        else:
            setting = SiteSetting(key=key, value=value, category=category)
            db.add(setting)
            await db.commit()
            await db.refresh(setting)
            return setting

    @staticmethod
    async def update_general_settings(db: AsyncSession, data: GeneralSettingsUpdate) -> Dict[str, str]:
        """Update general settings"""
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            if value is not None:
                await SettingsService.upsert_setting(db, key, value, "general")
        settings = await SettingsService.get_settings_by_category(db, "general")
        return {s.key: s.value for s in settings}

    @staticmethod
    async def update_contact_settings(db: AsyncSession, data: ContactSettingsUpdate) -> Dict[str, str]:
        """Update contact settings"""
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            if value is not None:
                await SettingsService.upsert_setting(db, key, value, "contact")
        settings = await SettingsService.get_settings_by_category(db, "contact")
        return {s.key: s.value for s in settings}

    @staticmethod
    async def update_social_settings(db: AsyncSession, data: SocialSettingsUpdate) -> Dict[str, str]:
        """Update social settings"""
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            if value is not None:
                await SettingsService.upsert_setting(db, key, value, "social")
        settings = await SettingsService.get_settings_by_category(db, "social")
        return {s.key: s.value for s in settings}


class HeroService:
    """Service for hero section management"""

    # ============ Hero Slides ============

    @staticmethod
    async def get_all_slides(db: AsyncSession, active_only: bool = False) -> List[HeroSlide]:
        query = select(HeroSlide).order_by(HeroSlide.order)
        if active_only:
            query = query.where(HeroSlide.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_slide_by_id(db: AsyncSession, slide_id: int) -> Optional[HeroSlide]:
        result = await db.execute(
            select(HeroSlide).where(HeroSlide.id == slide_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_slide(db: AsyncSession, data: HeroSlideCreate) -> HeroSlide:
        slide = HeroSlide(**data.model_dump())
        db.add(slide)
        await db.commit()
        await db.refresh(slide)
        return slide

    @staticmethod
    async def update_slide(db: AsyncSession, slide_id: int, data: HeroSlideUpdate) -> Optional[HeroSlide]:
        slide = await HeroService.get_slide_by_id(db, slide_id)
        if not slide:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(slide, key, value)
        await db.commit()
        await db.refresh(slide)
        return slide

    @staticmethod
    async def delete_slide(db: AsyncSession, slide_id: int) -> bool:
        slide = await HeroService.get_slide_by_id(db, slide_id)
        if not slide:
            return False
        await db.delete(slide)
        await db.commit()
        return True

    @staticmethod
    async def reorder_slides(db: AsyncSession, slide_ids: List[int]) -> List[HeroSlide]:
        """Reorder slides based on the provided list of IDs"""
        for index, slide_id in enumerate(slide_ids):
            await db.execute(
                update(HeroSlide).where(HeroSlide.id == slide_id).values(order=index)
            )
        await db.commit()
        return await HeroService.get_all_slides(db)

    # ============ Hero Content ============

    @staticmethod
    async def get_hero_content(db: AsyncSession) -> Optional[HeroContent]:
        result = await db.execute(select(HeroContent).limit(1))
        return result.scalar_one_or_none()

    @staticmethod
    async def update_hero_content(db: AsyncSession, data: HeroContentUpdate) -> HeroContent:
        content = await HeroService.get_hero_content(db)
        if not content:
            # Create if doesn't exist
            content = HeroContent(
                title=data.title or "",
                subtitle=data.subtitle
            )
            db.add(content)
        else:
            updates = data.model_dump(exclude_unset=True)
            for key, value in updates.items():
                setattr(content, key, value)
        await db.commit()
        await db.refresh(content)
        return content


class ContentService:
    """Service for homepage content sections"""

    # ============ Stat Items ============

    @staticmethod
    async def get_all_stats(db: AsyncSession, active_only: bool = False) -> List[StatItem]:
        query = select(StatItem).order_by(StatItem.order)
        if active_only:
            query = query.where(StatItem.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_stat_by_id(db: AsyncSession, stat_id: int) -> Optional[StatItem]:
        result = await db.execute(
            select(StatItem).where(StatItem.id == stat_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_stat(db: AsyncSession, data: StatItemCreate) -> StatItem:
        stat = StatItem(**data.model_dump())
        db.add(stat)
        await db.commit()
        await db.refresh(stat)
        return stat

    @staticmethod
    async def update_stat(db: AsyncSession, stat_id: int, data: StatItemUpdate) -> Optional[StatItem]:
        stat = await ContentService.get_stat_by_id(db, stat_id)
        if not stat:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(stat, key, value)
        await db.commit()
        await db.refresh(stat)
        return stat

    @staticmethod
    async def delete_stat(db: AsyncSession, stat_id: int) -> bool:
        stat = await ContentService.get_stat_by_id(db, stat_id)
        if not stat:
            return False
        await db.delete(stat)
        await db.commit()
        return True

    # ============ Why Us Items ============

    @staticmethod
    async def get_all_why_us(db: AsyncSession, active_only: bool = False) -> List[WhyUsItem]:
        query = select(WhyUsItem).order_by(WhyUsItem.order)
        if active_only:
            query = query.where(WhyUsItem.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_why_us_by_id(db: AsyncSession, item_id: int) -> Optional[WhyUsItem]:
        result = await db.execute(
            select(WhyUsItem).where(WhyUsItem.id == item_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_why_us(db: AsyncSession, data: WhyUsItemCreate) -> WhyUsItem:
        item = WhyUsItem(**data.model_dump())
        db.add(item)
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def update_why_us(db: AsyncSession, item_id: int, data: WhyUsItemUpdate) -> Optional[WhyUsItem]:
        item = await ContentService.get_why_us_by_id(db, item_id)
        if not item:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(item, key, value)
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def delete_why_us(db: AsyncSession, item_id: int) -> bool:
        item = await ContentService.get_why_us_by_id(db, item_id)
        if not item:
            return False
        await db.delete(item)
        await db.commit()
        return True
