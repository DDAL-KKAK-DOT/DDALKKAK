from pydantic import BaseModel


class Education(BaseModel):
    name: str
    period: str
    description: str
