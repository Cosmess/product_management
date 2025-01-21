from sqlalchemy import Boolean, Column, String, Integer, DateTime, Float, UniqueConstraint
from datetime import datetime
from app.infrastructure.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=False)
    name = Column(String, nullable=False)
    ean = Column(String(13), nullable=False, unique=True)
    price = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    place_of_sale = Column(String, nullable=False)
    status = Column(Boolean, default=True)
    __table_args__ = (
        UniqueConstraint("ean", name="uq_product_ean"),
    )
