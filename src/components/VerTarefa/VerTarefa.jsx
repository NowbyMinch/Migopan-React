import React from "react";
import "../VerTarefa/style.css";

const REPETICAO = {
  NENHUMA: "Não repete",
  DIARIA: "Todo dia",
  SEMANAL: "Toda semana",
  MENSAL: "Todo mês",
};

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

function formatarDataHora(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export default function VerTarefa({ isOpen, onClose, tarefa, onEditar }) {
  if (!isOpen || !tarefa) return null;

  const concluida = Boolean(tarefa.concluida);

  return (
    <div className="modal-overlay">
      <div
        className="modal-content-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <section
          className="vt"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vt-titulo"
        >
          <header className="vt-topo">
            <div
              className="vt-icone"
              style={{
                backgroundColor: tarefa.cor || undefined,
                boxShadow: tarefa.cor ? `0 0 14px ${tarefa.cor}` : undefined,
              }}
            >
              📝
            </div>

            <div className="vt-titulos">
              <div className="vt-selos">
                {tarefa.categoria && (
                  <span className="vt-tag">{tarefa.categoria}</span>
                )}
                {tarefa.prioridade && (
                  <span className="vt-tag vt-tag--prioridade">
                    ⭐ Prioridade
                  </span>
                )}
                <span
                  className={`vt-tag ${concluida ? "vt-tag--ok" : "vt-tag--pendente"}`}
                >
                  {concluida ? "Concluída" : "Pendente"}
                </span>
              </div>
              <h1 id="vt-titulo" className="vt-titulo">
                {tarefa.titulo}
              </h1>
            </div>

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
            <span className="vt-rotulo">Descrição</span>
            {tarefa.descricao ? (
              <p className="vt-descricao">{tarefa.descricao}</p>
            ) : (
              <p className="vt-descricao vt-descricao--vazia">Sem descrição.</p>
            )}
          </div>

          <dl className="vt-meta">
            <div className="vt-meta-item">
              <dt>Prazo</dt>
              <dd>📅 {formatarPrazo(tarefa)}</dd>
            </div>
            {/* <div className="vt-meta-item">
              <dt>Repetição</dt>
              <dd>🔁 {REPETICAO[tarefa.repeticao] ?? "Não repete"}</dd>
            </div> */}
            <div className="vt-meta-item">
              <dt>Criada em</dt>
              <dd>{formatarDataHora(tarefa.dataCriacao)}</dd>
            </div>
            {concluida && (
              <div className="vt-meta-item">
                <dt>Concluída em</dt>
                <dd>{formatarDataHora(tarefa.dataResolucao)}</dd>
              </div>
            )}
          </dl>

          <footer className="vt-rodape">
            <button type="button" className="vt-botao" onClick={onClose}>
              Fechar
            </button>
            {onEditar && (
              <button
                type="button"
                className="vt-botao vt-botao--primario"
                onClick={() => onEditar(tarefa)}
              >
                Editar tarefa
              </button>
            )}
          </footer>
        </section>
      </div>
    </div>
  );
}
