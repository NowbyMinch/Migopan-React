import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importação da página Home
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona automaticamente a raiz (/) para /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Rotas das páginas */}
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
