import React from "react";
import "../VerMais/style.css";

export default function VerMais({ isOpen, onClose, lista, conteudo, acao }) {
  if (!isOpen || !lista) return null;

  return (
    <div className="modal-overlay">
      <div
        className={
          conteudo === "membros"
            ? "modal-content-wrapper-verMais"
            : "modal-content-wrapper-verMais-deletar"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <section
          className="vt"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vt-titulo"
        >
          <header
            className={
              conteudo === "membros"
                ? "vt-topo-verMais"
                : "vt-topo-verMais-deletar"
            }
          >
            <h1
              className={
                conteudo === "membros" ? "title-generic" : "deletar-title"
              }
            >
              {conteudo === "membros" ? "Membros" : "Excluir Grupo"}
            </h1>

            {conteudo === "membros" && (
              <button
                type="button"
                className="vt-fechar"
                onClick={onClose}
                aria-label="Fechar"
              >
                ✕
              </button>
            )}
          </header>

          <div
            className={conteudo === "membros" ? "vt-corpo" : "vt-corpo-deletar"}
          >
            {lista.length > 0 &&
              lista.map((item, index) => (
                <div key={index} className="membro-grupo">
                  <div className="membro-imagem">
                    <img src="/img/iconemigo.png" alt="" />
                  </div>
                  <span className="title-generic">{item.nomeUsuario}</span>
                </div>
              ))}
            {conteudo === "deletar" && (
              <p className="subtitle-generic">
                Deseja mesmo deletar esse grupo?{" "}
              </p>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="modal-btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="button"
              className={
                conteudo === "membros"
                  ? "modal-btn-submit"
                  : "modal-btn-deletar"
              }
              onClick={() => {
                onClose();
                acao();
              }}
            >
              Excluir
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
