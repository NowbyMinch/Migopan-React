import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../utils/errorHandler";

const API_URL = "http://localhost:8080/api";
// Em produção use wss:// (HTTPS). Com Vite: import.meta.env.VITE_WS_URL
const WS_URL = "ws://localhost:8080/api/ws";
const TAMANHO_PAGINA = 30;

// Junta listas sem duplicar (pelo id) e em ordem cronológica.
// Necessário porque a mesma mensagem pode chegar pelo histórico REST e pelo WebSocket.
function mesclar(atuais, novas) {
  const porId = new Map();
  [...atuais, ...novas].forEach((m) => porId.set(m.id, m));
  return [...porId.values()].sort((a, b) => a.id - b.id);
}

export function useChatGrupo(grupoId) {
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [conectado, setConectado] = useState(false);
  const [temMais, setTemMais] = useState(false);
  const [erro, setErro] = useState("");
  const clientRef = useRef(null);

  const buscarPagina = useCallback(
    async (antesDe) => {
      const params = new URLSearchParams({ limite: TAMANHO_PAGINA });
      if (antesDe) params.set("antesDe", antesDe);

      const res = await fetch(
        `${API_URL}/grupos/${grupoId}/mensagens?${params}`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error(await getErrorMessage(res));
      return res.json();
    },
    [grupoId],
  );

  // 1) Histórico inicial (REST)
  useEffect(() => {
    if (!grupoId) return;
    let ativo = true;

    setCarregando(true);
    setMensagens([]);
    setTemMais(false);

    buscarPagina()
      .then((pagina) => {
        if (!ativo) return;
        setMensagens((anteriores) => mesclar(anteriores, pagina));
        setTemMais(pagina.length === TAMANHO_PAGINA);
      })
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setCarregando(false));

    return () => {
      ativo = false;
    };
  }, [grupoId, buscarPagina]);

  // 2) Tempo real (STOMP sobre WebSocket)
  useEffect(() => {
    if (!grupoId) return;

    let jaConectouAntes = false;

    const client = new Client({
      brokerURL: WS_URL, // o cookie "token" vai junto no handshake: não precisa mandar JWT à mão
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        setConectado(true);
        setErro("");

        client.subscribe(`/topic/grupos/${grupoId}/mensagens`, (frame) => {
          const nova = JSON.parse(frame.body);
          setMensagens((anteriores) => mesclar(anteriores, [nova]));
        });

        client.subscribe("/user/queue/erros", (frame) => {
          setErro(JSON.parse(frame.body).mensagem);
        });

        // Depois de uma queda, busca o que foi enviado enquanto estava offline
        if (jaConectouAntes) {
          buscarPagina()
            .then((pagina) =>
              setMensagens((anteriores) => mesclar(anteriores, pagina)),
            )
            .catch(() => {});
        }
        jaConectouAntes = true;
      },

      onWebSocketClose: () => setConectado(false),

      // Erro de protocolo (ex.: assinatura recusada): para de tentar para não ficar em loop
      onStompError: (frame) => {
        setErro(frame.headers["message"] || "Erro no chat.");
        client.deactivate();
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setConectado(false);
    };
  }, [grupoId, buscarPagina]);

  const enviar = useCallback(
    (texto) => {
      const limpo = texto.trim();
      const client = clientRef.current;
      if (!limpo || !client?.connected) return false;

      setErro("");
      client.publish({
        destination: `/app/grupos/${grupoId}/mensagens`,
        body: JSON.stringify({ texto: limpo }),
      });
      return true;
    },
    [grupoId],
  );

  const carregarMais = useCallback(async () => {
    if (mensagens.length === 0) return;
    try {
      const pagina = await buscarPagina(mensagens[0].id);
      setMensagens((anteriores) => mesclar(anteriores, pagina));
      setTemMais(pagina.length === TAMANHO_PAGINA);
    } catch (e) {
      setErro(e.message);
    }
  }, [buscarPagina, mensagens]);

  return {
    mensagens,
    carregando,
    conectado,
    temMais,
    erro,
    enviar,
    carregarMais,
    limparErro: () => setErro(""),
  };
}
