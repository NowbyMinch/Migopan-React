import React, { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/errorHandler";
import "../../css/all.css";
import "../../css/index.css";
import ModalCriarTarefa from "../../components/ModalCriarTarefa/ModalCriarTarefa";
import ModalEditarTarefa from "../../components/ModalEditarTarefa/ModalEditarTarefa";
import Sidebar from "../../components/Sidebar";
import VerTarefa from "../../components/VerTarefa/VerTarefa";

const API_URL = "http://localhost:8080/api";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [verTarefa, setVerTarefa] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("TODAS");
  const [isExpanded, setIsExpanded] = useState(false);

  const pendentes = tarefas.filter((t) => !t.concluida);
  const concluidas = tarefas.filter((t) => t.concluida);
  const prioritarias = tarefas.filter((t) => t.prioridade);

  const filtros = [
    { key: "TODAS", label: "Todas" },
    { key: "PENDENTES", label: "Pendentes", total: pendentes.length },
    { key: "CONCLUIDAS", label: "Concluídas", total: concluidas.length },
    { key: "PRIORIDADES", label: "Prioridades", total: prioritarias.length },
  ];

  const listas = {
    TODAS: tarefas,
    PENDENTES: pendentes,
    CONCLUIDAS: concluidas,
    PRIORIDADES: prioritarias,
  };
  const tarefasVisiveis = listas[filtro];

  const mensagensVazias = {
    TODAS: "Nenhuma tarefa encontrada",
    PENDENTES: "Nenhuma tarefa pendente",
    CONCLUIDAS: "Nenhuma tarefa concluída ainda",
    PRIORIDADES: "Nenhuma tarefa prioritária",
  };
  const mensagemVazia = mensagensVazias[filtro];

  const carregarTarefas = useCallback(async () => {
    try {
      setLoading(true);
      setErro("");

      const res = await fetch(`${API_URL}/tarefas/pessoais`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));

      setTarefas(await res.json());
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarUsuario = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem);
      }

      console.log(res);
    } catch (err) {
      console.error("Erro na requisição", err.message);
    }
  }, []);

  useEffect(() => {
    carregarTarefas();
    carregarUsuario();
  }, [carregarTarefas, carregarUsuario]);

  return (
    <>
      <Sidebar />

      <div className="main-container-home">
        <header className="index-header">
          <div className="page-intro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#8435FC"
              className="bi-filtro bi bi-filtro bi-home-active"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
            <div className="index-header-left">
              <h1>Tarefas</h1>
              <h2>Organize seu dia e conquiste objetivos!</h2>
            </div>
          </div>

          <div className="index-header-right">
            <div className="index-stats-card">
              <div className="index-stats-item">
                <div className="index-stats-icon fire">🔥</div>
                <div className="index-stats-conteudo">
                  <span>Sequência</span>
                  <strong>17 dias</strong>
                </div>
              </div>

              <div className="stats-divider"></div>

              <div className="index-stats-item">
                <div className="index-stats-icon star">⭐</div>
                <div className="index-stats-conteudo">
                  <span>Concluídas</span>
                  <strong>23</strong>
                </div>
              </div>
            </div>

            <div className="index-header-right">
              <button
                className="index-header-add"
                onClick={() => setIsModalOpen(true)}
              >
                <span>+</span> Nova tarefa
              </button>
            </div>
          </div>
        </header>

        <main className="tasks-area">
          <div className="tasks-header">
            {filtros.map((f) => (
              <button
                key={f.key}
                title={f.label}
                className={`filtros-card ${filtro === f.key ? "filtros-card-active1" : ""}`}
                onClick={() => setFiltro(f.key)}
              >
                {f.key === "TODAS" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi-filtro bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                    />
                  </svg>
                ) : f.key === "PENDENTES" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi-filtro bi-amp"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                  </svg>
                ) : f.key === "CONCLUIDAS" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi-filtro bi-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                )}
                <span className="status-filtro">{f.label}</span>
                {f.total !== undefined && (
                  <span className="tarefas-notificacao">{f.total}</span>
                )}
              </button>
            ))}
          </div>

          <div className="tasks">
            {loading ? (
              <p>Carregando tarefas...</p>
            ) : erro ? (
              <div className="error-banner">⚠️ {erro}</div>
            ) : tarefasVisiveis.length === 0 ? (
              <p>{mensagemVazia}</p>
            ) : (
              tarefasVisiveis.map((tarefa, index) => (
                <div
                  key={tarefa.id || index}
                  className="tarefa gradient-card"
                  style={{ border: "none" }}
                  onClick={() => {
                    setTarefaSelecionada(tarefa);
                    setVerTarefa(true);
                  }}
                >
                  <div
                    style={{
                      backgroundColor: tarefa.cor,
                      boxShadow: `0 0 12px ${tarefa.cor}`,
                    }}
                    className=" tarefa-icon-container"
                  >
                    📝
                  </div>

                  <div className="tarefa-info tarefa1">
                    <h1>
                      {tarefa.titulo}{" "}
                      {tarefa.prioridade && <span title="Prioridade">⭐</span>}
                    </h1>
                    <p
                      className={`tarefa-descricao ${isExpanded ? "is-expanded" : ""} `}
                    >
                      {tarefa.descricao}
                    </p>
                    <span>📅 {tarefa.repeticao || "Única"}</span>
                    <span>
                      {tarefa.dataLimite} {tarefa.horarioLimite?.slice(0, 5)}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Editar tarefa"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditModalOpen(true);
                      setTarefaSelecionada(tarefa);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi-filtro bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                    </svg>
                  </button>

                  <div className="tarefa-info-extra">
                    <div className="tag1">{tarefa.categoria}</div>
                    <label
                      className="tarefa-check"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={tarefa.concluida || false}
                        readOnly
                      />
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <div className="user-status">
          {/* Card 1: Produtividade */}
          <div className="gradient-card tarefas-lateral">
            <div className="lateral-titulo">
              <h1>Sua produtividade</h1>
              <span className="tarefas-notificacao">i</span>
            </div>

            <div className="lateral-info">
              <div className="info-conteudo">
                <div className="lateral-info-container">
                  <div className="XP fire">⚡</div>
                  <div className="lateral-info-text">
                    <strong>5892</strong>
                    <span>XP Total</span>
                  </div>
                </div>

                <div className="stats-divider"></div>

                <div className="lateral-info-container">
                  <div className="XP star">🍙</div>
                  <div className="lateral-info-text">
                    <strong>85</strong>
                    <span>Bolinhos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="semanal-info-container">
              <div className="semanal-info-titulo">
                <h2>Progresso semanal</h2>
                <strong>Level 12</strong>
              </div>

              <div className="semanal-info">
                <div className="XP nivel-icone">
                  <span className="star">⭐</span>
                  <strong className="nivel">12</strong>
                </div>

                <div className="barra">
                  <div className="xp-barra">
                    <div className="xp-porcentagem"></div>
                  </div>
                  <div className="xp-quantidade">1240 / 2000 XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Banner para criar nova tarefa */}
          <div className="gradient-card criar-lateral">
            <h1>Nenhuma tarefa concluída ainda?</h1>
            <h2>Cada tarefa te deixa mais perto de concluir seus objetivos!</h2>
            <div className="lateral-decoration">
              <img src="/img/indexLateralDeco.png" alt="" />
            </div>
            <button
              className="Nova-tarefa-lateral"
              onClick={() => setIsModalOpen(true)}
            >
              <span>+</span> Criar nova tarefa
            </button>
          </div>
        </div>
      </div>

      <ModalCriarTarefa
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTarefaCriada={carregarTarefas}
      />
      <ModalEditarTarefa
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTarefaSelecionada(null);
        }}
        tarefa={tarefaSelecionada}
        onTarefaAtualizada={carregarTarefas}
      />
      <VerTarefa
        isOpen={verTarefa}
        tarefa={tarefaSelecionada}
        onClose={() => {
          setVerTarefa(false);
        }}
      />
    </>
  );
}
