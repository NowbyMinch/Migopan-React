import React, { useEffect, useState } from "react";
import "../../css/all.css";
import "../../css/grupos.css";
import Sidebar from "../../components/Sidebar";
// Certifique-se de importar o seu componente do Pop-up/Modal no caminho correto:
import { getErrorMessage } from "../../utils/errorHandler";
import ModalCriarGrupo from "../../components/ModalCriarGrupo/ModalCriarGrupo";

const API_URL = "http://localhost:8080/api/grupos";

export default function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados de Filtro e Busca
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");

  // Estado do grupo selecionado no painel lateral
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

  const carregarGrupos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { credentials: "include" });
      if (!res.ok) {
        const msg = await getErrorMessage(res);
        throw new Error(msg);
      }

      const data = await res.json();
      console.log(data);
      setGrupos(data);
      if (data && data.length > 0) {
        setGrupoSelecionado(data[0]);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarGrupos();
  }, []);

  // Lógica de Filtragem
  const gruposFiltrados = grupos.filter((grupo) => {
    const atendeBusca =
      grupo.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      grupo.descricao?.toLowerCase().includes(busca.toLowerCase());

    if (filtroAtivo === "Meus grupos") return atendeBusca && grupo.souDono;
    if (filtroAtivo === "Participando") return atendeBusca && !grupo.souDono;
    return atendeBusca;
  });

  return (
    <>
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTAINER PRINCIPAL */}
      <div className="main-container">
        <header className="index-header">
          <div className="page-intro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#1cb0f6"
              className="bi bi-grupos-active"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
            <div className="index-header-left">
              <h1>Grupos</h1>
              <p>Junte-se a grupos, convide amigos e conquiste objetivos juntos!</p>
            </div>
          </div>

          {/* O BOTÃO QUE ATIVA O POP-UP / MODAL */}
          <button
            className="index-header-add"
            onClick={() => setIsModalOpen(true)}
          >
            <span>+</span> Criar grupo
          </button>
        </header>

        <main className="group-area">
          <div className="grupos-header">
            <input
              type="search"
              className="search"
              placeholder="Buscar grupos"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button
              className={`filtros-card ${filtroAtivo === "Todas" ? "filtros-card-active1" : ""}`}
              onClick={() => setFiltroAtivo("Todas")}
            >
              <span>Todas</span>
            </button>
            <button
              className={`filtros-card ${filtroAtivo === "Meus grupos" ? "filtros-card-active1" : ""}`}
              onClick={() => setFiltroAtivo("Meus grupos")}
            >
              <span>Meus grupos</span>
            </button>
            <button
              className={`filtros-card ${filtroAtivo === "Participando" ? "filtros-card-active1" : ""}`}
              onClick={() => setFiltroAtivo("Participando")}
            >
              <span>Participando</span>
            </button>
            <button
              className={`filtros-card ${filtroAtivo === "Convites" ? "filtros-card-active1" : ""}`}
              onClick={() => setFiltroAtivo("Convites")}
            >
              <span>Convites</span>
              <span className="grupos-participando">2</span>
            </button>
          </div>

            {errorMsg && <div className="error-banner">⚠️ {errorMsg}</div>}

            {loading ? (
              <div className="grupos-loading">Carregando grupos...</div>
            ) : gruposFiltrados.length === 0 ? (
              <div className="grupos-empty-card">
                <div style={{ fontSize: "42px" }}>👥</div>
                <h3>Nenhum grupo encontrado</h3>
                <p>Crie um novo grupo ou ajuste a sua busca!</p>
                <button
                  className="btn-criar-grupo-header"
                  onClick={() => setIsModalOpen(true)}
                >
                  Criar um grupo
                </button>
              </div>
            ) : (
              <div className="grupos">
                {gruposFiltrados.map((grupo) => (
                  <div
                    className={`grupo gradient-card ${grupoSelecionado?.id === grupo.id ? "selected" : ""}`}
                    onClick={() => setGrupoSelecionado(grupo)}
                    style={{ cursor: "pointer" }}
                  >
                    <div class="grupo-lateral-background">
                      <div class="dark-effect"></div>
                      <img
                        src={grupo.imagemUrl || "../../../public/img/grupoEx1webp.webp"}
                        alt={grupo.nome}
                        className=""
                      />
                    </div>

                    <div class="grupo-info top-info">
                        <h1>{grupo.nome}</h1>
                        <h2>Grupo criado por você</h2>
                        <p>
                            {grupo.descricao || "..."}
                        </p>
                    </div>

                    <hr />

                          <div class="grupo-info middle-info">
                              <div class="barra-details">
                                  <div class="xp-quantidade-grupo">
                                  <strong> Nível 12 </strong>
                                  <span> 1240 / 2000 XP </span>
                                  </div>
                                  <div class="xp-barra">
                                  <div class="grupo-porcentagem xp-porcentagem1"></div>
                                  </div>
                              </div>

                              <div class="grupo-details">
                                  <div class="grupo-detail">
                                      <span>Membros</span>
                                      <div class="">
                                          <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          class="bi bi-grupos-active"
                                          viewBox="0 0 16 16"
                                          >
                                          <path
                                              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                                          />
                                          </svg>
                                          <span>{grupoSelecionado.quantidadeMembros || 1}</span>
                                      </div>
                                  </div>
                                  <div class="grupo-detail">
                                      <span>Tarefas</span>
                                      <div class="">
                                          <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="currentColor"
                                          class="bi bi-list-task"
                                          viewBox="0 0 16 16"
                                          >
                                          <path
                                              fill-rule="evenodd"
                                              d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
                                          />
                                          <path
                                              d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"
                                          />
                                          <path
                                              fill-rule="evenodd"
                                              d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
                                          />
                                          </svg>
                                          <span>...</span>
                                      </div>
                                  </div>
                                  <div class="grupo-detail">
                                      <span>Sequência</span>
                                      <div class="">
                                          <strong class="fire">🔥</strong>
                                          <span>{grupoSelecionado.sequenciaDias || 0}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                    
                    {/* <div className="grupo-item-info">
                      <h4>{grupo.nome}</h4>
                      <p>{grupo.descricao || "Sem descrição."}</p>
                    </div> */}
                  </div>
                ))}
              </div>
            )}

          {/* PAINEL LATERAL DE DETALHES DO GRUPO SELECIONADO */}
          <aside className="group-view gradient-card">
            {grupoSelecionado ? (
              <>
                <div className="grupo-lateral-background">
                  <div className="dark-effect"></div>
                  <img
                    src={grupoSelecionado.imagemUrl || "/img/grupoEx1webp.webp"}
                    alt={grupoSelecionado.nome}
                  />
                </div>

                <div className="lateral-info">
                  <h1>{grupoSelecionado.nome}</h1>
                  <h2>{grupoSelecionado.souDono ? "Grupo criado por você" : "Grupo participante"}</h2>
                  <p>{grupoSelecionado.descricao || "Sem descrição cadastrada."}</p>
                  <button className="convidar-membro">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                    Convidar membros
                  </button>
                </div>

                <hr />

                <div className="lateral-info">
                  <div className="ultimo-grupo-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-grupos-active"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                    <span>Membros</span>
                    <span>{grupoSelecionado.quantidadeMembros || 1}</span>
                  </div>
                  <div className="ultimo-grupo-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span>Tarefas concluídas</span>
                    <span>{grupoSelecionado.tarefasConcluidas || 0}</span>
                  </div>
                  <div className="ultimo-grupo-info">
                    <span className="fire">🔥</span>
                    <span>Sequência atual</span>
                    <span>{grupoSelecionado.sequenciaDias || 0} dias</span>
                  </div>
                  <div className="ultimo-grupo-info sequencia">
                    <span className="star">⭐</span>
                    <span>Nível do grupo</span>
                    <span>{grupoSelecionado.nivel || 1}</span>
                  </div>
                  <div className="barra">
                    <div className="xp-barra">
                      <div
                        className="grupo-porcentagem xp-porcentagem"
                        style={{ width: `${grupoSelecionado.porcentagemXp || 0}%` }}
                      ></div>
                    </div>
                    <div className="xp-quantidade">
                      {grupoSelecionado.xpAtual || 0} / {grupoSelecionado.xpMax || 1000} XP
                    </div>
                  </div>
                </div>

                <hr />

                <div className="lateral-info lateral-mais-info">
                  <button className="mais-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi-check-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                    </svg>
                    <span>Ver tarefas do grupo</span>
                  </button>
                  <button className="mais-info sair-grupo-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-exit"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    <span>Sair do grupo</span>
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af" }}>
                Selecione um grupo para ver os detalhes
              </div>
            )}
          </aside>
        </main>
      </div>

      {/* RENDERIZA O POP-UP / MODAL SE O ESTADO FOR TRUE */}
      {isModalOpen && (
        <ModalCriarGrupo
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGrupoCriado={carregarGrupos}
        />
      )}
    </>
  );
}