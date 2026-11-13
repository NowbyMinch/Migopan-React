import React, { useEffect, useState } from "react";
import "../ModalCriarTarefa/style.css";
import { getErrorMessage } from "../../utils/errorHandler";

const API_URL = "http://localhost:8080/api/tarefas";

export default function ModalEditarTarefa({
  isOpen,
  onClose,
  tarefa,
  onTarefaAtualizada,
}) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Estudo");
  const [cor, setCor] = useState("#000718");
  const [repeticao, setRepeticao] = useState(null);
  const [dataLimite, setDataLimite] = useState(null);
  const [horarioLimite, setHorarioLimite] = useState(null);
  const [prioridade, setPrioridade] = useState(false);
  const [dataResolucao, setDataResolucao] = useState(null);
  const [concluida, setConcluida] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setDescricao(tarefa.descricao || "");
      setCategoria(tarefa.categoria || "Estudo");
      setCor(tarefa.cor || "#000718");
      setRepeticao(tarefa.repeticao || null);
      setDataLimite(tarefa.dataLimite || null);
      setHorarioLimite(tarefa.horarioLimite || null);
      setPrioridade(tarefa.prioridade || false);
      setErrorMsg("");
    }
  }, [tarefa]);

  if (!isOpen || !tarefa) return null;

  const handleFecharModal = () => {
    setErrorMsg("");
    onClose();
  };

  const handleAtualizarTarefa = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!titulo.trim()) {
      setErrorMsg("O título da tarefa é obrigatório.");
      return;
    }

    setLoading(true);

    const atualizarPayload = {
      titulo,
      descricao,
      categoria,
      cor,
      prioridade,
      repeticao,
      dataLimite: dataLimite || null,
      horarioLimite: horarioLimite ? horarioLimite.slice(0, 5) : null,
    };

    console.log(atualizarPayload);
    try {
      const res = await fetch(`${API_URL}/${tarefa.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atualizarPayload),
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao atualizar tarefa.");
      }

      if (onTarefaAtualizada) {
        await onTarefaAtualizada();
      }
      handleFecharModal();
    } catch (err) {
      console.error("Erro na atualização da tarefa:", err.message);
      setErrorMsg(err.message || "Ocorreu um erro ao atualizar a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirTarefa = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/${tarefa.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao excluir tarefa.");
      }

      if (onTarefaAtualizada) {
        await onTarefaAtualizada();
      }
      handleFecharModal();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err.message);
      setErrorMsg(err.message || "Ocorreu um erro ao excluir a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  const alternarConclusao = async () => {
    try {
      const res = await fetch(`${API_URL}/${tarefa.id}/concluir`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao excluir tarefa.");
      }

      if (onTarefaAtualizada) {
        await onTarefaAtualizada();
      }
      handleFecharModal();
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err.message);
      setErrorMsg(err.message || "Ocorreu um erro ao excluir a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-wrapper">
        <div className="modal-header">
          <div>
            <h1>Editar tarefa</h1>
            <p>Altere os detalhes ou exclua sua tarefa</p>
          </div>

          <section
            className="vt"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vt-titulo"
          >
            <button
              className="vt-fechar"
              onClick={handleFecharModal}
              disabled={loading}
            >
              ✕
            </button>
          </section>
        </div>

        {errorMsg && (
          <div
            className="modal-error-message"
            style={{
              color: "#ef4444",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="modal-grid">
          {/* Coluna Esquerda: Formulário */}
          <div className="modal-form-column">
            <div className="modal-field-group">
              <label>Título da tarefa</label>
              <input
                type="text"
                className="modal-input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Estudar para a prova"
                disabled={loading}
              />
            </div>

            <div className="modal-field-group">
              <label>Descrição</label>
              <textarea
                className="modal-textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Adicione uma descrição..."
                rows="3"
                disabled={loading}
              />
            </div>

            <div className="modal-row-2">
              <div className="modal-field-group">
                <label>Categoria</label>
                <select
                  className="modal-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  disabled={loading}
                >
                  <option value="Estudo">Estudo</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Pessoal">Pessoal</option>
                </select>
              </div>
              <div className="modal-field-group">
                <label>Cor da categoria</label>
                <input
                  type="color"
                  className="modal-color-input"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="modal-row-2">
              <div className="modal-field-group">
                <label>Data</label>
                <input
                  type="date"
                  className="modal-input"
                  value={dataLimite || ""}
                  onChange={(e) => setDataLimite(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="modal-field-group">
                <label>Horário limite</label>
                <input
                  type="time"
                  className="modal-input"
                  value={horarioLimite || ""}
                  onChange={(e) => setHorarioLimite(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="modal-form-column">
            <div className="modal-field-group">
              <label>Prévia da tarefa</label>
              <div className="modal-preview-box">
                <div className="modal-preview-header">
                  <h4 className="modal-preview-title">
                    {titulo || "Título da tarefa"}
                  </h4>
                  <span
                    className="modal-preview-badge"
                    style={{ backgroundColor: cor }}
                  >
                    {categoria}
                  </span>
                </div>
                <p className="modal-preview-desc">
                  {descricao || "Descrição da tarefa..."}
                </p>
                <div className="modal-preview-footer">
                  <span>
                    📅 {dataLimite || "Data"} ·{" "}
                    {horarioLimite || "Horário limite"}
                  </span>
                  <span style={{ color: "#a855f7", fontWeight: "bold" }}>
                    +50 XP ♦️
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-priority-box">
              <div>
                <span className="modal-priority-title">
                  ⭐ Marcar como prioridade
                </span>
                <span className="modal-priority-subtitle">
                  Tarefas prioritárias aparecem no topo
                </span>
              </div>
              <input
                type="checkbox"
                className="modal-checkbox"
                checked={prioridade}
                onChange={(e) => setPrioridade(e.target.checked)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              className="modal-btn-cancel"
              onClick={handleExcluirTarefa}
              disabled={loading}
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                color: "#ef4444",
                border: "1px solid #ef4444",
              }}
            >
              🗑️ Excluir
            </button>
            <button
              type="button"
              className="modal-btn-cancel"
              onClick={alternarConclusao}
              disabled={loading}
              style={{
                backgroundColor: "rgba(88, 204, 20, 0.15)",
                color: "#58cc02",
                border: "1px solid #58cc02",
                display: "flex",
                gap: "8px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-filtro bi-check"
                style={{ color: "#58cc02" }}
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              Alterar Conclusão
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              className="modal-btn-cancel"
              onClick={handleFecharModal}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              className="modal-btn-submit"
              onClick={handleAtualizarTarefa}
              disabled={loading}
            >
              {loading ? "Salvando..." : "✓ Salvar alterações"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
