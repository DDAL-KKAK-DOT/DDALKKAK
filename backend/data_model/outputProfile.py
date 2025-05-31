from typing import List
from pydantic import BaseModel


from backend.data_model.career import Career
from backend.data_model.club import Club
from backend.data_model.education import Education
from backend.data_model.project import Project


class OutputProfile(BaseModel):
    profileInfo: str
    shortIntro: str
    skills: List[str]
    projects: List[Project]
    careers: List[Career]
    educations: List[Education]
    clubs: List[Club]
