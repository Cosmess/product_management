import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: null as File | null,
    ean: "",
    price: "",
    description: "",
    local_de_venda: "Evento", // Valor padrão
    isActive: true, // Valor padrão
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          image: null,
          ean: data.ean,
          price: data.price.toString(),
          description: data.description,
          local_de_venda: data.local_de_venda,
          isActive: data.status,
        });
      } catch (error) {
        toast.error("Erro ao carregar os dados do produto.");
        navigate("/");
      }
    };

    fetchProduct();
  }, [id, navigate]);

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

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.image) formData.append("image", form.image as Blob);
      formData.append("ean", form.ean);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("place_of_sale", form.local_de_venda);
      formData.append("status", form.isActive ? "true" : "false");
  
      await api.put(`/products/${id}`, formData);
      toast.success("Produto atualizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("O EAN já está vinculado a outro produto.");
      } else {
        toast.error("Erro ao atualizar o produto.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block font-bold mb-2">Imagem (opcional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
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

        <h2 className="text-xl font-bold mt-6">Situação do Produto</h2>
        <div>
          <label className="block font-bold mb-2">Local de Venda</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="local_de_venda"
                value="Evento"
                checked={form.local_de_venda === "Evento"}
                onChange={handleInputChange}
              />
              <span className="ml-2">Evento</span>
            </label>
            <label>
              <input
                type="radio"
                name="local_de_venda"
                value="Loja"
                checked={form.local_de_venda === "Loja"}
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

        <button
          type="submit"
          className="bg-blueButton text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};
