import React, { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: null as File | null,
    ean: "",
    price: "",
    description: "",
    location: "Evento", // Padrão: "Evento"
    isActive: true, // Padrão: Ativo
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleToggleChange = () => {
    setForm({ ...form, isActive: !form.isActive });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validações
    if (!form.name || !form.image || !form.ean || !form.price || !form.description) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image as Blob);
      formData.append("ean", form.ean);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("place_of_sale", form.local_de_venda);
      formData.append("status", form.isActive ? "true" : "false");
  
      const result = await api.post("/products", formData);
      toast.success("Produto adicionado com sucesso!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.detail);
        console.error(error.response.data.detail);
      } else {
        toast.error("Erro ao adicionar o produto.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Adicionar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos do Produto */}
        <div>
          <label className="block font-bold mb-2">Nome do Produto</label>
          <input
            type="text"
            name="name"
            maxLength={150}
            value={form.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Imagem</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">EAN</label>
          <input
            type="text"
            name="ean"
            maxLength={13}
            value={form.ean}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Preço</label>
          <input
            type="text"
            name="price"
            maxLength={25}
            value={form.price}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Descrição</label>
          <textarea
            name="description"
            maxLength={250}
            value={form.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Área de Situação */}
        <h2 className="text-xl font-bold mt-6">Situação do Produto</h2>
        <div>
          <label className="block font-bold mb-2">Local de Venda</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="location"
                value="Evento"
                checked={form.location === "Evento"}
                onChange={handleInputChange}
              />
              <span className="ml-2">Evento</span>
            </label>
            <label>
              <input
                type="radio"
                name="location"
                value="Loja"
                checked={form.location === "Loja"}
                onChange={handleInputChange}
              />
              <span className="ml-2">Loja</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block font-bold mb-2">Ativo</label>
          <div className="flex items-center">
            <span>Desativado</span>
            <button
              type="button"
              className={`ml-4 w-12 h-6 rounded-full flex items-center ${
                form.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={handleToggleChange}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
                  form.isActive ? "translate-x-6" : ""
                }`}
              />
            </button>
            <span className="ml-4">Ativo</span>
          </div>
        </div>

        {/* Botão de Submissão */}
        <button
          type="submit"
          className="bg-blueButton text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};
