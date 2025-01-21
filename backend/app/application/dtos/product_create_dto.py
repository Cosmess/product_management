from fastapi import UploadFile
from pydantic import BaseModel, validator


class ProductCreateDTO(BaseModel):
    image: str 
    name: str
    ean: str
    price: float
    description: str
    place_of_sale: str
    status: bool = True

    @validator("ean")
    def validate_ean(cls, value):
        if not value.isdigit() or len(value) > 13:
            raise ValueError("EAN must be numeric and up to 13 characters.")
        return value

    @validator("price")
    def validate_price(cls, value):
        if value <= 0:
            raise ValueError("Price must be greater than zero.")
        return value