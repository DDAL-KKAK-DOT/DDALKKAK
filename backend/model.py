from typing import List, Optional
from pydantic import BaseModel, HttpUrl

#데이터 모델 정의
class Project(BaseModel):
    name: str
    period: str
    role: str
    description: str
    honor: Optional[str] = ""


class Career(BaseModel):
    role: str
    company: str
    period: str
    description: str


class Education(BaseModel):
    name: str
    period: str
    description: str


class Club(BaseModel):
    name: str
    period: str
    description: str


class ProfileResponse(BaseModel):
    profileInfo: str
    shortIntro: str
    skillset: List[str]
    projects: List[Project]
    career: List[Career]
    education: List[Education]
    clubs: List[Club]


class UserProfile(BaseModel):
    name: str
    english_name: Optional[str] = None #옵서녈하려면 None
    education: Optional[List[str]] = []
    desired_role: Optional[str] = None
    contact: Optional[str] = None
    activity_links: List[HttpUrl]
