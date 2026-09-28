import React, { useState } from "react";
import { getErrorMessage } from "../../utils/errorHandler";
import "../ModalCriarGrupo/CriarGrupo.css"

const API_URL = "http://localhost:8080/api/grupos";

export default function ModalCriarGrupo({ isOpen, onClose, onGrupoCriado }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [privado, setPrivado] = useState(false);

  // Estados de feedback visual
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleFecharModal = () => {
    setNome("");
    setDescricao("");
    setImagemUrl("");
    setPrivado(false);
    setErrorMsg("");
    onClose();
  };

  const handleCriarGrupo = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!nome.trim()) {
      setErrorMsg("O nome do grupo é obrigatório.");
      return;
    }

    setLoading(true);

    const criarPayload = {
      nome,
      descricao,
    //   imagemUrl: imagemUrl.trim() || null,
    //   privado,
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
        throw new Error(mensagem || "Falha ao criar grupo.");
      }

      if (onGrupoCriado) {
        await onGrupoCriado();
      }
      handleFecharModal();
    } catch (err) {
      console.error("Erro na criação do grupo:", err.message);
      setErrorMsg(err.message || "Ocorreu um erro ao criar o grupo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-wrapper">
        <div className="modal-header">
          <div>
            <h2>Criar novo grupo</h2>
            <p>Monte sua equipe para colaborar e conquistar objetivos juntos</p>
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
              <label>Nome do grupo *</label>
              <input
                type="text"
                className="modal-input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Devs Java & React"
                disabled={loading}
              />
            </div>

            <div className="modal-field-group">
              <label>Descrição</label>
              <textarea
                className="modal-textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Fale um pouco sobre o objetivo do grupo..."
                rows="3"
                disabled={loading}
              />
            </div>

            <div className="modal-field-group">
              <label>URL da Imagem de Capa/Avança</label>
              <input
                type="url"
                className="modal-input"
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.png"
                disabled={loading}
              />
            </div>
          </div>

          {/* Coluna Direita: Prévia do Card de Grupo & Visibilidade */}
          <div className="modal-form-column">
            <div className="modal-field-group">
              <label>Prévia do grupo</label>
              <div className="modal-preview-box">
                <div
                  style={{
                    height: "80px",
                    borderRadius: "8px",
                    backgroundColor: "#1e293b",
                    backgroundImage: imagemUrl ? `url(${imagemUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                  }}
                >
                  {!imagemUrl && <span>🖼️ Sem imagem</span>}
                </div>
                <div className="modal-preview-header">
                  <h4 className="modal-preview-title">
                    {nome || "Nome do grupo"}
                  </h4>
                  <span
                    className="modal-preview-badge"
                    style={{
                      backgroundColor: privado ? "#e11d48" : "#10b981",
                    }}
                  >
                    {privado ? "Privado" : "Público"}
                  </span>
                </div>
                <p className="modal-preview-desc">
                  {descricao || "Descrição do grupo aparecerá aqui..."}
                </p>
                <div className="modal-preview-footer">
                  <span>👥 1 Membro (Você)</span>
                  <span style={{ color: "#1cb0f6", fontWeight: "bold" }}>
                    Nível 1 ⭐
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-priority-box">
              <div>
                <span className="modal-priority-title">
                  🔒 Grupo privado
                </span>
                <span className="modal-priority-subtitle">
                  Apenas convidados poderão se juntar
                </span>
              </div>
              <input
                type="checkbox"
                className="modal-checkbox"
                checked={privado}
                onChange={(e) => setPrivado(e.target.checked)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="modal-btn-cancel"
            onClick={handleFecharModal}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="modal-btn-submit"
            onClick={handleCriarGrupo}
            disabled={loading}
          >
            {loading ? "Criando..." : "✓ Criar grupo"}
          </button>
        </div>
      </div>
    </div>
  );
}