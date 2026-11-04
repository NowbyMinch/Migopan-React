import { Link, useFetcher, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../../css/all.css";
import "../../../css/grupo.css";
import Sidebar from "../../../components/Sidebar";
import { getErrorMessage } from "../../../utils/errorHandler";

const API_URL = "http://localhost:8080/api/grupos";

export default function Grupo() {
  const { id } = useParams();

  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const carregarGrupo = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar o grupo.");
        }

        const data = await response.json();
        setGrupo(data);
        console.log(data);
      } catch (error) {
        setErrorMsg(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarGrupo();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando grupo...</div>;
  }

  if (errorMsg) {
    return <div className="error-banner">⚠️ {errorMsg}</div>;
  }

  if (!grupo) {
    return <div>Grupo não encontrado.</div>;
  }

  return (
    <>
      <Sidebar />
      <main className="main-container-grupo">
        <header className="index-header-grupo">
          <div className="page-intro-grupo">
            <Link to={"/grupos"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <div className="index-header-left">
              <h1>{grupo.nome}</h1>
              <p>{grupo.descricao}</p>
            </div>
          </div>
        </header>

          
      </main>
    </>
  );
}
