import React, { useState } from "react";
import "../ModalCriarTarefa/style.css";
import { getErrorMessage } from "../../utils/errorHandler";

const API_URL = "http://localhost:8080/api/tarefas";

export default function ModalCriarTarefa({ isOpen, onClose, onTarefaCriada }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Estudo");
  const [corCategoria, setCorCategoria] = useState("#000718");
  const [repeticao, setRepeticao] = useState("DIARIA");
  const [data, setData] = useState("2026-03-17");
  const [horario, setHorario] = useState("13:20");
  const [prioridade, setPrioridade] = useState(false);

  // Estados de feedback visual
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleFecharModal = () => {
    setTitulo("");
    setDescricao("");
    setCategoria("Estudo");
    setCorCategoria("#000718");
    setRepeticao("DIARIA");
    setData("2026-03-17");
    setHorario("13:20");
    setPrioridade(false);
    setErrorMsg("");
    onClose();
  };

  const handleCriarTarefa = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!titulo.trim()) {
      setErrorMsg("O título da tarefa é obrigatório.");
      return;
    }

    setLoading(true);

    const criarPayload = {
      titulo,
      descricao,
      repeticao,
      // inclua os outros campos conforme forem implementados no backend
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criarPayload),
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao criar tarefa.");
      }

      // Se bem-sucedido, notifica a Home e fecha o modal
      if (onTarefaCriada) {
        await onTarefaCriada();
      }
      handleFecharModal();
    } catch (err) {
      console.error("Erro na criação da tarefa:", err.message);
      setErrorMsg(err.message || "Ocorreu um erro ao criar a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-wrapper">
        <div className="modal-header">
          <div>
            <h2>Criar tarefa</h2>
            <p>Adicione os detalhes da sua nova tarefa</p>
          </div>
          <button className="modal-close-btn" onClick={handleFecharModal} disabled={loading}>
            ✕
          </button>
        </div>

        {/* MENSAGEM DE ERRO VISUAL */}
        {errorMsg && (
          <div className="modal-error-message" style={{ color: "#ef4444", marginBottom: "1rem", fontWeight: "bold" }}>
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

        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={handleFecharModal} disabled={loading}>
            Cancelar
          </button>
          <button className="modal-btn-submit" onClick={handleCriarTarefa} disabled={loading}>
            {loading ? "Criando..." : "✓ Criar tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
}