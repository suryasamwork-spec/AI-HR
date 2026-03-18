from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.domain.models import User, CandidateProfile
from app.domain.schemas import CandidateProfileCreate, CandidateProfileResponse
from app.core.auth import get_current_user
from datetime import datetime

router = APIRouter(prefix="/api/candidate", tags=["candidate"])

@router.get("/profile", response_model=CandidateProfileResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get the current candidate's profile"""
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    if not profile:
        # Return a blank profile if not exists yet
        return CandidateProfile(user_id=current_user.id)
    return profile

@router.put("/profile", response_model=CandidateProfileResponse)
def update_profile(
    profile_data: CandidateProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create or update the current candidate's profile"""
    profile = db.query(CandidateProfile).filter(CandidateProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = CandidateProfile(user_id=current_user.id)
        db.add(profile)

    # Update fields
    for field, value in profile_data.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)
    
    profile.updated_at = datetime.now()
    
    try:
        db.commit()
        db.refresh(profile)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")
    
    return profile
