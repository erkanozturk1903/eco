from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.models.about import AboutContent, TeamMember, Certification, Milestone
from app.schemas.about import (
    AboutContentCreate, AboutContentUpdate,
    TeamMemberCreate, TeamMemberUpdate,
    CertificationCreate, CertificationUpdate,
    MilestoneCreate, MilestoneUpdate
)


class AboutContentService:
    """Service for about page content management"""

    @staticmethod
    async def get_all_content(db: AsyncSession) -> List[AboutContent]:
        result = await db.execute(select(AboutContent))
        return result.scalars().all()

    @staticmethod
    async def get_content_by_section(db: AsyncSession, section: str) -> Optional[AboutContent]:
        result = await db.execute(
            select(AboutContent).where(AboutContent.section == section)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_content_by_id(db: AsyncSession, content_id: int) -> Optional[AboutContent]:
        result = await db.execute(
            select(AboutContent).where(AboutContent.id == content_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_content(db: AsyncSession, data: AboutContentCreate) -> AboutContent:
        content = AboutContent(**data.model_dump())
        db.add(content)
        await db.commit()
        await db.refresh(content)
        return content

    @staticmethod
    async def update_content(db: AsyncSession, content_id: int, data: AboutContentUpdate) -> Optional[AboutContent]:
        content = await AboutContentService.get_content_by_id(db, content_id)
        if not content:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(content, key, value)
        await db.commit()
        await db.refresh(content)
        return content

    @staticmethod
    async def upsert_by_section(db: AsyncSession, section: str, data: AboutContentUpdate) -> AboutContent:
        """Create or update content by section"""
        existing = await AboutContentService.get_content_by_section(db, section)
        if existing:
            updates = data.model_dump(exclude_unset=True)
            for key, value in updates.items():
                setattr(existing, key, value)
            await db.commit()
            await db.refresh(existing)
            return existing
        else:
            content = AboutContent(
                section=section,
                title=data.title,
                content=data.content or ""
            )
            db.add(content)
            await db.commit()
            await db.refresh(content)
            return content

    @staticmethod
    async def delete_content(db: AsyncSession, content_id: int) -> bool:
        content = await AboutContentService.get_content_by_id(db, content_id)
        if not content:
            return False
        await db.delete(content)
        await db.commit()
        return True


class TeamMemberService:
    """Service for team member management"""

    @staticmethod
    async def get_all_members(db: AsyncSession, active_only: bool = False) -> List[TeamMember]:
        query = select(TeamMember).order_by(TeamMember.order)
        if active_only:
            query = query.where(TeamMember.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_member_by_id(db: AsyncSession, member_id: int) -> Optional[TeamMember]:
        result = await db.execute(
            select(TeamMember).where(TeamMember.id == member_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_member(db: AsyncSession, data: TeamMemberCreate) -> TeamMember:
        member = TeamMember(**data.model_dump())
        db.add(member)
        await db.commit()
        await db.refresh(member)
        return member

    @staticmethod
    async def update_member(db: AsyncSession, member_id: int, data: TeamMemberUpdate) -> Optional[TeamMember]:
        member = await TeamMemberService.get_member_by_id(db, member_id)
        if not member:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(member, key, value)
        await db.commit()
        await db.refresh(member)
        return member

    @staticmethod
    async def delete_member(db: AsyncSession, member_id: int) -> bool:
        member = await TeamMemberService.get_member_by_id(db, member_id)
        if not member:
            return False
        await db.delete(member)
        await db.commit()
        return True

    @staticmethod
    async def reorder_members(db: AsyncSession, member_ids: List[int]) -> List[TeamMember]:
        """Reorder members based on the provided list of IDs"""
        for index, member_id in enumerate(member_ids):
            await db.execute(
                update(TeamMember).where(TeamMember.id == member_id).values(order=index)
            )
        await db.commit()
        return await TeamMemberService.get_all_members(db)


class CertificationService:
    """Service for certification management"""

    @staticmethod
    async def get_all_certifications(db: AsyncSession, active_only: bool = False) -> List[Certification]:
        query = select(Certification).order_by(Certification.order)
        if active_only:
            query = query.where(Certification.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_certification_by_id(db: AsyncSession, cert_id: int) -> Optional[Certification]:
        result = await db.execute(
            select(Certification).where(Certification.id == cert_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_certification(db: AsyncSession, data: CertificationCreate) -> Certification:
        cert = Certification(**data.model_dump())
        db.add(cert)
        await db.commit()
        await db.refresh(cert)
        return cert

    @staticmethod
    async def update_certification(db: AsyncSession, cert_id: int, data: CertificationUpdate) -> Optional[Certification]:
        cert = await CertificationService.get_certification_by_id(db, cert_id)
        if not cert:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(cert, key, value)
        await db.commit()
        await db.refresh(cert)
        return cert

    @staticmethod
    async def delete_certification(db: AsyncSession, cert_id: int) -> bool:
        cert = await CertificationService.get_certification_by_id(db, cert_id)
        if not cert:
            return False
        await db.delete(cert)
        await db.commit()
        return True


class MilestoneService:
    """Service for milestone management"""

    @staticmethod
    async def get_all_milestones(db: AsyncSession, active_only: bool = False) -> List[Milestone]:
        query = select(Milestone).order_by(Milestone.order)
        if active_only:
            query = query.where(Milestone.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_milestone_by_id(db: AsyncSession, milestone_id: int) -> Optional[Milestone]:
        result = await db.execute(
            select(Milestone).where(Milestone.id == milestone_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_milestone(db: AsyncSession, data: MilestoneCreate) -> Milestone:
        milestone = Milestone(**data.model_dump())
        db.add(milestone)
        await db.commit()
        await db.refresh(milestone)
        return milestone

    @staticmethod
    async def update_milestone(db: AsyncSession, milestone_id: int, data: MilestoneUpdate) -> Optional[Milestone]:
        milestone = await MilestoneService.get_milestone_by_id(db, milestone_id)
        if not milestone:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(milestone, key, value)
        await db.commit()
        await db.refresh(milestone)
        return milestone

    @staticmethod
    async def delete_milestone(db: AsyncSession, milestone_id: int) -> bool:
        milestone = await MilestoneService.get_milestone_by_id(db, milestone_id)
        if not milestone:
            return False
        await db.delete(milestone)
        await db.commit()
        return True
