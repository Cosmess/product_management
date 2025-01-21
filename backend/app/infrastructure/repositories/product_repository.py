from sqlalchemy.orm import Session
from app.domain.models.product import Product


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_product(self, product: Product):
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def get_products(self, skip: int, limit: int):
        return self.db.query(Product).offset(skip).limit(limit).all()

    def get_product_by_id(self, product_id: int):
        return self.db.query(Product).filter(Product.id == product_id).first()
    
    def get_product_by_ean(self, ean: str):
        return self.db.query(Product).filter(Product.ean == ean).first()    
    
    def update_product(self, product_id: int, updates: dict):
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return None

        for key, value in updates.items():
            setattr(product, key, value)

        self.db.commit()
        return product