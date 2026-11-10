import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componente de proteção
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas Públicas
import Login from "./pages/Login/index";
import Cadastro from "./pages/Cadastro/index";

// Páginas Privadas
import Home from "./pages/Home/index";
import Grupos from "./pages/Grupos/index";
import GrupoLayout from "./pages/Grupos/[id]";
import Chat from "./pages/Grupos/[id]/Chat";
import Tarefas from "./pages/Grupos/[id]/Tarefas";
import Calendario from "./pages/Grupos/[id]/Calendario";
import Ajustes from "./pages/Grupos/[id]/Ajustes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/grupos" element={<Grupos />} />

          <Route path="/grupos/:id" element={<GrupoLayout />}>
            <Route index element={<Navigate to="tarefas" replace />} />
            <Route path="chat" element={<Chat />} />
            <Route path="tarefas" element={<Tarefas />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="ajustes" element={<Ajustes />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
