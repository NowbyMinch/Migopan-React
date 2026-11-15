import React from "react";
import "../VerMais/style.css";

export default function VerMais({ isOpen, onClose, lista }) {
  if (!isOpen || !lista) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content-wrapper-verMais"
        onClick={(e) => e.stopPropagation()}
      >
        <section
          className="vt"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vt-titulo"
        >
          <header className="vt-topo-verMais">
            <h1 className="title-generic">Membros</h1>

            <button
              type="button"
              className="vt-fechar"
              onClick={onClose}
              aria-label="Fechar"
            >
              ✕
            </button>
          </header>

          <div className="vt-corpo">
            {lista.map((item, index) => (
              <div key={index} className="membro-grupo">
                <div className="membro-imagem">
                  <img src="/img/iconemigo.png" alt="" />
                </div>
                <span className="title-generic">{item.nomeUsuario}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
