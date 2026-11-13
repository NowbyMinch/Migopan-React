import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import "../../../css/all.css";
import "../../../css/grupo.css";
import Sidebar from "../../../components/Sidebar";
import { useTarefasGrupo } from "../../../hooks/useTarefasGrupo";
import { getErrorMessage } from "../../../utils/errorHandler";
import ProgressoGrupoChart from "../../../components/ProgressoGrupoChart/ProgressoGrupoChart";

const API_URL = "http://localhost:8080/api/grupos";

function AsideDaAba({ aba, pendentes, concluidas }) {
  if (aba === "tarefas") {
    return (
      <>
        <div className="gradient-card progresso-grupo">
          <h1>Progresso do grupo</h1>
          <div className="Progresso-grupo-info">
            <ProgressoGrupoChart
              className="pg--compacto"
              pendentes={pendentes}
              concluidas={concluidas}
            />
          </div>
        </div>
        <div className="gradient-card sequencia-grupo">
          <h1>Sequência do grupo</h1>
        </div>
        <div className="gradient-card membros-online-grupo">
          <h1>Membros </h1>
        </div>
        <div className="gradient-card atividade-recente-grupo">
          <h1>Atividade recente</h1>
        </div>
      </>
    );
  }

  if (aba === "chat") {
    return (
      <>
        <div className="gradient-card membros-online-grupo">
          <h1>Membros</h1>
        </div>
        <div className="gradient-card">
          <h1>Compartilhe com o grupo</h1>
        </div>
      </>
    );
  }

  if (aba === "calendario") {
    return (
      <>
        <div className="gradient-card">
          <h1>Mini calendário</h1>
        </div>
        <div className="gradient-card">
          <h1>Próximas tarefas</h1>
        </div>
        <div className="gradient-card">
          <h1>Resumo do mês</h1>
        </div>
      </>
    );
  }

  return null;
}

export default function Grupo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const abaAtual = pathname.split("/").filter(Boolean).pop();

  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Tarefas do grupo: carregadas aqui UMA vez e repassadas para a aba Tarefas
  // (via Outlet context) e para o gráfico da lateral. Hooks sempre antes dos returns.
  const {
    tarefas,
    loading: carregandoTarefas,
    erro: erroTarefas,
    recarregar: recarregarTarefas,
  } = useTarefasGrupo(id);

  useEffect(() => {
    const carregarGrupo = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/${id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(await getErrorMessage(response));

        setGrupo(await response.json());
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) carregarGrupo();
  }, [id]);

  if (loading) return <div>Carregando grupo...</div>;
  if (errorMsg) return <div className="error-banner">⚠️ {errorMsg}</div>;
  if (!grupo) return <div>Grupo não encontrado.</div>;

  const pendentes = tarefas.filter((t) => !t.concluida).length;
  const concluidas = tarefas.filter((t) => t.concluida).length;

  const tabClass = ({ isActive }) =>
    `tab-item ${isActive ? "tab-item--ativa" : ""}`;

  return (
    <>
      <Sidebar />
      <div className="main-container-grupo">
        <main className="grupo-main">
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
                    {/* seu svg bi-pen, trocando o onClick por: */}
                    {/* onClick={() => navigate("ajustes")} */}
                  </div>
                  <div className="header-info-descricao">
                    <p>{grupo.descricao}</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="grupo-abas gradient-card">
              <NavLink to="chat" className={tabClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-chat "
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
                <span>Chat</span>
              </NavLink>
              <NavLink to="tarefas" className={tabClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list-ul"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                  />
                </svg>
                <span>Tarefas</span>
              </NavLink>
              <NavLink to="calendario" className={tabClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                </svg>
                <span>Calendário</span>
              </NavLink>
              <NavLink to="ajustes" className={tabClass}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <span>Ajustes</span>
              </NavLink>
            </nav>
          </header>

          {/* aqui aparece Chat, Tarefas, Calendario ou Ajustes */}
          <Outlet
            context={{
              grupo,
              tarefas,
              carregandoTarefas,
              erroTarefas,
              recarregarTarefas,
            }}
          />
        </main>

        <aside className="grupo-info-aside">
          <AsideDaAba
            aba={abaAtual}
            pendentes={pendentes}
            concluidas={concluidas}
          />
        </aside>
      </div>
    </>
  );
}
