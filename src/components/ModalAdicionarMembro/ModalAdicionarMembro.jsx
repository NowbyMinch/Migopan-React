import React, { useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/errorHandler";
import "../ModalCriarTarefa/style.css";
import "./ModalAdicionarMembro.css";

const API_URL = "http://localhost:8080/api/grupos";
const ATRASO_BUSCA_MS = 300;
const MINIMO_LETRAS = 2;

// Ainda quero usar =>
const iniciais = (nome = "") => {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
};

const corDoAvatar = (id) => `hsl(${(Number(id) * 47) % 360} 60% 45%)`;

export default function ModalAdicionarMembro({
  isOpen,
  onClose,
  grupoId,
  onMembroAdicionado,
}) {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [ultimoTermo, setUltimoTermo] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [adicionandoId, setAdicionandoId] = useState(null);
  const [adicionados, setAdicionados] = useState([]);
  const [comoAdmin, setComoAdmin] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setBusca("");
    setResultados([]);
    setUltimoTermo("");
    setAdicionados([]);
    setComoAdmin(false);
    setErro("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const termo = busca.trim();
    if (termo.length < MINIMO_LETRAS) {
      setResultados([]);
      setUltimoTermo("");
      setBuscando(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setBuscando(true);
        setErro("");

        const res = await fetch(
          `${API_URL}/${grupoId}/membros/candidatos?nome=${encodeURIComponent(termo)}`,
          { credentials: "include", signal: controller.signal },
        );
        if (!res.ok) throw new Error(await getErrorMessage(res));

        setResultados(await res.json());
        setUltimoTermo(termo);
      } catch (err) {
        if (err.name !== "AbortError") setErro(err.message);
      } finally {
        if (!controller.signal.aborted) setBuscando(false);
      }
    }, ATRASO_BUSCA_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [busca, grupoId, isOpen]);

  const adicionar = async (usuario) => {
    setAdicionandoId(usuario.id);
    setErro("");

    try {
      const res = await fetch(`${API_URL}/${grupoId}/membros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          usuarioId: usuario.id,
          papel: comoAdmin ? "ADMIN" : "MEMBRO",
        }),
      });
      if (!res.ok) throw new Error(await getErrorMessage(res));

      setAdicionados((anteriores) => [...anteriores, usuario.id]);
      await onMembroAdicionado?.();
    } catch (err) {
      setErro(err.message);
    } finally {
      setAdicionandoId(null);
    }
  };

  if (!isOpen) return null;

  const termo = busca.trim();
  const semResultado =
    !buscando &&
    termo.length >= MINIMO_LETRAS &&
    ultimoTermo === termo &&
    resultados.length === 0;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content-wrapper modal-adicionar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-adicionar-titulo"
      >
        <div className="modal-header-adicionar">
          <div>
            <h1 className="title-generic">Adicionar membro</h1>
            <p className="subtitle-generic">
              Pesquise pelo nome e adicione ao grupo
            </p>
          </div>
          <button
            type="button"
            className="modal-adicionar-fechar"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="modal-field-group">
          <label htmlFor="modal-adicionar-busca">Nome do usuário</label>
          <input
            id="modal-adicionar-busca"
            type="search"
            className="modal-input"
            placeholder="Ex.: Maria"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            autoComplete="off"
            autoFocus
          />
        </div>

        <label className="modal-adicionar-admin">
          <input
            type="checkbox"
            checked={comoAdmin}
            onChange={(e) => setComoAdmin(e.target.checked)}
          />
          Adicionar como administrador
        </label>

        {erro && (
          <div className="modal-adicionar-erro" role="alert">
            ⚠️ {erro}
          </div>
        )}

        <div className="modal-adicionar-resultados" aria-live="polite">
          {termo.length < MINIMO_LETRAS ? (
            <p className="modal-adicionar-aviso">
              Digite pelo menos {MINIMO_LETRAS} letras para buscar.
            </p>
          ) : buscando && resultados.length === 0 ? (
            <p className="modal-adicionar-aviso">Buscando...</p>
          ) : semResultado ? (
            <p className="modal-adicionar-aviso">
              Nenhum usuário encontrado. Quem já está no grupo não aparece aqui.
            </p>
          ) : (
            <ul className="modal-adicionar-lista">
              {resultados.map((u) => {
                const jaAdicionado = adicionados.includes(u.id);

                return (
                  <li key={u.id} className="modal-adicionar-item">
                    <span
                      className="modal-adicionar-avatar"
                      style={{ backgroundColor: corDoAvatar(u.id) }}
                      aria-hidden="true"
                    >
                      {iniciais(u.nome)}
                    </span>
                    <span className="modal-adicionar-nome">{u.nome}</span>
                    <button
                      type="button"
                      className={`modal-adicionar-adicionar ${jaAdicionado ? "modal-adicionar-adicionar--ok" : ""}`}
                      onClick={() => adicionar(u)}
                      disabled={jaAdicionado || adicionandoId !== null}
                    >
                      {jaAdicionado
                        ? "✓ Adicionado"
                        : adicionandoId === u.id
                          ? "Adicionando..."
                          : "+ Adicionar"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-btn-cancel" onClick={onClose}>
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
