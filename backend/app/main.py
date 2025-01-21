from fastapi import FastAPI
from app.presentation.controllers.roduct_controller import app as product_router
from app.infrastructure.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product API",
    description="API para gerenciar produtos com arquitetura DDD",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(product_router, prefix="/products", tags=["Products"])

@app.get("/", tags=["Healthcheck"])
def healthcheck():
    return {"status": "ok", "message": "API is running"}