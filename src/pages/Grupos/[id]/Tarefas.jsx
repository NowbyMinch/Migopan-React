import { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import "../../../css/grupo.css";
import { getErrorMessage } from "../../../utils/errorHandler";
import ModalCriarTarefa from "../../../components/ModalCriarTarefa/ModalCriarTarefa";
import ModalEditarTarefa from "../../../components/ModalEditarTarefa/ModalEditarTarefa";

const API_URL = "http://localhost:8080/api";

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
  const { grupo } = useOutletContext();

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("TODAS");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const carregarTarefas = useCallback(async () => {
    try {
      setLoading(true);
      setErro("");

      const res = await fetch(`${API_URL}/tarefas/grupo/${grupo.id}`, {
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
  }, [grupo.id]);

  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  const alternarConclusao = async (tarefa) => {
    try {
      const res = await fetch(`${API_URL}/tarefas/${tarefa.id}/concluir`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));

      const atualizada = await res.json();
      setTarefas((prev) =>
        prev.map((t) => (t.id === atualizada.id ? atualizada : t)),
      );
    } catch (err) {
      setErro(err.message);
    }
  };

  const abrirEdicao = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setIsEditModalOpen(true);
  };

  // o backend só filtra por concluída ou não, então filtramos aqui
  const pendentes = tarefas.filter((t) => !t.concluida);
  const concluidas = tarefas.filter((t) => t.concluida);

  const filtros = [
    { key: "TODAS", label: "Todas" },
    { key: "PENDENTES", label: "Pendentes", total: pendentes.length },
    { key: "CONCLUIDAS", label: "Concluídas", total: concluidas.length },
  ];

  const mostrarPendentes = filtro !== "CONCLUIDAS";
  const mostrarConcluidas = filtro !== "PENDENTES";

  const renderCard = (tarefa) => (
    <div
      key={tarefa.id}
      className={`task-card ${tarefa.concluida ? "task-card--concluida" : ""}`}
    >
      <div className="task-top">
        <div
          className="task-icon"
          // style={tarefa.cor ? { backgroundColor: tarefa.cor } : undefined}
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

        {/* <button
          type="button"
          className={`task-check ${tarefa.concluida ? "task-check--feito" : ""}`}
          title={tarefa.concluida ? "Reabrir tarefa" : "Concluir tarefa"}
          onClick={() => alternarConclusao(tarefa)}
        /> */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi-filtro bi-pen editar-tarefa-grupo"
            viewBox="0 0 16 16"
            onClick={() => {
              setIsEditModalOpen(true);
              setTarefaSelecionada(tarefa);
            }}
          >
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
          </svg>
        </button>
      </div>

      <div className="task-bottom">
        <span className="task-ver-mais" onClick={() => abrirEdicao(tarefa)}>
          Ver mais...
        </span>

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
        <h1>Tarefas do grupo</h1>
        <h2>Organizem-se e concluam juntos!</h2>
      </div>

      <div className="tarefas-grupo-filtros">
        {filtros.map((f) => (
          <button
            key={f.key}
            title={f.label}
            className={`filtros-card ${filtro === f.key ? "filtros-card-active1" : ""}`}
            onClick={() => setFiltro(f.key)}
          >
            {/* copie o svg de cada filtro da Home (bi-list, bi-amp, bi-check) */}
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

      {erro && <div className="error-banner">⚠️ {erro}</div>}

      <div className="tarefas-grupo">
        {loading ? (
          <p>Carregando tarefas...</p>
        ) : tarefas.length === 0 ? (
          <p>Este grupo ainda não tem tarefas. Crie a primeira!</p>
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

                  <span>Pendentes ({pendentes.length})</span>
                </div>
                <div className="grupo-pendentes">
                  {pendentes.length === 0 ? (
                    <p>Nenhuma tarefa pendente 🎉</p>
                  ) : (
                    pendentes.map(renderCard)
                  )}
                </div>
              </>
            )}

            {mostrarConcluidas && concluidas.length > 0 && (
              <>
                <div className="pendentes-titulo concluidas-titulo">
                  <span>Concluídas ({concluidas.length})</span>
                </div>
                <div className="grupo-pendentes">
                  {concluidas.map(renderCard)}
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
    </div>
  );
}
