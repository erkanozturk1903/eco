from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.services.service import ServiceService, ServiceItemService, ProcessStepService
from app.schemas.service import (
    ServiceCreate, ServiceUpdate, ServiceResponse, ServiceListResponse,
    ServiceItemCreate, ServiceItemUpdate, ServiceItemResponse,
    ProcessStepCreate, ProcessStepUpdate, ProcessStepResponse,
    ServicesPageResponse
)

router = APIRouter()


# ============ Combined Services Page ============

@router.get("/page", response_model=ServicesPageResponse)
async def get_services_page(db: AsyncSession = Depends(get_db)):
    """Get all services page content (public)"""
    services = await ServiceService.get_all_services(db, active_only=True)
    process_steps = await ProcessStepService.get_all_steps(db, active_only=True)

    return ServicesPageResponse(
        services=services,
        process_steps=process_steps
    )


# ============ Services ============

@router.get("/", response_model=List[ServiceListResponse])
async def get_all_services(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all services (public)"""
    return await ServiceService.get_all_services(db, active_only)


@router.get("/{service_id_or_slug}", response_model=ServiceResponse)
async def get_service(service_id_or_slug: str, db: AsyncSession = Depends(get_db)):
    """Get a single service by ID or slug (public)"""
    # Try by ID first
    if service_id_or_slug.isdigit():
        service = await ServiceService.get_service_by_id(db, int(service_id_or_slug))
    else:
        service = await ServiceService.get_service_by_slug(db, service_id_or_slug)

    if not service:
        raise HTTPException(status_code=404, detail="Hizmet bulunamadı")
    return service


@router.post("/", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_service(
    data: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new service (admin only)"""
    return await ServiceService.create_service(db, data)


@router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: int,
    data: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a service (admin only)"""
    service = await ServiceService.update_service(db, service_id, data)
    if not service:
        raise HTTPException(status_code=404, detail="Hizmet bulunamadı")
    return service


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(
    service_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a service (admin only)"""
    success = await ServiceService.delete_service(db, service_id)
    if not success:
        raise HTTPException(status_code=404, detail="Hizmet bulunamadı")


# ============ Service Items ============

@router.get("/{service_id}/items", response_model=List[ServiceItemResponse])
async def get_service_items(service_id: int, db: AsyncSession = Depends(get_db)):
    """Get all items for a service (public)"""
    return await ServiceItemService.get_items_by_service(db, service_id)


@router.post("/{service_id}/items", response_model=ServiceItemResponse, status_code=status.HTTP_201_CREATED)
async def create_service_item(
    service_id: int,
    data: ServiceItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new service item (admin only)"""
    return await ServiceItemService.create_item(db, service_id, data)


@router.put("/{service_id}/items", response_model=List[ServiceItemResponse])
async def update_service_items(
    service_id: int,
    data: List[ServiceItemCreate],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Bulk update/replace service items (admin only)"""
    return await ServiceItemService.bulk_update_items(db, service_id, data)


@router.put("/items/{item_id}", response_model=ServiceItemResponse)
async def update_service_item(
    item_id: int,
    data: ServiceItemUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a single service item (admin only)"""
    item = await ServiceItemService.update_item(db, item_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="Item bulunamadı")
    return item


@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service_item(
    item_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a service item (admin only)"""
    success = await ServiceItemService.delete_item(db, item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item bulunamadı")


# ============ Process Steps ============

@router.get("/process/steps", response_model=List[ProcessStepResponse])
async def get_process_steps(
    active_only: bool = False,
    db: AsyncSession = Depends(get_db)
):
    """Get all process steps (public)"""
    return await ProcessStepService.get_all_steps(db, active_only)


@router.get("/process/steps/{step_id}", response_model=ProcessStepResponse)
async def get_process_step(step_id: int, db: AsyncSession = Depends(get_db)):
    """Get a single process step"""
    step = await ProcessStepService.get_step_by_id(db, step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Adım bulunamadı")
    return step


@router.post("/process/steps", response_model=ProcessStepResponse, status_code=status.HTTP_201_CREATED)
async def create_process_step(
    data: ProcessStepCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new process step (admin only)"""
    return await ProcessStepService.create_step(db, data)


@router.put("/process/steps/{step_id}", response_model=ProcessStepResponse)
async def update_process_step(
    step_id: int,
    data: ProcessStepUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a process step (admin only)"""
    step = await ProcessStepService.update_step(db, step_id, data)
    if not step:
        raise HTTPException(status_code=404, detail="Adım bulunamadı")
    return step


@router.delete("/process/steps/{step_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_process_step(
    step_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a process step (admin only)"""
    success = await ProcessStepService.delete_step(db, step_id)
    if not success:
        raise HTTPException(status_code=404, detail="Adım bulunamadı")
