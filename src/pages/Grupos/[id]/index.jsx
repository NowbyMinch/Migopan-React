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
      <div className="main-container-grupo">
        <main>
          <header className="index-header-grupo">
            <div className="grupo-header">
              <Link to={"/grupos"} className="voltar ">
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

              <div className="grupo-header-info">
                <div className="imagem-grupo">
                  <img src="/img/grupoEx1webp.webp" alt="" />
                </div>

                <div className="header-info">
                  <div className="header-info-titulo">
                    <h1>{grupo.nome}</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi-filtro bi-pen"
                      viewBox="0 0 16 16"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setTarefaSelecionada(tarefa);
                      }}
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                    </svg>
                  </div>
                  <div className="header-info-descricao">
                    <p>{grupo.descricao}</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="grupo-abas gradient-card">
              <Link to="chat" className="tab-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-chat "
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
                <span>Chat</span>
              </Link>

              <Link to="tarefas" className="tab-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-list-ul"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                  />
                </svg>
                <span>Tarefas</span>
              </Link>

              <Link to="calendario" className="tab-item">
                <span>Calendário</span>
              </Link>

              <Link to="ajustes" className="tab-item">
                <span>Ajustes</span>
              </Link>
            </nav>
          </header>
        </main>

        <aside className="gradient-card grupo-info-aside">teste</aside>
      </div>
    </>
  );
}
