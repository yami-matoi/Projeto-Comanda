import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CadastroComanda from "../pages/Cadastro-Comanda";
import CadastroItem from "../pages/Cadastro-Item";
import ListaItem from "../pages/Lista-Item"; // ⬅️ nova importação

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-comanda" element={<CadastroComanda />} />
        <Route path="/cadastro-item" element={<CadastroItem />} />
        <Route path="/lista-item" element={<ListaItem />} /> {/* ✅ nova rota */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
