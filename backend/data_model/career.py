from pydantic import BaseModel


class Career(BaseModel):
    role: str
    company: str
    period: str
    description: str
