import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../utils/errorHandler";

const API_URL = "http://localhost:8080/api";

export function useTarefasGrupo(grupoId) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const recarregar = useCallback(async () => {
    if (!grupoId) return;

    try {
      setErro("");

      const res = await fetch(`${API_URL}/tarefas/grupo/${grupoId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));
      const data = await res.json();
      setTarefas(data);
      console.log(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }, [grupoId]);

  useEffect(() => {
    setLoading(true);
    setTarefas([]);
    recarregar();
  }, [recarregar]);

  return { tarefas, loading, erro, recarregar };
}
