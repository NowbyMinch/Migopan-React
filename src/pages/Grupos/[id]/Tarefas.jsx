import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import "../../../css/grupo.css";
import ModalCriarTarefa from "../../../components/ModalCriarTarefa/ModalCriarTarefa";
import ModalEditarTarefa from "../../../components/ModalEditarTarefa/ModalEditarTarefa";
import VerTarefa from "../../../components/VerTarefa/VerTarefa";

function formatarPrazo(tarefa) {
  if (!tarefa.dataLimite) return "Sem prazo";

  const hoje = new Date().toLocaleDateString("sv-SE");
  const data =
    tarefa.dataLimite === hoje
      ? "Hoje"
      : tarefa.dataLimite.split("-").reverse().join("/");
  const hora = tarefa.horarioLimite?.slice(0, 5);

  return hora ? `${data} · ${hora}` : data;
}

export default function Tarefas() {
  const {
    grupo,
    tarefas,
    carregandoTarefas: loading,
    erroTarefas: erro,
    recarregarTarefas: carregarTarefas,
  } = useOutletContext();

  const [filtro, setFiltro] = useState("TODAS");

  const [verTarefa, setVerTarefa] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [busca, setBusca] = useState("");

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

  const base = (filtro === "PRIORIDADES" ? prioritarias : tarefas).filter(
    (tarefa) => {
      const atendeBusca =
        tarefa.titulo?.toLowerCase().includes(busca) ||
        tarefa.descricao?.toLowerCase().includes(busca);

      return atendeBusca;
    },
  );

  const pendentesVisiveis = base.filter((t) => !t.concluida);
  const concluidasVisiveis = base.filter((t) => t.concluida);

  const mostrarPendentes = filtro !== "CONCLUIDAS";
  const mostrarConcluidas = filtro !== "PENDENTES";

  const renderCard = (tarefa) => (
    <div
      key={tarefa.id}
      className={`task-card ${tarefa.concluida ? "task-card--concluida" : ""}`}
      onClick={() => {
        setTarefaSelecionada(tarefa);
        setVerTarefa(true);
      }}
    >
      <div className="task-top">
        <div
          className="task-icon"
          style={{
            backgroundColor: tarefa.cor,
            boxShadow: `0 0 12px ${tarefa.cor}`,
          }}
        >
          <span>📝</span>
        </div>

        <div className="task-content">
          <h3>{tarefa.titulo}</h3>
          <p>{tarefa.descricao}</p>
        </div>

        <button
          type="button"
          aria-label="Editar tarefa"
          onClick={(e) => {
            e.stopPropagation();
            setTarefaSelecionada(tarefa);
            setIsEditModalOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi-filtro bi-pen editar-tarefa-grupo"
            viewBox="0 0 16 16"
          >
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
          </svg>
        </button>
      </div>

      <div className="task-bottom">
        <span className="task-ver-mais">Ver mais...</span>

        <div className="task-time">
          <span className="calendar-icon">▣</span>
          <span>{formatarPrazo(tarefa)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tarefas-grupo-container">
      <div className="tarefas-grupo-titulo">
        <h1>Tarefas do grupo</h1>onClick={() => {
        setTarefaSelecionada(tarefa);
        setVerTarefa(true);
      }}
        <h2>Organizem-se e concluam juntos!</h2>
      </div>
      <div className="tarefas-grupo-filtros">
        <input
          type="search"
          className="search"
          placeholder="Buscar tarefas"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
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

        <button
          className="tarefas-grupo-add"
          onClick={() => setIsModalOpen(true)}
        >
          <span>+</span> Nova tarefa
        </button>
      </div>

      <div className="tarefas-grupo">
        {loading ? (
          <p>Carregando tarefas...</p>
        ) : erro ? (
          <div className="error-banner">⚠️ {erro}</div>
        ) : tarefasVisiveis.length === 0 ? (
          <p>{mensagemVazia} </p>
        ) : (
          <>
            {mostrarPendentes && (
              <>
                <div className="pendentes-titulo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi-filtro bi-pendentes"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                  </svg>
                  <span>Pendentes ({pendentesVisiveis.length})</span>
                </div>
                <div className="pendentes">
                  {pendentesVisiveis.length === 0 ? (
                    <p>Nenhuma tarefa pendente</p>
                  ) : (
                    pendentesVisiveis.map(renderCard)
                  )}
                </div>
              </>
            )}

            {mostrarConcluidas && concluidasVisiveis.length > 0 && (
              <>
                <div className="concluidas-titulo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi-filtro bi-check"
                    style={{ color: "#58cc02" }}
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                  <span>Concluídas ({concluidasVisiveis.length})</span>
                </div>
                <div className="grupo-pendentes">
                  {concluidasVisiveis.map(renderCard)}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <ModalCriarTarefa
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTarefaCriada={carregarTarefas}
        grupoId={grupo.id}
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
    </div>
  );
}
