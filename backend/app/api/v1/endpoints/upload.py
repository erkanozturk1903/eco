import os
import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
import aiofiles

from app.core.database import get_db
from app.core.config import settings
from app.services.auth import get_current_active_user
from app.models.user import User

router = APIRouter()

# Allowed file extensions
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Upload directory
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), "uploads")


def get_file_extension(filename: str) -> str:
    return os.path.splitext(filename)[1].lower()


def generate_unique_filename(original_filename: str) -> str:
    ext = get_file_extension(original_filename)
    unique_id = uuid.uuid4().hex[:8]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{timestamp}_{unique_id}{ext}"


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
):
    """Upload an image file (admin only)"""

    # Check file extension
    ext = get_file_extension(file.filename)
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Desteklenmeyen dosya formatı. İzin verilen: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Check file size
    file.file.seek(0, 2)  # Go to end of file
    file_size = file.file.tell()
    file.file.seek(0)  # Go back to start

    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Dosya boyutu çok büyük. Maksimum: {MAX_FILE_SIZE // (1024*1024)}MB"
        )

    # Create upload directory if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Generate unique filename
    new_filename = generate_unique_filename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    # Save file
    try:
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dosya kaydedilemedi: {str(e)}"
        )

    # Return the URL path
    url = f"/uploads/{new_filename}"

    return {
        "success": True,
        "filename": new_filename,
        "url": url,
        "size": file_size,
        "content_type": file.content_type
    }


@router.delete("/image/{filename}")
async def delete_image(
    filename: str,
    current_user: User = Depends(get_current_active_user)
):
    """Delete an uploaded image (admin only)"""

    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dosya bulunamadı"
        )

    try:
        os.remove(file_path)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Dosya silinemedi: {str(e)}"
        )

    return {"success": True, "message": "Dosya silindi"}
