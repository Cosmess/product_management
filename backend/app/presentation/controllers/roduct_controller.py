from fastapi import APIRouter, FastAPI, File, Form, UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
import base64
import os

from app.application.dtos.product_create_dto import ProductCreateDTO
from app.application.dtos.product_response_dto import ProductResponseDTO
from app.application.services.product_service import ProductService
from app.infrastructure.repositories.product_repository import ProductRepository
from app.infrastructure.database import SessionLocal, engine, Base


app = APIRouter()

# Dependency
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/products", response_model=ProductResponseDTO)
async def create_product(
    image: UploadFile = File(...),
    name: str = Form(...),
    ean: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    place_of_sale: str = Form(...), 
    status: bool = Form(True), 
    db: Session = Depends(get_db)
):
    try:
        image_content = await image.read()
        image_base64 = base64.b64encode(image_content).decode("utf-8")

        dto = ProductCreateDTO(
            image=image_base64, 
            name=name,
            ean=ean,
            price=price,
            description=description,
            place_of_sale=place_of_sale,
            status=status,
        )

        service = ProductService(ProductRepository(db))
        product = service.create_product(dto)

        return product
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/products", response_model=List[ProductResponseDTO])
def get_products(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    service = ProductService(ProductRepository(db))
    products = service.get_products(skip, limit)
    return products

@app.get("/products/{product_id}", response_model=ProductResponseDTO)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    service = ProductService(ProductRepository(db))
    product = service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.put("/products/{product_id}", response_model=ProductResponseDTO)
async def update_product(
    product_id: int,
    image: UploadFile = File(None),
    name: str = Form(None),
    ean: str = Form(None),
    price: float = Form(None),
    description: str = Form(None),
    place_of_sale: str = Form(None), 
    status: bool = Form(None),
    db: Session = Depends(get_db)
):
    try:
        service = ProductService(ProductRepository(db))
        existing_product = service.get_product_by_id(product_id)
        if not existing_product:
            raise HTTPException(status_code=404, detail="Produto não encontrado.")

        updates = {}
        if image:
            image_content = await image.read()
            updates["image"] = base64.b64encode(image_content).decode("utf-8")
        if name:
            updates["name"] = name
        if ean:
            updates["ean"] = ean
        if price:
            updates["price"] = price
        if description:
            updates["description"] = description
        if place_of_sale:
            updates["place_of_sale"] = place_of_sale
        if status:
            updates["status"] = status                        

        updated_product = service.update_product(product_id, updates)

        return updated_product
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()