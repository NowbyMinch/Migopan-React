import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorHandler";
import "../../css/all.css";
import "../../css/index.css";
import ModalCriarTarefa from "../../components/ModalCriarTarefa/ModalCriarTarefa";
import ModalEditarTarefa from "../../components/ModalEditarTarefa/ModalEditarTarefa";

const API_URL = "http://localhost:8080/api/tarefas";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");

  const carregarTarefas = async () => {
    setLoading(true);

    try {
      let url = `${API_URL}/pessoais`;
      if (filtro === "PENDENTES") url += "?concluida=false";
      if (filtro === "CONCLUIDAS") url += "?concluida=true";

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);

        throw new Error(mensagem);
      }

      const data = await res.json();
      setTarefas(data);
    } catch (err) {
      console.error("Erro na requisição", err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletarTarefa = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);

        throw new Error(mensagem);
      }

      const data = await res.json();
      setTarefas(data);
    } catch (err) {
      console.error("Erro na requisição", err.message);
    } finally {
      carregarTarefas();
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, [filtro]);

  return (
    <>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-conteudo">
          <div className="logo">
            <img src="img/logo.png" alt="Logo" />
          </div>

          <nav className="nav_links">
            <Link to="/home">
              <div className="div_active nav-home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#8435FC"
                  className="bi bi-home-active"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                </svg>
                <span>Home</span>
              </div>
            </Link>

            <Link to="/migo">
              <div>
                <img className="bi bi-migo" src="img/iconemigo.png" alt="" />
                <span>Migo</span>
              </div>
            </Link>

            <Link to="/social">
              <div>
                <img
                  className="bi bi-social"
                  src="img/iconesocial.png"
                  alt=""
                />
                <span>Social</span>
              </div>
            </Link>

            <Link to="/grupos">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-grupos"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
                <span>Grupos</span>
              </div>
            </Link>

            <Link to="/loja">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-loja"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                <span>Loja</span>
              </div>
            </Link>

            <Link to="/perfil">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-perfil"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <span>Perfil</span>
              </div>
            </Link>

            <Link to="/ajustes">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-ajustes"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <span>Ajustes</span>
              </div>
            </Link>
          </nav>

          <button className="sair-btn">
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
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* CONTAINER PRINCIPAL */}
      <div className="main-container">
        <header className="index-header">
          <div className="page-intro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#8435FC"
              className="bi bi-home-active"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
            <div className="index-header-left">
              <h1>Tarefas</h1>
              <p>Organize seu dia e conquiste objetivos!</p>
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
            <button className="filtros-card filtros-card-active1" title="Todas">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                />
              </svg>
              <span className="status-filtro">Todas</span>
            </button>

            <button className="filtros-card" title="Pendentes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-amp"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
              </svg>
              <span className="status-filtro">Pendentes</span>
              <span className="tarefas-notificacao">3</span>
            </button>

            <button className="filtros-card" title="Em andamento">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-play"
                viewBox="0 0 16 16"
              >
                <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
              </svg>
              <span className="status-filtro">Em andamento</span>
              <span className="tarefas-notificacao">3</span>
            </button>

            <button className="filtros-card" title="Concluídas">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <span className="status-filtro">Concluídas</span>
              <span className="tarefas-notificacao">3</span>
            </button>
          </div>

          {/* Trecho dentro de Home.jsx no container das tarefas */}
          <div className="tasks">
            {loading ? (
              <p>Carregando tarefas...</p>
            ) : tarefas.length === 0 ? (
              <p>Nenhuma tarefa encontrada</p>
            ) : (
              tarefas.map((tarefa, index) => (
                <div
                  key={tarefa.id || index}
                  className="tarefa gradient-card"
                  style={{ border: "none" }}
                >
                  <label className="tarefa-check">
                    <input
                      type="checkbox"
                      checked={tarefa.concluida || false}
                      readOnly
                    />
                    <span className="check-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi-check-tarefa"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                      </svg>
                    </span>
                  </label>

                  <div className="icon-tarefa1 tarefa-icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 15h8v2H6zm0-4h12v2H6zm0-4h12v2H6z"></path>
                      <path d="M4 21h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2M4 5h16v14H4z"></path>
                    </svg>
                  </div>

                  <div className="tarefa-info tarefa1">
                    <h1>{tarefa.titulo}</h1>
                    <p>{tarefa.descricao}</p>
                    <span>📅 {tarefa.repeticao || "Única"}</span>
                  </div>
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi-pen"
                    viewBox="0 0 16 16"
                    onClick={() => {setIsEditModalOpen(true); setTarefaSelecionada(tarefa.id)}}
                  >
                    <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"
                    />
                  </svg>

                  <div className="tarefa-info-extra">
                    <div className="tag1">Estudo</div>
                    <span>+50 XP ♦️</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Instanciação do Modal ao final do Home.jsx */}
          <ModalCriarTarefa
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTarefaCriada={carregarTarefas}
          />
        </main>

        <div className="user-status">
          <div className="ofensive">
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

          <div className="user-status">
            <div className="gradient-card criar-lateral">
              <h1>Nenhuma tarefa concluída ainda?</h1>
              <h2>
                Cada tarefa te deixa mais perto de concluir seus objetivos!
              </h2>
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
    </>
  );
}
