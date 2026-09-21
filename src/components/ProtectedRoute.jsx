import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verificarAutenticacao();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Carregando...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
