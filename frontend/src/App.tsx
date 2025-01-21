import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importando os componentes do React Router
import { ProductList } from "./pages/ProductList"; // Página de listagem de produtos
import { AddProduct } from "./pages/AddProduct"; // Página para adicionar produtos
import { EditProduct } from "./pages/EditProduct"; // Página para editar produtos
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Router>
      <ToastContainer aria-label={undefined} />
    </>
  );
}

export default App;
