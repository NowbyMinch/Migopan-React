import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importação da página Home
import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona automaticamente a raiz (/) para /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Rotas das páginas */}
        <Route path="/home" element={<Home />} />
        <Route path="/Grupos" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
