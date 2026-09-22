import React, { useEffect, useState } from "react";
import "../ModalCriarTarefa/style.css"; // Reutiliza exatamente o mesmo CSS do modal de criação
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
  const [corCategoria, setCorCategoria] = useState("#000718");
  const [repeticao, setRepeticao] = useState("DIARIA");
  const [data, setData] = useState("2026-09-22");
  const [horario, setHorario] = useState("00:00");
  const [prioridade, setPrioridade] = useState(false);

  // Estados de feedback visual
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Preenche o formulário sempre que a tarefa passada via prop mudar
  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "");
      setDescricao(tarefa.descricao || "");
      setCategoria(tarefa.categoria || "Estudo");
      setCorCategoria(tarefa.corCategoria || "#000718");
      setRepeticao(tarefa.repeticao || "DIARIA");
      setData(tarefa.data || "2026-09-22");
      setHorario(tarefa.horario || "00:00");
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
      repeticao,
      // categoria,
      // corCategoria,
      // data,
      // horario,
      // prioridade,
    };

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

  // DELETE: Excluir Tarefa
  const handleExcluirTarefa = async () => {
    // if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;

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

  return (
    <div className="modal-overlay">
      <div className="modal-content-wrapper">
        <div className="modal-header">
          <div>
            <h2>Editar tarefa</h2>
            <p>Altere os detalhes ou exclua sua tarefa</p>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleFecharModal}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* MENSAGEM DE ERRO VISUAL */}
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
                  value={corCategoria}
                  onChange={(e) => setCorCategoria(e.target.value)}
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
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="modal-field-group">
                <label>Horário</label>
                <input
                  type="time"
                  className="modal-input"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Coluna Direita: Prévia e Prioridade */}
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
                    style={{ backgroundColor: corCategoria }}
                  >
                    {categoria}
                  </span>
                </div>
                <p className="modal-preview-desc">
                  {descricao || "Descrição da tarefa..."}
                </p>
                <div className="modal-preview-footer">
                  <span>
                    📅 {data} · {horario}
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
