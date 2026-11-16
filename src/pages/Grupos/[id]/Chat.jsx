import { useLayoutEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import "../../../css/chat.css";
import { useChatGrupo } from "../../../hooks/useChatGrupo";
import { useUsuarioLogado } from "../../../hooks/useUsuarioLogado";

const hora = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

export default function Chat() {
  const { grupo } = useOutletContext();
  const usuario = useUsuarioLogado();
  const chat = useChatGrupo(grupo.id);

  const [texto, setTexto] = useState("");
  const listaRef = useRef(null);
  const noFundoRef = useRef(true); // o usuário está lendo o fim da conversa?
  const ancoraRef = useRef(null); // distância até o fim, usada ao carregar mensagens antigas

  const aoRolar = () => {
    const el = listaRef.current;
    noFundoRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  // Rolagem: mantém no fim quando chega mensagem (se você já estava lá, ou se a mensagem é sua)
  // e preserva a posição quando mensagens antigas são inseridas no topo.
  useLayoutEffect(() => {
    const el = listaRef.current;
    if (!el) return;

    if (ancoraRef.current !== null) {
      el.scrollTop = el.scrollHeight - ancoraRef.current;
      ancoraRef.current = null;
      return;
    }

    const ultima = chat.mensagens[chat.mensagens.length - 1];
    if (noFundoRef.current || ultima?.usuarioId === usuario?.id) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chat.mensagens, usuario?.id]);

  const carregarAnteriores = () => {
    const el = listaRef.current;
    if (el) ancoraRef.current = el.scrollHeight - el.scrollTop;
    chat.carregarMais();
  };

  const enviar = () => {
    if (chat.enviar(texto)) setTexto("");
  };

  const aoSubmeter = (e) => {
    e.preventDefault();
    enviar();
  };

  // Enter envia; Shift+Enter quebra a linha
  const aoTeclar = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <div className="chat-grupo-container">
      <div className="chat-lista" ref={listaRef} onScroll={aoRolar}>
        {chat.temMais && (
          <button
            type="button"
            className="chat-mais"
            onClick={carregarAnteriores}
          >
            Carregar mensagens anteriores
          </button>
        )}

        {chat.carregando ? (
          <p className="chat-vazio">Carregando mensagens...</p>
        ) : chat.mensagens.length === 0 ? (
          <p className="chat-vazio">Nenhuma mensagem ainda. Diga olá! 👋</p>
        ) : (
          chat.mensagens.map((m, i) => {
            const minha = m.usuarioId === usuario?.id;
            const mostrarNome =
              !minha && chat.mensagens[i - 1]?.usuarioId !== m.usuarioId;

            return (
              <div
                key={m.id}
                className={`chat-linha ${minha ? "chat-linha--minha" : ""}`}
              >
                {minha ? (
                  ""
                ) : (
                  <div className="membro-imagem">
                    <img alt="" src="/img/iconemigo.png"></img>
                  </div>
                )}
                <div className="chat-balao">
                  {mostrarNome && (
                    <span className="chat-autor">{m.nomeUsuario}</span>
                  )}
                  <p>{m.texto}</p>
                  <time dateTime={m.dataEnvio}>{hora(m.dataEnvio)}</time>
                </div>
                {minha ? (
                  <div className="membro-imagem">
                    <img alt="" src="/img/iconemigo.png"></img>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })
        )}
      </div>

      {!chat.conectado && !chat.carregando && (
        <div className="chat-status">Reconectando ao chat...</div>
      )}

      {chat.erro && (
        <div className="chat-erro" role="alert">
          ⚠️ {chat.erro}
          <button
            type="button"
            onClick={chat.limparErro}
            aria-label="Fechar aviso"
          >
            ✕
          </button>
        </div>
      )}

      <form className="chat-form" onSubmit={aoSubmeter}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={aoTeclar}
          placeholder="Escreva uma mensagem..."
          rows={1}
          maxLength={2000}
          disabled={!chat.conectado}
        />
        <button type="submit" disabled={!chat.conectado || !texto.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}
