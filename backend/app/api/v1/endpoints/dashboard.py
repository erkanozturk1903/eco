from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta
from typing import List

from app.core.database import get_db
from app.services.auth import get_current_active_user
from app.models.user import User
from app.models.contact import ContactSubmission
from app.models.article import Article
from app.models.service import Service
from app.models.about import TeamMember

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get dashboard statistics (admin only)"""

    # Contact submissions
    total_messages_result = await db.execute(select(func.count(ContactSubmission.id)))
    total_messages = total_messages_result.scalar() or 0

    unread_messages_result = await db.execute(
        select(func.count(ContactSubmission.id)).where(
            ContactSubmission.is_read == False,
            ContactSubmission.is_archived == False
        )
    )
    unread_messages = unread_messages_result.scalar() or 0

    # Articles
    total_articles_result = await db.execute(select(func.count(Article.id)))
    total_articles = total_articles_result.scalar() or 0

    published_articles_result = await db.execute(
        select(func.count(Article.id)).where(Article.is_published == True)
    )
    published_articles = published_articles_result.scalar() or 0

    total_views_result = await db.execute(select(func.sum(Article.views)))
    total_views = total_views_result.scalar() or 0

    # Services
    total_services_result = await db.execute(
        select(func.count(Service.id)).where(Service.is_active == True)
    )
    total_services = total_services_result.scalar() or 0

    # Team
    team_count_result = await db.execute(
        select(func.count(TeamMember.id)).where(TeamMember.is_active == True)
    )
    team_count = team_count_result.scalar() or 0

    return {
        "messages": {
            "total": total_messages,
            "unread": unread_messages
        },
        "articles": {
            "total": total_articles,
            "published": published_articles,
            "views": total_views
        },
        "services": {
            "total": total_services
        },
        "team": {
            "total": team_count
        }
    }


@router.get("/recent-messages")
async def get_recent_messages(
    limit: int = 5,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get recent contact messages (admin only)"""
    result = await db.execute(
        select(ContactSubmission)
        .where(ContactSubmission.is_archived == False)
        .order_by(ContactSubmission.created_at.desc())
        .limit(limit)
    )
    messages = result.scalars().all()

    return [
        {
            "id": msg.id,
            "name": f"{msg.first_name} {msg.last_name}",
            "email": msg.email,
            "company": msg.company,
            "subject": msg.subject,
            "is_read": msg.is_read,
            "created_at": msg.created_at.isoformat()
        }
        for msg in messages
    ]


@router.get("/recent-articles")
async def get_recent_articles(
    limit: int = 5,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get recent articles (admin only)"""
    result = await db.execute(
        select(Article)
        .order_by(Article.created_at.desc())
        .limit(limit)
    )
    articles = result.scalars().all()

    return [
        {
            "id": article.id,
            "title": article.title,
            "slug": article.slug,
            "is_published": article.is_published,
            "views": article.views,
            "created_at": article.created_at.isoformat()
        }
        for article in articles
    ]


@router.get("/activity")
async def get_recent_activity(
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get recent activity for dashboard (admin only)"""
    activities = []

    # Recent messages
    messages_result = await db.execute(
        select(ContactSubmission)
        .order_by(ContactSubmission.created_at.desc())
        .limit(5)
    )
    for msg in messages_result.scalars().all():
        activities.append({
            "type": "message",
            "title": f"Yeni mesaj: {msg.first_name} {msg.last_name}",
            "description": msg.subject or msg.message[:50] + "..." if len(msg.message) > 50 else msg.message,
            "timestamp": msg.created_at.isoformat(),
            "is_read": msg.is_read
        })

    # Recent articles
    articles_result = await db.execute(
        select(Article)
        .order_by(Article.created_at.desc())
        .limit(5)
    )
    for article in articles_result.scalars().all():
        activities.append({
            "type": "article",
            "title": f"Makale: {article.title}",
            "description": f"{'Yayınlandı' if article.is_published else 'Taslak'} - {article.views} görüntüleme",
            "timestamp": article.created_at.isoformat(),
            "is_read": True
        })

    # Sort by timestamp and limit
    activities.sort(key=lambda x: x["timestamp"], reverse=True)
    return activities[:limit]


@router.get("/weekly-stats")
async def get_weekly_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get weekly statistics for charts (admin only)"""
    now = datetime.utcnow()
    week_ago = now - timedelta(days=7)

    # Messages per day for last 7 days
    days = []
    for i in range(6, -1, -1):
        day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)

        count_result = await db.execute(
            select(func.count(ContactSubmission.id)).where(
                ContactSubmission.created_at >= day_start,
                ContactSubmission.created_at < day_end
            )
        )
        count = count_result.scalar() or 0

        days.append({
            "date": day_start.strftime("%Y-%m-%d"),
            "day": day_start.strftime("%a"),
            "messages": count
        })

    return {
        "daily_messages": days
    }
