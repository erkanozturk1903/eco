from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from sqlalchemy.orm import selectinload

from app.models.service import Service, ServiceItem, ProcessStep
from app.schemas.service import (
    ServiceCreate, ServiceUpdate,
    ServiceItemCreate, ServiceItemUpdate,
    ProcessStepCreate, ProcessStepUpdate
)


class ServiceService:
    """Service for services management"""

    @staticmethod
    async def get_all_services(db: AsyncSession, active_only: bool = False) -> List[Service]:
        query = select(Service).options(selectinload(Service.items)).order_by(Service.order)
        if active_only:
            query = query.where(Service.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_service_by_id(db: AsyncSession, service_id: int) -> Optional[Service]:
        result = await db.execute(
            select(Service).options(selectinload(Service.items)).where(Service.id == service_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_service_by_slug(db: AsyncSession, slug: str) -> Optional[Service]:
        result = await db.execute(
            select(Service).options(selectinload(Service.items)).where(Service.slug == slug)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_service(db: AsyncSession, data: ServiceCreate) -> Service:
        items_data = data.items or []
        service_dict = data.model_dump(exclude={"items"})
        service = Service(**service_dict)
        db.add(service)
        await db.commit()
        await db.refresh(service)

        # Create service items
        for idx, item_data in enumerate(items_data):
            item = ServiceItem(
                service_id=service.id,
                description=item_data.description,
                order=item_data.order if item_data.order else idx
            )
            db.add(item)

        await db.commit()
        await db.refresh(service, ["items"])
        return service

    @staticmethod
    async def update_service(db: AsyncSession, service_id: int, data: ServiceUpdate) -> Optional[Service]:
        service = await ServiceService.get_service_by_id(db, service_id)
        if not service:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(service, key, value)
        await db.commit()
        await db.refresh(service)
        return service

    @staticmethod
    async def delete_service(db: AsyncSession, service_id: int) -> bool:
        service = await ServiceService.get_service_by_id(db, service_id)
        if not service:
            return False
        await db.delete(service)
        await db.commit()
        return True

    @staticmethod
    async def reorder_services(db: AsyncSession, service_ids: List[int]) -> List[Service]:
        """Reorder services based on the provided list of IDs"""
        for index, service_id in enumerate(service_ids):
            await db.execute(
                update(Service).where(Service.id == service_id).values(order=index)
            )
        await db.commit()
        return await ServiceService.get_all_services(db)


class ServiceItemService:
    """Service for service items management"""

    @staticmethod
    async def get_items_by_service(db: AsyncSession, service_id: int) -> List[ServiceItem]:
        result = await db.execute(
            select(ServiceItem).where(ServiceItem.service_id == service_id).order_by(ServiceItem.order)
        )
        return result.scalars().all()

    @staticmethod
    async def get_item_by_id(db: AsyncSession, item_id: int) -> Optional[ServiceItem]:
        result = await db.execute(
            select(ServiceItem).where(ServiceItem.id == item_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_item(db: AsyncSession, service_id: int, data: ServiceItemCreate) -> ServiceItem:
        item = ServiceItem(service_id=service_id, **data.model_dump())
        db.add(item)
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def update_item(db: AsyncSession, item_id: int, data: ServiceItemUpdate) -> Optional[ServiceItem]:
        item = await ServiceItemService.get_item_by_id(db, item_id)
        if not item:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(item, key, value)
        await db.commit()
        await db.refresh(item)
        return item

    @staticmethod
    async def delete_item(db: AsyncSession, item_id: int) -> bool:
        item = await ServiceItemService.get_item_by_id(db, item_id)
        if not item:
            return False
        await db.delete(item)
        await db.commit()
        return True

    @staticmethod
    async def bulk_update_items(db: AsyncSession, service_id: int, items: List[ServiceItemCreate]) -> List[ServiceItem]:
        """Replace all items for a service"""
        # Delete existing items
        await db.execute(
            ServiceItem.__table__.delete().where(ServiceItem.service_id == service_id)
        )
        # Create new items
        new_items = []
        for idx, item_data in enumerate(items):
            item = ServiceItem(
                service_id=service_id,
                description=item_data.description,
                order=item_data.order if item_data.order else idx
            )
            db.add(item)
            new_items.append(item)
        await db.commit()
        return await ServiceItemService.get_items_by_service(db, service_id)


class ProcessStepService:
    """Service for process steps management"""

    @staticmethod
    async def get_all_steps(db: AsyncSession, active_only: bool = False) -> List[ProcessStep]:
        query = select(ProcessStep).order_by(ProcessStep.order)
        if active_only:
            query = query.where(ProcessStep.is_active == True)
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_step_by_id(db: AsyncSession, step_id: int) -> Optional[ProcessStep]:
        result = await db.execute(
            select(ProcessStep).where(ProcessStep.id == step_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_step(db: AsyncSession, data: ProcessStepCreate) -> ProcessStep:
        step = ProcessStep(**data.model_dump())
        db.add(step)
        await db.commit()
        await db.refresh(step)
        return step

    @staticmethod
    async def update_step(db: AsyncSession, step_id: int, data: ProcessStepUpdate) -> Optional[ProcessStep]:
        step = await ProcessStepService.get_step_by_id(db, step_id)
        if not step:
            return None
        updates = data.model_dump(exclude_unset=True)
        for key, value in updates.items():
            setattr(step, key, value)
        await db.commit()
        await db.refresh(step)
        return step

    @staticmethod
    async def delete_step(db: AsyncSession, step_id: int) -> bool:
        step = await ProcessStepService.get_step_by_id(db, step_id)
        if not step:
            return False
        await db.delete(step)
        await db.commit()
        return True

    @staticmethod
    async def reorder_steps(db: AsyncSession, step_ids: List[int]) -> List[ProcessStep]:
        """Reorder steps based on the provided list of IDs"""
        for index, step_id in enumerate(step_ids):
            await db.execute(
                update(ProcessStep).where(ProcessStep.id == step_id).values(order=index)
            )
        await db.commit()
        return await ProcessStepService.get_all_steps(db)
