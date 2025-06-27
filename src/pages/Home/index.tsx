import React from "react";
import CardLink from "../../componentes/Card";
import "./style.scss";

const Home: React.FC = () => {
  return (
    <div className="home-warpcenter">
    <div className="home-container">
      <h2>Bem-vindo ao Sistema de Vendas</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
       
       {/* <CardLink
          title="Comandas"
          icon="🧾"
          description="Crie, edite e organize as comandas."
          to="/cadastro-comanda"
        /> */}
        <CardLink
          title="Cadastro de Item"
          icon="📦"
          description="Crie, edite e gerencie os itens disponíveis."
          to="/cadastro-item"
        />
        <CardLink
          title="Lista de Itens"
          icon="✔"
          description="Visualize os itens cadastrados."
          to="/Lista-Item"
        />
      </div>
    </div>
  </div>
  );
};

export default Home;