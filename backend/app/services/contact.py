from typing import Optional, List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from datetime import datetime, timedelta

from app.models.contact import ContactSubmission
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionUpdate, ContactStatsResponse


class ContactService:
    """Service for contact form submissions"""

    @staticmethod
    async def get_all_submissions(
        db: AsyncSession,
        is_archived: Optional[bool] = None,
        is_read: Optional[bool] = None,
        is_starred: Optional[bool] = None,
        search: Optional[str] = None,
        page: int = 1,
        per_page: int = 20
    ) -> Tuple[List[ContactSubmission], int]:
        """Get paginated submissions with filters"""
        query = select(ContactSubmission)

        # Apply filters
        if is_archived is not None:
            query = query.where(ContactSubmission.is_archived == is_archived)
        if is_read is not None:
            query = query.where(ContactSubmission.is_read == is_read)
        if is_starred is not None:
            query = query.where(ContactSubmission.is_starred == is_starred)
        if search:
            search_filter = f"%{search}%"
            query = query.where(
                (ContactSubmission.first_name.ilike(search_filter)) |
                (ContactSubmission.last_name.ilike(search_filter)) |
                (ContactSubmission.email.ilike(search_filter)) |
                (ContactSubmission.company.ilike(search_filter)) |
                (ContactSubmission.subject.ilike(search_filter))
            )

        # Count total
        count_query = select(func.count(ContactSubmission.id))
        if is_archived is not None:
            count_query = count_query.where(ContactSubmission.is_archived == is_archived)
        if is_read is not None:
            count_query = count_query.where(ContactSubmission.is_read == is_read)
        if is_starred is not None:
            count_query = count_query.where(ContactSubmission.is_starred == is_starred)

        total_result = await db.execute(count_query)
        total = total_result.scalar()

        # Order and paginate
        query = query.order_by(ContactSubmission.created_at.desc())
        query = query.offset((page - 1) * per_page).limit(per_page)

        result = await db.execute(query)
        submissions = result.scalars().all()

        return submissions, total

    @staticmethod
    async def get_submission_by_id(db: AsyncSession, submission_id: int) -> Optional[ContactSubmission]:
        result = await db.execute(
            select(ContactSubmission).where(ContactSubmission.id == submission_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_submission(db: AsyncSession, data: ContactSubmissionCreate) -> ContactSubmission:
        submission = ContactSubmission(**data.model_dump())
        db.add(submission)
        await db.commit()
        await db.refresh(submission)
        return submission

    @staticmethod
    async def update_submission(
        db: AsyncSession,
        submission_id: int,
        data: ContactSubmissionUpdate
    ) -> Optional[ContactSubmission]:
        submission = await ContactService.get_submission_by_id(db, submission_id)
        if not submission:
            return None

        updates = data.model_dump(exclude_unset=True)

        # Set read_at when marking as read
        if updates.get("is_read") and not submission.is_read:
            updates["read_at"] = datetime.utcnow()

        for key, value in updates.items():
            setattr(submission, key, value)

        await db.commit()
        await db.refresh(submission)
        return submission

    @staticmethod
    async def delete_submission(db: AsyncSession, submission_id: int) -> bool:
        submission = await ContactService.get_submission_by_id(db, submission_id)
        if not submission:
            return False
        await db.delete(submission)
        await db.commit()
        return True

    @staticmethod
    async def mark_as_read(db: AsyncSession, submission_id: int) -> Optional[ContactSubmission]:
        submission = await ContactService.get_submission_by_id(db, submission_id)
        if not submission:
            return None

        if not submission.is_read:
            submission.is_read = True
            submission.read_at = datetime.utcnow()
            await db.commit()
            await db.refresh(submission)

        return submission

    @staticmethod
    async def get_stats(db: AsyncSession) -> ContactStatsResponse:
        """Get contact submission statistics"""
        now = datetime.utcnow()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=now.weekday())

        # Total
        total_result = await db.execute(select(func.count(ContactSubmission.id)))
        total = total_result.scalar() or 0

        # Unread
        unread_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(ContactSubmission.is_read == False)
        )
        unread = unread_result.scalar() or 0

        # Starred
        starred_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(ContactSubmission.is_starred == True)
        )
        starred = starred_result.scalar() or 0

        # Archived
        archived_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(ContactSubmission.is_archived == True)
        )
        archived = archived_result.scalar() or 0

        # Today
        today_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(
                ContactSubmission.created_at >= today_start
            )
        )
        today = today_result.scalar() or 0

        # This week
        week_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(
                ContactSubmission.created_at >= week_start
            )
        )
        this_week = week_result.scalar() or 0

        return ContactStatsResponse(
            total=total,
            unread=unread,
            starred=starred,
            archived=archived,
            today=today,
            this_week=this_week
        )

    @staticmethod
    async def get_unread_count(db: AsyncSession) -> int:
        """Get count of unread submissions"""
        result = await db.execute(
            select(func.count(ContactSubmission.id)).where(
                ContactSubmission.is_read == False,
                ContactSubmission.is_archived == False
            )
        )
        return result.scalar() or 0
