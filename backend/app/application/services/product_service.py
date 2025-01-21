import base64

from fastapi import HTTPException
from app.application.dtos.product_create_dto import ProductCreateDTO
from app.domain.models.product import Product
from app.infrastructure.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository

    def create_product(self, dto: ProductCreateDTO):
        existing_product = self.repository.get_product_by_ean(dto.ean)
        if existing_product:
            raise ValueError(f"Product with EAN {dto.ean} already exists.")
    
        product = Product(
            image=dto.image,
            name=dto.name,
            ean=dto.ean,
            price=dto.price,
            description=dto.description,
            place_of_sale=dto.place_of_sale,
            status=dto.status,
        )
        return self.repository.create_product(product)

    def get_products(self, skip: int, limit: int):
        return self.repository.get_products(skip, limit)

    def get_product_by_id(self, product_id: int):
        return self.repository.get_product_by_id(product_id)
    def update_product(self, product_id, updates):
        if "ean" in updates:
            existing_product = self.repository.get_product_by_ean(updates["ean"])
            if existing_product and existing_product.id != product_id:
                raise HTTPException(status_code=409, detail="EAN já está vinculado a outro produto.")  # Status 409

        return self.repository.update_product(product_id, updates)