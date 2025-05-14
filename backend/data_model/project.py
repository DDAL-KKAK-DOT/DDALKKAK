from typing import Optional
from pydantic import BaseModel


class Project(BaseModel):
    name: str
    period: str
    role: str
    description: str
    honor: Optional[str] = None
