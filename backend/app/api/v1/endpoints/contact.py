from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.contact import ContactService
from app.schemas.contact import (
    ContactSubmissionCreate, ContactSubmissionUpdate,
    ContactSubmissionResponse, ContactSubmissionListResponse,
    ContactStatsResponse
)

router = APIRouter()


# ============ Public Endpoints ============

@router.post("/", response_model=ContactSubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(
    data: ContactSubmissionCreate,
    db: AsyncSession = Depends(get_db)
):
    """Submit a contact form (public)"""
    return await ContactService.create_submission(db, data)


# ============ Admin Endpoints ============

@router.get("/submissions", response_model=List[ContactSubmissionListResponse])
async def get_submissions(
    is_archived: Optional[bool] = None,
    is_read: Optional[bool] = None,
    is_starred: Optional[bool] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all contact submissions with filters (admin only)"""
    submissions, total = await ContactService.get_all_submissions(
        db,
        is_archived=is_archived,
        is_read=is_read,
        is_starred=is_starred,
        search=search,
        page=page,
        per_page=per_page
    )
    return submissions


@router.get("/submissions/stats", response_model=ContactStatsResponse)
async def get_submission_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get contact submission statistics (admin only)"""
    return await ContactService.get_stats(db)


@router.get("/submissions/unread-count")
async def get_unread_count(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get count of unread submissions (admin only)"""
    count = await ContactService.get_unread_count(db)
    return {"count": count}


@router.get("/submissions/{submission_id}", response_model=ContactSubmissionResponse)
async def get_submission(
    submission_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a single submission (admin only)"""
    submission = await ContactService.get_submission_by_id(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    return submission


@router.put("/submissions/{submission_id}", response_model=ContactSubmissionResponse)
async def update_submission(
    submission_id: int,
    data: ContactSubmissionUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a submission (admin only)"""
    submission = await ContactService.update_submission(db, submission_id, data)
    if not submission:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    return submission


@router.post("/submissions/{submission_id}/read", response_model=ContactSubmissionResponse)
async def mark_as_read(
    submission_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark a submission as read (admin only)"""
    submission = await ContactService.mark_as_read(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    return submission


@router.delete("/submissions/{submission_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_submission(
    submission_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a submission (admin only)"""
    success = await ContactService.delete_submission(db, submission_id)
    if not success:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")


@router.post("/submissions/bulk-read", status_code=status.HTTP_200_OK)
async def bulk_mark_as_read(
    submission_ids: List[int],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark multiple submissions as read (admin only)"""
    count = 0
    for submission_id in submission_ids:
        result = await ContactService.mark_as_read(db, submission_id)
        if result:
            count += 1
    return {"marked": count}


@router.post("/submissions/bulk-archive", status_code=status.HTTP_200_OK)
async def bulk_archive(
    submission_ids: List[int],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Archive multiple submissions (admin only)"""
    count = 0
    for submission_id in submission_ids:
        result = await ContactService.update_submission(
            db, submission_id,
            ContactSubmissionUpdate(is_archived=True)
        )
        if result:
            count += 1
    return {"archived": count}
