"""
API에서 사용되는 데이터 모델을 정의하는 모듈입니다.
"""
from typing import List, Optional
from pydantic import BaseModel

#데이터 모델 정의
class Project(BaseModel):
    """
    프로젝트 정보를 담는 데이터 모델입니다.
    """
    name: str
    period: str
    role: str
    description: str
    honor: Optional[str] = ""


class Career(BaseModel):
    """
    경력 정보를 담는 데이터 모델입니다.
    """
    role: str
    company: str
    period: str
    description: str


class Education(BaseModel):
    """
    교육 정보를 담는 데이터 모델입니다.
    """
    name: str
    period: str
    description: str


class Club(BaseModel):
    """
    동아리 활동 정보를 담는 데이터 모델입니다.
    """
    name: str
    period: str
    description: str


class ProfileResponse(BaseModel):
    """
    전체 프로필 응답을 담는 데이터 모델입니다.
    """
    profileInfo: str
    shortIntro: str
    skillset: List[str]
    projects: List[Project]
    career: List[Career]
    education: List[Education]
    clubs: List[Club]
