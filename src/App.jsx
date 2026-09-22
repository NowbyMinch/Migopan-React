import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componente de proteção
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas Públicas
import Login from "./pages/Login/index";
import Cadastro from "./pages/Cadastro/index";

// Páginas Privadas
import Home from "./pages/Home/index";
import Grupos from "./pages/Grupos/index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= ROTAS PÚBLICAS ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Redireciona a raiz "/" direto para a home (o ProtectedRoute tratará o acesso) */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ================= ROTAS PROTEGIDAS ================= */}
        {/* Qualquer página declarada dentro de ProtectedRoute exigirá cookie/JWT válido */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/grupos" element={<Grupos />} />
        </Route> */}
        <Route path="/home" element={<Home />} />
        <Route path="/grupos" element={<Grupos />} />

        {/* Rota genérica para URLs não encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
