import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './css/index.css'
import './css/all.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-conteudo">
            <div className="logo">
                <img src="/img/logo.png" alt="Logo"/>
            </div>

            <nav className="nav_links">
                <a href="/home/">
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
                </a>

                <a href="/migo/">
                    <div>
                    <img className="bi bi-migo" src="/img/iconemigo.png" alt="" />
                    <span>Migo</span>
                    </div>
                </a>

                <a href="/social/">
                    <div>
                    <img className="bi bi-social" src="/img/iconesocial.png" alt="" />
                    <span>Social</span>
                    </div>
                </a>

                <a href="/grupos/">
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
                </a>

                <a href="/loja/">
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
                </a>

                <a href="/perfil/">
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
                </a>
                <a href="/ajustes/">
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
                </a>
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

      <div className="container">
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

                  <button className="index-header-add"><span>+</span> Nova tarefa</button>
              </div>
          </header>

          <main className="tasks-area">
              <div className="tasks-content">
                  {/* Seu conteúdo de tarefas vai aqui futuramente */}
                  <p>Área de tarefas ativa!</p>
              </div>
          </main>
      </div>
    </>
  )
}

export default App
