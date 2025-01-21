import React from "react";

type Product = {
  id: number;
  name: string;
  ean: string;
  image: string;
  created_at: string;
};

interface Props {
  product: Product;
  onEdit: (id: number) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onEdit }) => (
  <div className="grid grid-cols-5 items-center py-2 px-4 border-b">
    <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="w-16 h-16 object-cover" />
    <span>{product.name}</span>
    <span>{product.ean}</span>
    <span>{product.created_at}</span>
    <button
      className="bg-blueButton text-white py-1 px-3 rounded hover:bg-blue-600"
      onClick={() => onEdit(product.id)}
    >
      Editar
    </button>
  </div>
);
