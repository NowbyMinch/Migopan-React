import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import "../../../css/all.css";
import "../../../css/grupo.css";
import Sidebar from "../../../components/Sidebar";
import { useTarefasGrupo } from "../../../hooks/useTarefasGrupo";
import { getErrorMessage } from "../../../utils/errorHandler";
import ProgressoGrupoChart from "../../../components/ProgressoGrupoChart/ProgressoGrupoChart";
import { useMembrosGrupo } from "../../../hooks/useMembrosGrupo";
import VerTarefa from "../../../components/VerTarefa/VerTarefa";
import VerMais from "../../../components/VerMais/VerMais";
import { useUsuarioLogado } from "../../../hooks/useUsuarioLogado";

const API_URL = "http://localhost:8080/api";

export default function Grupo() {
  const { id } = useParams();

  const {
    membros,
    loading: carregandoMembros,
    erro: erroMembros,
    recarregar: recarregarMembros,
  } = useMembrosGrupo(id);

  const usuario = useUsuarioLogado();

  function AsideDaAba({
    aba,
    dias,
    pendentes,
    concluidas,
    tarefas,
    membrosGrupo,
    verMaisMembros,
    verTarefa,
    tarefaSelecionada,
  }) {
    if (aba === "tarefas" || "gerenciar") {
      return (
        <>
          <div className="gradient-card progresso-grupo">
            <h1 className="title-generic">Progresso do grupo</h1>
            <ProgressoGrupoChart
              className="pg--compacto"
              pendentes={pendentes}
              concluidas={concluidas}
            />
          </div>

          <div className="gradient-card sequencia-grupo">
            <h1 className="title-generic">Sequência do grupo</h1>
            <div className="sequencia-dias-grupo">
              <strong className="sequencia-dias">{dias}</strong>
              <strong className="title-generic">dias</strong>

              <div className="sequencia-dias-icones">
                {Array.from({ length: 7 }, (_, index) => (
                  <span
                    key={index}
                    style={
                      index > dias - 1
                        ? { filter: "saturate(0%)" }
                        : {
                            filter:
                              "drop-shadow(0 0 2px #ff8c00) drop-shadow(0 0 4px rgba(255, 100, 0, 0.5)",
                          }
                    }
                  >
                    🔥
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="gradient-card lateral-grupo">
            <h1 className="title-generic">Membros</h1>

            {membros.slice(0, 4).map((membro, index) => (
              <div key={index} className="membro-grupo">
                <div className="membro-imagem">
                  <img src="/img/iconemigo.png" alt="" />
                </div>
                <span className="title-generic">{membro.nomeUsuario}</span>
              </div>
            ))}
            {membros.length > 4 ? (
              <button
                onClick={() => {
                  verMaisMembros(true);
                  membrosGrupo(membros);
                }}
              >
                Ver mais
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="gradient-card atividade-recente-grupo">
            <h1 className="title-generic">Tarefas recentes</h1>
            {tarefas.slice(0, 4).map((tarefa) => (
              <div
                key={tarefa.id}
                onClick={() => {
                  verTarefa(true);
                  tarefaSelecionada(tarefa);
                }}
                className="task-lateral"
              >
                <div
                  className="task-icon-lateral"
                  style={{
                    backgroundColor: tarefa.cor || "rgb(0, 7, 24)",
                    boxShadow: `0 0 12px ${tarefa.cor || "rgb(0, 7, 24)"}`,
                  }}
                >
                  <span>📝</span>
                </div>

                <div className="task-content">
                  <h3>{tarefa.titulo}</h3>
                  <p>{tarefa.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (aba === "chat") {
      return (
        <>
          <div className="gradient-card lateral-grupo">
            <h1 className="title-generic">Membros</h1>
            {membros.slice(0, 4).map((membro, index) => (
              <div key={index} className="membro-grupo">
                <div className="membro-imagem">
                  <img src="/img/iconemigo.png" alt="" />
                </div>
                <span className="title-generic">{membro.nomeUsuario}</span>
              </div>
            ))}
            {membros.length > 4 ? (
              <button
                onClick={() => {
                  verMaisMembros(true);
                  membrosGrupo(membros);
                }}
              >
                Ver mais
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="gradient-card lateral-grupo">
            <div className="compartilhar-title">
              <h1 className="title-generic">Compartilhe com o grupo</h1>
              <p className="subtitle-generic">
                Envie arquivos, links e imagens para todos.
              </p>
            </div>
            <div className="compartilhar-opcoes">
              <div className="gradient-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-file-earmark"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                </svg>
                <p className="subtitle-generic">Arquivo</p>
              </div>
              <div className="gradient-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-image"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m4.002 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                  <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
                </svg>
                <p className="subtitle-generic">Imagem</p>
              </div>
              <div className="gradient-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-question"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
                <p className="subtitle-generic">Enquente</p>
              </div>
            </div>
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
  const { pathname } = useLocation();
  const abaAtual = pathname.split("/").filter(Boolean).pop();

  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [verMaisMembros, setVerMaisMembros] = useState(false);
  const [verTarefa, setVerTarefa] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const {
    tarefas,
    loading: carregandoTarefas,
    erro: erroTarefas,
    recarregar: recarregarTarefas,
  } = useTarefasGrupo(id);

  const carregarGrupo = useCallback(
    async ({ silencioso = false } = {}) => {
      try {
        if (!silencioso) setLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/grupos/${id}`, {
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
    },
    [id],
  );

  useEffect(() => {
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
      <div
        className={
          abaAtual === "chat"
            ? "main-container-grupo-chat"
            : "main-container-grupo"
        }
      >
        <main
          className={abaAtual === "chat" ? "grupo-main-chat" : "grupo-main"}
        >
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
                  className=" bi-tarefas"
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
              {grupo?.meuPapel == "ADMIN" && (
                <NavLink to="gerenciar" className={tabClass}>
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
                  <span>Gerenciar</span>
                </NavLink>
              )}
            </nav>
          </header>

          <Outlet
            context={{
              grupo,
              tarefas,
              membros,
              carregandoTarefas,
              erroTarefas,
              recarregarTarefas,
              carregandoMembros,
              erroMembros,
              recarregarMembros,
              recarregarGrupo: carregarGrupo,
              usuario,
            }}
          />
        </main>

        <aside className="grupo-info-aside">
          <AsideDaAba
            aba={abaAtual}
            dias={grupo.sequenciaDias}
            pendentes={pendentes}
            concluidas={concluidas}
            membrosGrupo={membros}
            verMaisMembros={setVerMaisMembros}
            tarefas={tarefas}
            verTarefa={setVerTarefa}
            tarefaSelecionada={setTarefaSelecionada}
          />
        </aside>
        <VerTarefa
          isOpen={verTarefa}
          tarefa={tarefaSelecionada}
          onClose={() => {
            setVerTarefa(false);
          }}
        />
        <VerMais
          isOpen={verMaisMembros}
          lista={membros}
          conteudo={"membros"}
          onClose={() => {
            setVerMaisMembros(false);
          }}
        />
      </div>
    </>
  );
}
