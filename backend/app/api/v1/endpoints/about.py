from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.about import (
    AboutContentService, TeamMemberService,
    CertificationService, MilestoneService
)
from app.schemas.about import (
    AboutContentCreate, AboutContentUpdate, AboutContentResponse,
    TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse,
    CertificationCreate, CertificationUpdate, CertificationResponse,
    MilestoneCreate, MilestoneUpdate, MilestoneResponse,
    AboutPageResponse
)

router = APIRouter()


# ============ Combined About Page ============

@router.get("/page", response_model=AboutPageResponse)
async def get_about_page(db: AsyncSession = Depends(get_db)):
    """Get all about page content (public)"""
    content = await AboutContentService.get_all_content(db)
    team = await TeamMemberService.get_all_members(db, active_only=True)
    certifications = await CertificationService.get_all_certifications(db, active_only=True)
    milestones = await MilestoneService.get_all_milestones(db, active_only=True)

    return AboutPageResponse(
        content=content,
        team=team,
        certifications=certifications,
        milestones=milestones
    )


# ============ About Content ============

@router.get("/content", response_model=List[AboutContentResponse])
async def get_about_content(db: AsyncSession = Depends(get_db)):
    """Get all about content sections (public)"""
    return await AboutContentService.get_all_content(db)


@router.get("/content/{section}", response_model=AboutContentResponse)
async def get_about_section(section: str, db: AsyncSession = Depends(get_db)):
    """Get about content by section (public)"""
    content = await AboutContentService.get_content_by_section(db, section)
    if not content:
        raise HTTPException(status_code=404, detail="Section bulunamadı")
    return content


@router.post("/content", response_model=AboutContentResponse, status_code=status.HTTP_201_CREATED)
async def create_about_content(
    data: AboutContentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create about content (admin only)"""
    return await AboutContentService.create_content(db, data)


@router.put("/content/{content_id}", response_model=AboutContentResponse)
async def update_about_content(
    content_id: int,
    data: AboutContentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update about content (admin only)"""
    content = await AboutContentService.update_content(db, content_id, data)
    if not content:
        raise HTTPException(status_code=404, detail="Content bulunamadı")
    return content


@router.delete("/content/{content_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_about_content(
    content_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete about content (admin only)"""
    success = await AboutContentService.delete_content(db, content_id)
    if not success:
        raise HTTPException(status_code=404, detail="Content bulunamadı")


# ============ Team Members ============

@router.get("/team", response_model=List[TeamMemberResponse])
async def get_team_members(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all team members (public)"""
    return await TeamMemberService.get_all_members(db, active_only)


@router.get("/team/{member_id}", response_model=TeamMemberResponse)
async def get_team_member(member_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single team member"""
    member = await TeamMemberService.get_member_by_id(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Üye bulunamadı")
    return member


@router.post("/team", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
async def create_team_member(
    data: TeamMemberCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new team member (admin only)"""
    return await TeamMemberService.create_member(db, data)


@router.put("/team/{member_id}", response_model=TeamMemberResponse)
async def update_team_member(
    member_id: int,
    data: TeamMemberUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a team member (admin only)"""
    member = await TeamMemberService.update_member(db, member_id, data)
    if not member:
        raise HTTPException(status_code=404, detail="Üye bulunamadı")
    return member


@router.delete("/team/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team_member(
    member_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a team member (admin only)"""
    success = await TeamMemberService.delete_member(db, member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Üye bulunamadı")


# ============ Certifications ============

@router.get("/certifications", response_model=List[CertificationResponse])
async def get_certifications(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all certifications (public)"""
    return await CertificationService.get_all_certifications(db, active_only)


@router.get("/certifications/{cert_id}", response_model=CertificationResponse)
async def get_certification(cert_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single certification"""
    cert = await CertificationService.get_certification_by_id(db, cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Sertifika bulunamadı")
    return cert


@router.post("/certifications", response_model=CertificationResponse, status_code=status.HTTP_201_CREATED)
async def create_certification(
    data: CertificationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new certification (admin only)"""
    return await CertificationService.create_certification(db, data)


@router.put("/certifications/{cert_id}", response_model=CertificationResponse)
async def update_certification(
    cert_id: int,
    data: CertificationUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a certification (admin only)"""
    cert = await CertificationService.update_certification(db, cert_id, data)
    if not cert:
        raise HTTPException(status_code=404, detail="Sertifika bulunamadı")
    return cert


@router.delete("/certifications/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certification(
    cert_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a certification (admin only)"""
    success = await CertificationService.delete_certification(db, cert_id)
    if not success:
        raise HTTPException(status_code=404, detail="Sertifika bulunamadı")


# ============ Milestones ============

@router.get("/milestones", response_model=List[MilestoneResponse])
async def get_milestones(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all milestones (public)"""
    return await MilestoneService.get_all_milestones(db, active_only)


@router.get("/milestones/{milestone_id}", response_model=MilestoneResponse)
async def get_milestone(milestone_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single milestone"""
    milestone = await MilestoneService.get_milestone_by_id(db, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="Kilometre taşı bulunamadı")
    return milestone


@router.post("/milestones", response_model=MilestoneResponse, status_code=status.HTTP_201_CREATED)
async def create_milestone(
    data: MilestoneCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new milestone (admin only)"""
    return await MilestoneService.create_milestone(db, data)


@router.put("/milestones/{milestone_id}", response_model=MilestoneResponse)
async def update_milestone(
    milestone_id: int,
    data: MilestoneUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a milestone (admin only)"""
    milestone = await MilestoneService.update_milestone(db, milestone_id, data)
    if not milestone:
        raise HTTPException(status_code=404, detail="Kilometre taşı bulunamadı")
    return milestone


@router.delete("/milestones/{milestone_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_milestone(
    milestone_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a milestone (admin only)"""
    success = await MilestoneService.delete_milestone(db, milestone_id)
    if not success:
        raise HTTPException(status_code=404, detail="Kilometre taşı bulunamadı")
