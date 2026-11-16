import {
  createContext,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "../PopOver/Popover.css";

const PopoverContext = createContext({ close: () => {} });

function computePosition(triggerRect, panelRect, placement, offset) {
  const margin = 8;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let [side, align = "center"] = placement.split("-");

  const spaceBelow = vh - triggerRect.bottom - offset - margin;
  const spaceAbove = triggerRect.top - offset - margin;

  if (
    side === "bottom" &&
    panelRect.height > spaceBelow &&
    spaceAbove > spaceBelow
  )
    side = "top";
  else if (
    side === "top" &&
    panelRect.height > spaceAbove &&
    spaceBelow > spaceAbove
  )
    side = "bottom";

  const top =
    side === "bottom"
      ? triggerRect.bottom + offset
      : triggerRect.top - panelRect.height - offset;

  let left;
  if (align === "start") left = triggerRect.left;
  else if (align === "end") left = triggerRect.right - panelRect.width;
  else left = triggerRect.left + triggerRect.width / 2 - panelRect.width / 2;

  left = Math.max(margin, Math.min(left, vw - panelRect.width - margin));
  return { top: Math.round(top), left: Math.round(left), side, align };
}

/**
 * Popover / gaveta reutilizável.
 *
 * Props:
 *  - trigger:     elemento que abre o painel (ex.: <button className="mp-icon-btn">⋮</button>)
 *  - children:    conteúdo (nós ou função ({ close }) => nós)
 *  - mode:        "click" (padrão) | "hover"
 *  - placement:   "bottom-end" (padrão) | "bottom-start" | "bottom" | "top-end" | "top-start" | "top"
 *  - width:       "auto" (ajusta ao conteúdo) | número (px) | string CSS
 *  - minWidth / maxWidth / maxHeight: limites do painel (px ou string CSS)
 *  - offset:      distância do gatilho em px
 *  - hoverDelay:  atraso para fechar no modo hover (ms)
 *  - role:        "menu" (padrão, para listas de ações) | "dialog" (para conteúdo livre, ex.: notificações)
 *  - onOpenChange: callback (aberto: boolean)
 */
export default function Popover({
  trigger,
  children,
  mode = "click",
  placement = "bottom-end",
  offset = 8,
  width = "auto",
  minWidth = 200,
  maxWidth = 360,
  maxHeight = 420,
  hoverDelay = 120,
  role = "menu",
  disabled = false,
  className = "",
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const timerRef = useRef(null);
  const panelId = useId();

  const setOpenState = useCallback(
    (value) => {
      setOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  const close = useCallback(() => setOpenState(false), [setOpenState]);

  const updatePosition = useCallback(() => {
    const trg = wrapperRef.current;
    const panel = panelRef.current;
    if (!trg || !panel) return;
    const next = computePosition(
      trg.getBoundingClientRect(),
      panel.getBoundingClientRect(),
      placement,
      offset,
    );
    setPos((prev) =>
      prev &&
      prev.top === next.top &&
      prev.left === next.left &&
      prev.side === next.side
        ? prev
        : next,
    );
  }, [placement, offset]);

  // Posiciona ao abrir e reposiciona quando a janela/conteúdo muda de tamanho
  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    let observer;
    if (typeof ResizeObserver !== "undefined" && panelRef.current) {
      observer = new ResizeObserver(updatePosition);
      observer.observe(panelRef.current);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      observer?.disconnect();
    };
  }, [open, updatePosition]);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (wrapperRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  // Foco no painel ao abrir (modo clique) para permitir navegação por teclado
  useEffect(() => {
    if (open && pos && mode === "click") {
      panelRef.current?.focus({ preventScroll: true });
    }
    // só na primeira vez que o painel fica posicionado
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, pos === null]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const openNow = () => {
    clearTimeout(timerRef.current);
    if (!disabled) setOpenState(true);
  };
  const closeLater = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpenState(false), hoverDelay);
  };

  const returnFocus = () => {
    wrapperRef.current?.querySelector("button, [href], [tabindex]")?.focus();
  };

  const handlePanelKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      returnFocus();
      return;
    }
    if (e.key === "Tab") {
      close();
      return;
    }
    if (role !== "menu") return;

    const items = Array.from(
      panelRef.current.querySelectorAll('[role="menuitem"]:not([disabled])'),
    );
    if (!items.length) return;
    const index = items.indexOf(document.activeElement);
  };

  const wrapperHandlers =
    mode === "hover"
      ? {
          onMouseEnter: openNow,
          onMouseLeave: closeLater,
          onFocus: openNow,
          onBlur: (e) => {
            if (!panelRef.current?.contains(e.relatedTarget)) closeLater();
          },
        }
      : {
          onClick: () => {
            if (disabled) return;
            setOpenState(!open);
          },
          onKeyDown: (e) => {
            if (e.key === "ArrowDown" && !open && !disabled) {
              e.preventDefault();
              setOpenState(true);
            }
          },
        };

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger, {
        "aria-haspopup": role === "menu" ? "menu" : "dialog",
        "aria-expanded": open,
        "aria-controls": open ? panelId : undefined,
      })
    : trigger;

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  const panelStyle = {
    top: pos?.top ?? 0,
    left: pos?.left ?? 0,
    visibility: pos ? "visible" : "hidden",
    width: width === "auto" ? "max-content" : toCss(width),
    minWidth: toCss(minWidth),
    maxWidth: `min(${toCss(maxWidth)}, calc(100vw - 16px))`,
    maxHeight: `min(${toCss(maxHeight)}, calc(100vh - 16px))`,
  };

  return (
    <>
      <span ref={wrapperRef} className="mp-trigger" {...wrapperHandlers}>
        {triggerNode}
      </span>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role={role}
            tabIndex={-1}
            className={`mp-popover ${className}`}
            data-side={pos?.side}
            data-align={pos?.align}
            style={panelStyle}
            onKeyDown={handlePanelKeyDown}
            onMouseEnter={mode === "hover" ? openNow : undefined}
            onMouseLeave={mode === "hover" ? closeLater : undefined}
          >
            <PopoverContext.Provider value={{ close }}>
              {typeof children === "function" ? children({ close }) : children}
            </PopoverContext.Provider>
          </div>,
          document.body,
        )}
    </>
  );
}

/* ---------- Peças auxiliares ---------- */

export function PopoverItem({
  icon,
  children,
  onClick,
  danger = false,
  disabled = false,
  closeOnSelect = true,
}) {
  const { close } = useContext(PopoverContext);
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={`mp-item${danger ? " mp-item--danger" : ""}`}
      onClick={(e) => {
        onClick?.(e);
        if (closeOnSelect) close();
      }}
    >
      {icon && <span className="mp-item__icon">{icon}</span>}
      <span className="mp-item__label">{children}</span>
    </button>
  );
}

export function PopoverDivider() {
  return <div className="mp-divider" role="separator" />;
}

export function PopoverHeader({ title, action }) {
  return (
    <div className="mp-header">
      <strong className="mp-header__title">{title}</strong>
      {action}
    </div>
  );
}
