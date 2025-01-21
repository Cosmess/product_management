from pydantic import BaseModel, validator
from datetime import datetime

class ProductResponseDTO(BaseModel):
    id: int
    image: str
    name: str
    ean: str
    price: float
    description: str
    created_at: str
    place_of_sale: str
    status: bool

    class Config:
        orm_mode = True

    @validator("created_at", pre=True)
    def format_created_at(cls, value: datetime) -> str:
        if isinstance(value, datetime):
            return value.strftime("%d/%m/%Y")
        return value
