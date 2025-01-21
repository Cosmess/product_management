import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { api } from "../services/api";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api.get(`/products?skip=${(currentPage - 1) * 20}&limit=20`).then((response) => {
      setProducts(response.data);
    });
  }, [currentPage]);

  const handleEdit = (id: number) => {
    window.location.href = `/edit-product/${id}`;
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-5 text-center font-bold py-4 px-4 border-b">
        <span>Imagem</span>
        <span>Nome</span>
        <span>EAN</span>
        <span>Data de Cadastro</span>
        <span>Ações</span>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={handleEdit} />
      ))}
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
    </>
  );
};
