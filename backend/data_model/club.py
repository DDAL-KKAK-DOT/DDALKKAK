from pydantic import BaseModel

class Club(BaseModel):
    name: str
    period: str
    description: str