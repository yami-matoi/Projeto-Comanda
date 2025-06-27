/* src/pages/Cadastro-Item/index.tsx */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CadastroItem: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const item = {
    nome,
    preco: parseFloat(preco),
  };

  try {
    const response = await fetch("http://localhost:5167/api/itens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar item");
    }

    const result = await response.json();
    console.log("Item cadastrado com sucesso:", result);
    alert("Item cadastrado com sucesso!");

    setNome("");
    setPreco("");
  } catch (error) {
    console.error("Erro ao cadastrar item:", error);
    alert("Erro ao cadastrar item");
  }
};


  return (
    <div className="cadastro-item-wrapper">
      <div className="cadastro-item-container">
        <button className="voltar-btn" onClick={() => navigate("/")}>⬅ Voltar</button>
        <h2>Cadastro de Item</h2>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <label>
            Nome do Item:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <label>
            Preço do Item (R$):
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </label>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroItem;