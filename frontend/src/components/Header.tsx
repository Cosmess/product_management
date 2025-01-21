import React from "react";

export const Header = () => (
  <header className="bg-grayLight py-4 px-6 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">
      Consulte os seus Produtos cadastrados na sua Loja ou realize o cadastro de novos Produtos
    </h1>
    <button
      className="bg-blueButton text-white py-2 px-4 rounded hover:bg-blue-600"
      onClick={() => window.location.href = "/add-product"}
    >
      Adicionar Produto
    </button>
  </header>
);
