import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../utils/errorHandler";

const API_URL = "http://localhost:8080/api/grupos";

export function useMembrosGrupo(grupoId) {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const recarregar = useCallback(async () => {
    if (!grupoId) return;

    try {
      setErro("");

      const res = await fetch(`${API_URL}/${grupoId}/membros`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));

      setMembros(await res.json());
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }, [grupoId]);

  useEffect(() => {
    setLoading(true);
    setMembros([]);
    recarregar();
  }, [recarregar]);

  return { membros, loading, erro, recarregar };
}
