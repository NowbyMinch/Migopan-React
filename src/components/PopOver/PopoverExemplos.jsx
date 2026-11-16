import Popover, { PopoverItem, PopoverDivider, PopoverHeader } from "./Popover";

/* Ícones inline (troque pelos que você já usa no projeto) */
const DotsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);
const CrownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z" />
  </svg>
);
const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
  </svg>
);

/* 1) Menu dos 3 pontinhos na linha do membro (tela Gerenciar Grupo) */
export function MenuMembro({ membro, ehAdmin, onRemover, onTornarAdmin }) {
  return (
    <Popover
      trigger={
        <button
          type="button"
          className="mp-icon-btn"
          aria-label={`Opções de ${membro.nome}`}
        >
          <DotsIcon />
        </button>
      }
      placement="bottom-end"
    >
      {!ehAdmin && (
        <PopoverItem icon={<CrownIcon />} onClick={() => onTornarAdmin(membro)}>
          Tornar administrador
        </PopoverItem>
      )}
      {!ehAdmin && <PopoverDivider />}
      <PopoverItem
        icon={<TrashIcon />}
        danger
        onClick={() => onRemover(membro)}
      >
        Remover do grupo
      </PopoverItem>
    </Popover>
  );
}

/* 2) Notificações ao passar o mouse (largura/altura adaptativas) */
export function NotificacoesHover({ notificacoes = [], onMarcarLidas }) {
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <Popover
      mode="hover"
      role="dialog"
      placement="bottom-end"
      width={340}
      maxHeight={360}
      trigger={
        <button
          type="button"
          className="mp-icon-btn"
          aria-label={`Notificações (${naoLidas} novas)`}
        >
          <BellIcon />
        </button>
      }
    >
      <PopoverHeader
        title="Notificações"
        action={
          naoLidas > 0 && (
            <button
              type="button"
              className="mp-item"
              style={{ width: "auto", padding: "4px 8px" }}
              onClick={onMarcarLidas}
            >
              Marcar como lidas
            </button>
          )
        }
      />

      {notificacoes.length === 0 ? (
        <p style={{ margin: 0, padding: "16px 12px", color: "#9a9dc0" }}>
          Você não tem notificações.
        </p>
      ) : (
        notificacoes.map((n) => (
          <div key={n.id} className="mp-notification">
            {!n.lida && <span className="mp-notification__dot" />}
            <div>
              <span className="mp-notification__title">{n.titulo}</span>
              <span className="mp-notification__text">{n.texto}</span>
            </div>
          </div>
        ))
      )}
    </Popover>
  );
}
