import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./style.scss";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Item {
  id: number;
  nome: string;
  preco: number;
}

const ListaItem: React.FC = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const [itemEditando, setItemEditando] = useState<Item | null>(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const navigate = useNavigate();

  const carregarItens = async () => {
    const res = await fetch("http://localhost:5167/api/itens");
    const data = await res.json();
    setItens(data);
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const excluirItem = async (id: number) => {
    if (confirm("Deseja excluir este item?")) {
      await fetch(`http://localhost:5167/api/itens/${id}`, { method: "DELETE" });
      carregarItens();
    }
  };

  const abrirEdicao = (item: Item) => {
    setItemEditando(item);
    setNome(item.nome);
    setPreco(item.preco.toString());
  };

  const salvarEdicao = async () => {
    if (!itemEditando) return;

    await fetch(`http://localhost:5167/api/itens/${itemEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemEditando.id, nome, preco: parseFloat(preco) }),
    });

    setItemEditando(null);
    setNome("");
    setPreco("");
    carregarItens();
  };

  const gerarRelatorioCSV = () => {
    const cabecalho = "ID,Nome,Preço\n";
    const linhas = itens.map(item => `${item.id},"${item.nome}",${item.preco.toFixed(2)}`).join("\n");
    const csv = cabecalho + linhas;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio_itens.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const gerarRelatorioPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório de Itens", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["ID", "Nome", "Preço"]],
    body: itens.map((item) => [
      item.id.toString(),
      item.nome,
      `R$ ${item.preco.toFixed(2)}`
    ]),
    styles: { halign: "center" },
    headStyles: { fillColor: [40, 40, 40] },
    theme: "grid",
  });

  doc.save("relatorio_itens.pdf");
};

  return (
    <div className="lista-itens-topbar">
      
      <h2>Itens Cadastrados</h2>
      <div className="barra-superior">
        <button className="voltar-btn" onClick={() => navigate("/")}>⬅ Voltar para Início</button>
        <button className="relatorio-btn" onClick={gerarRelatorioCSV}>📄 Gerar Relatório</button>
        <button className="relatorio-btn" onClick={gerarRelatorioPDF}>📄 Gerar PDF</button>
      </div>

      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>
                <button onClick={() => abrirEdicao(item)}>Editar</button>
                <button onClick={() => excluirItem(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {itemEditando && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h3>Editar Item</h3>
            <label>Nome:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={() => setItemEditando(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaItem;
