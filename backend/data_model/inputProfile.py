from typing import List, Optional

from pydantic import BaseModel, HttpUrl


class InputProfile(BaseModel):
    name: str
    english_name: Optional[str] = None
    educations: Optional[List[str]] = []
    desired_role: Optional[str] = None
    contact: Optional[str] = None
    activity_links: List[HttpUrl]
