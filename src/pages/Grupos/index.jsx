import React from "react";
import { Link } from "react-router-dom";
import "../../css/all.css";
import "../../css/grupos.css";
import Sidebar from "../../components/Sidebar";

export default function Grupos() {
  return (
    <>
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTAINER PRINCIPAL */}
      <div class="main-container">
        <header class="index-header">
          <div class="page-intro">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-grupos-active"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
            <div class="page-info">
              <h1>Grupos</h1>
              <p>
                Junte-se a grupos, convide amigos e conquiste objetivos juntos!
              </p>
            </div>
          </div>
          <button class="index-header-add">
            <span>+</span> Criar grupo
          </button>
        </header>

        <main class="group-area">
          <div class="grupos-header">
            <input type="search" class="search" placeholder="Buscar grupos" />
            <button class="filtros-card filtros-card-active1">
              <span>Todas</span>
            </button>
            <button class="filtros-card">
              <span>Meus grupos</span>
            </button>
            <button class="filtros-card">
              <span>Participando</span>
            </button>
            <button class="filtros-card">
              <span>Convites</span>
              <span class="grupos-participando">2</span>
            </button>
          </div>

          <div class="grupos">
            <div class="grupo gradient-card">
              <a href="grupo">
                <div class="grupo-lateral-background">
                  <div class="dark-effect"></div>
                  <img src="/img/grupoEx1webp.webp" alt="Grupo de Leitura" />
                </div>
                <div class="grupo-info top-info">
                  <h1>Livros para discutir</h1>
                  <h2>Grupo criado por você</h2>
                  <p>
                    Grupo dedicado a discutir sobre diversos livros e tópicos
                    literários.
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
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-grupos-active"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        <span>12</span>
                      </div>
                    </div>
                    <div class="grupo-detail">
                      <span>Tarefas</span>
                      <div>
                        <span>12</span>
                      </div>
                    </div>
                    <div class="grupo-detail">
                      <span>Sequência</span>
                      <div>
                        <strong class="fire">🔥</strong>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="grupo gradient-card">
              <a href="grupo">
                <div class="grupo-lateral-background">
                  <div class="dark-effect"></div>
                  <img src="/img/tcc.jpg" alt="Projeto TCC" />
                </div>
                <div class="grupo-info top-info">
                  <h1>Projeto TCC 2026</h1>
                  <p>
                    Organização de tarefas, pesquisas, prazos e entregas para o
                    desenvolvimento do TCC.
                  </p>
                </div>
                <hr />
                <div class="grupo-info middle-info">
                  <div class="barra-details">
                    <div class="xp-quantidade-grupo">
                      <strong> Nível 6 </strong>
                      <span> 842 / 2000 XP </span>
                    </div>
                    <div class="xp-barra">
                      <div class="grupo-porcentagem xp-porcentagem2"></div>
                    </div>
                  </div>
                  <div class="grupo-details">
                    <div class="grupo-detail">
                      <span>Membros</span>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-grupos-active"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        <span>10</span>
                      </div>
                    </div>
                    <div class="grupo-detail">
                      <span>Tarefas</span>
                      <div>
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
                          <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                        </svg>
                        <span>16</span>
                      </div>
                    </div>
                    <div class="grupo-detail">
                      <span>Sequência</span>
                      <div>
                        <strong class="fire">🔥</strong>
                        <span>15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="grupo grupo2 gradient-card"></div>
            <div class="grupo grupo2 gradient-card"></div>
            <div class="grupo grupo2 gradient-card"></div>
          </div>

          <aside class="group-view gradient-card">
            <div class="grupo-lateral-background">
              <div class="dark-effect"></div>
              <img src="/img/grupoEx1webp.webp" alt="Grupo de Leitura" />
            </div>

            <div class="lateral-info">
              <h1>Livros para discutir</h1>
              <h2>Grupo criado por você</h2>
              <p>
                Grupo dedicado a discutir sobre diversos livros e tópicos
                literários.
              </p>
              <button class="convidar-membro">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
                Convidar membros
              </button>
            </div>

            <hr />

            <div class="lateral-info">
              <div class="ultimo-grupo-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-grupos-active"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
                <span>Membros</span>
                <span>12</span>
              </div>
              <div class="ultimo-grupo-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <span>Tarefas concluídas</span>
                <span>8</span>
              </div>
              <div class="ultimo-grupo-info">
                <span class="fire">🔥</span>
                <span>Sequência atual</span>
                <span>7 dias</span>
              </div>
              <div class="ultimo-grupo-info sequencia">
                <span class="star">⭐</span>
                <span>Nível do grupo</span>
                <span>12</span>
              </div>
              <div class="barra">
                <div class="xp-barra">
                  <div class="grupo-porcentagem xp-porcentagem"></div>
                </div>
                <div class="xp-quantidade">1240 / 2000 XP</div>
              </div>
            </div>

            <hr />

            <div class="lateral-info lateral-mais-info">
              <button class="mais-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi-check-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                </svg>
                <span>Ver tarefas do grupo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                </svg>
              </button>
              <button class="mais-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-bar-chart"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z" />
                </svg>
                <span>Ranking do grupo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                </svg>
              </button>
              <button class="mais-info sair-grupo-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-exit"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                <span>Sair do grupo</span>
              </button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
