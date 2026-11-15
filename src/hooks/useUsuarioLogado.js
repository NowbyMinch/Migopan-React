import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

// Devolve { id, nome, email } do usuário logado, ou null enquanto carrega / se não houver sessão.
// Se o seu app já tem um contexto de autenticação, use ele no lugar deste hook.
export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((dados) => {
        if (ativo) setUsuario(dados);
      })
      .catch(() => {});

    return () => {
      ativo = false;
    };
  }, []);

  return usuario;
}
