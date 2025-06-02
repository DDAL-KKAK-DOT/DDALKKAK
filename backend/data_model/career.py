from typing import Optional
from pydantic import BaseModel


class Career(BaseModel):
    role: Optional[str] = None
    company: Optional[str] = None
    period: Optional[str] = None
    description: Optional[str] = None
