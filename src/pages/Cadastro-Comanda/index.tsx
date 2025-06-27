import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const API_COMANDAS = "http://localhost:5167/api/comandas";
const API_ITENS = "http://localhost:5167/api/itens";

interface Item {
  id: number;
  nome: string;
  preco: number;
}

interface ItemSelecionado {
  itemId: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
}

interface Comanda {
  id?: number;
  dataCriacao: string;
  itens: ItemSelecionado[];
}

const CadastroComanda: React.FC = () => {
  const navigate = useNavigate();
  const [itensDisponiveis, setItensDisponiveis] = useState<Item[]>([]);
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [itemSelecionadoId, setItemSelecionadoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>([]);

  const carregarItens = async () => {
    const res = await fetch(API_ITENS);
    const data = await res.json();
    setItensDisponiveis(data);
  };

  const carregarComandas = async () => {
    const res = await fetch(API_COMANDAS);
    const data = await res.json();
    setComandas(data);
  };

  useEffect(() => {
    carregarItens();
    carregarComandas();
  }, []);

  const abrirPopup = () => {
    setItensSelecionados([]);
    setItemSelecionadoId("");
    setQuantidade(1);
    setMostrarPopup(true);
  };

  const fecharPopup = () => {
    setMostrarPopup(false);
    setItensSelecionados([]);
    setItemSelecionadoId("");
    setQuantidade(1);
  };

  const adicionarItem = () => {
    const item = itensDisponiveis.find((i) => i.id.toString() === itemSelecionadoId);
    if (!item) return;

    const jaExiste = itensSelecionados.find(i => i.itemId === item.id);
    if (jaExiste) {
      const atualizados = itensSelecionados.map(i =>
        i.itemId === item.id ? { ...i, quantidade: i.quantidade + quantidade } : i
      );
      setItensSelecionados(atualizados);
    } else {
      setItensSelecionados([
        ...itensSelecionados,
        {
          itemId: item.id,
          nome: item.nome,
          precoUnitario: item.preco,
          quantidade
        }
      ]);
    }
    setItemSelecionadoId("");
    setQuantidade(1);
  };

  const removerItem = (index: number) => {
    const novos = [...itensSelecionados];
    novos.splice(index, 1);
    setItensSelecionados(novos);
  };

  const editarQuantidade = (index: number, novaQtd: number) => {
    const atualizados = [...itensSelecionados];
    atualizados[index].quantidade = novaQtd;
    setItensSelecionados(atualizados);
  };

  const calcularTotal = () =>
    itensSelecionados.reduce((total, i) => total + i.precoUnitario * i.quantidade, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itensSelecionados.length === 0) return;

    const payload = {
      itens: itensSelecionados.map((i) => ({
        itemId: i.itemId,
        quantidade: i.quantidade,
        precoUnitario: i.precoUnitario
      }))
    };

    await fetch(API_COMANDAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    carregarComandas();
    fecharPopup();
  };

  const handleExcluir = async (id?: number) => {
    if (!id) return;
    await fetch(`${API_COMANDAS}/${id}`, { method: "DELETE" });
    carregarComandas();
  };

  return (
    <div className="cadastro-comanda-wrapper">
      <div className="cadastro-comanda-container">
        <div className="barra-tarefas">
          <button onClick={abrirPopup}>+ Nova Comanda</button>
          <button className="voltar-btn" onClick={() => navigate("/")}>⬅ Voltar</button>
        </div>

        <h2>Comandas Cadastradas</h2>
        <div className="comanda-list">
          {comandas.map((c) => (
            <div key={c.id} className="comanda-card">
              <h4>Comanda #{c.id}</h4>
              {c.itens.map((i, index) => (
                <p key={index}>
                  {i.nome} x{i.quantidade} — R$ {(i.precoUnitario * i.quantidade).toFixed(2)}
                </p>
              ))}
              <p><strong>Total: R$ {calcularTotal().toFixed(2)}</strong></p>
              <div className="card-actions">
                <button onClick={() => handleExcluir(c.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>

        {mostrarPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h3>Nova Comanda</h3>
              <form onSubmit={handleSubmit}>
                <label>Item:</label>
                <select
                  value={itemSelecionadoId}
                  onChange={(e) => setItemSelecionadoId(e.target.value)}
                >
                  <option value="" disabled>Escolha um item</option>
                  {itensDisponiveis.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} — R$ {item.preco.toFixed(2)}
                    </option>
                  ))}
                </select>

                <label>Quantidade:</label>
                <input
                  type="number"
                  min={1}
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                />

                <button type="button" onClick={adicionarItem}>Adicionar</button>

                <div className="itens-adicionados">
                  {itensSelecionados.map((i, idx) => (
                    <div key={idx} className="item-adicionado">
                      <span>{i.nome}</span>
                      <input
                        type="number"
                        min={1}
                        value={i.quantidade}
                        onChange={(e) => editarQuantidade(idx, parseInt(e.target.value))}
                      />
                      <button type="button" onClick={() => removerItem(idx)}>Remover</button>
                    </div>
                  ))}
                </div>

                <div className="valor-total">
                  <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
                </div>

                <div className="popup-actions">
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={fecharPopup}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CadastroComanda;
