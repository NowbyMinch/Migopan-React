import { useOutletContext } from "react-router-dom";
import "../../../css/gerenciar.css";
import VerMais from "../../../components/VerMais/VerMais";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalAdicionarMembro from "../../../components/ModalAdicionarMembro/ModalAdicionarMembro";
import Popover, { PopoverItem } from "../../../components/PopOver/Popover";
import { getErrorMessage } from "../../../utils/errorHandler";

import "../../../css/gerenciar.css";

export default function Gerenciar() {
  const { grupo, membros, usuario, recarregarMembros, recarregarGrupo } =
    useOutletContext();
  const [adicionarMembro, setAdicionarMembro] = useState(false);
  const [verMaisMembros, setVerMaisMembros] = useState(false);
  const [deletar, setDeletar] = useState(false);

  const API_URL = `http://localhost:8080/api/grupos`;
  // Membros
  const alterarCargo = async (usuarioId, papel, bloqueado) => {
    try {
      // PapelGrupo papel, Boolean bloqueado
      const res = await fetch(`${API_URL}/${grupo.id}/membros/${usuarioId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ papel, bloqueado }),
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao atualizar o membro.");
      }
      recarregarMembros();
    } catch (err) {
      console.error("Erro na requisição:", err.message);
    }
  };

  const removerMembro = async (usuarioId) => {
    try {
      const res = await fetch(`${API_URL}/${grupo.id}/membros/${usuarioId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao remover o membro.");
      }

      recarregarMembros();
    } catch (err) {
      console.error("Erro na requisição:", err.message);
    }
  };

  // Configurações do Grupo

  const CORES = [
    { id: "roxo", nome: "Roxo", valor: "#7c3aed" },
    { id: "rosa", nome: "Rosa", valor: "#c93c94" },
    {
      id: "degrade",
      nome: "Vermelho e azul",
      valor: "linear-gradient(160deg, #ff4d63 0%, #ff4d63 45%, #3b82f6 100%)",
    },
    { id: "laranja", nome: "Laranja", valor: "#f08a00" },
    { id: "verde", nome: "Verde", valor: "#2fc72f" },
    { id: "cinza", nome: "Cinza azulado", valor: "#4a5f85" },
  ];
  const PRIVACIDADES = [
    { id: "fechado", rotulo: "Grupo fechado" },
    { id: "aberto", rotulo: "Grupo aberto" },
  ];

  const [nome, setNome] = useState(grupo?.nome ?? "");
  const [descricao, setDescricao] = useState(grupo?.descricao ?? "");
  const [cor, setCor] = useState(grupo?.cor ?? "roxo");
  const [privacidade, setPrivacidade] = useState(
    grupo?.privacidade ?? "fechado",
  );
  const [menuPrivacidade, setMenuPrivacidade] = useState(false);
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(grupo?.imagemUrl ?? null);
  const inputArquivoRef = useRef(null);
  const privacidadeRef = useRef(null);

  const escolherImagem = (e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setArquivoImagem(arquivo);
    setPreviewImagem(URL.createObjectURL(arquivo));
  };

  const salvarConfiguracoes = async (e) => {
    e.preventDefault();
    const configuracoesPayload = { nome, descricao };

    try {
      const res = await fetch(`${API_URL}/${grupo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(configuracoesPayload),
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao atualizar o membro.");
      }
      recarregarGrupo({ silencioso: true });
    } catch (err) {
      console.error("Erro na requisição:", err.message);
    }
  };

  const deletarGrupo = async () => {
    try {
      const res = await fetch(`${API_URL}/${grupo.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const mensagem = await getErrorMessage(res);
        throw new Error(mensagem || "Falha ao atualizar o membro.");
      } else {
        window.location.href = "/grupos";
      }
    } catch (err) {
      console.error("Erro na requisição:", err.message);
    }
  };

  return (
    <div className="gerenciar-grupo-container">
      <div className="gerenciar-grupo-titulo">
        <div className="icon-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-gerenciar"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
          <h1 className="title-generic">Gerenciar grupo</h1>
        </div>
        <h2 className="subtitle-generic">
          Administre os membros e as configurações do grupo.
        </h2>
      </div>

      <div className="gradient-card gerenciar-container">
        <div className="gerenciar-container-header">
          <div className="gerenciar-grupo-titulo">
            <div className="icon-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#1cb0f6"
                className="bi bi-grupos-active"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
              <h1 className="title-generic">Gerenciar grupo</h1>
            </div>
            <h2 className="subtitle-generic">
              Administre os membros e as configurações do grupo.
            </h2>
          </div>
          <button
            className="gerenciar-botao"
            onClick={() => setAdicionarMembro(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            Adicionar Membro
          </button>
        </div>

        <span className="title-generic">
          {grupo?.quantidadeMembros || 1} membro
          {grupo?.quantidadeMembros > 1 ? "s" : ""}
        </span>

        <div className="membro-card">
          {membros.slice(0, 5).map((membro, index) => (
            <div key={index} className="membro-grupo-gerenciar">
              <div className="membro-imagem">
                <img src="/img/iconemigo.png" alt="" />
              </div>
              <span className="title-generic">{membro.nomeUsuario}</span>
              <div
                className="membro-cargo "
                style={
                  membro.papel === "ADMIN"
                    ? { backgroundColor: "rgba(82, 32, 157, 0.31)" }
                    : { backgroundColor: "rgba(166, 18, 26, 0.31)" }
                }
              >
                {membro.papel === "ADMIN" && (
                  <svg
                    xmlns="http://w3.org"
                    fill="currentColor"
                    className="bi bi-crown subtitle-generic"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 4l2.5 3L8 3l3.5 4L14 4v9H2V4zm0 10h12v1H2v-1z" />
                  </svg>
                )}

                <span className="subtitle-generic">
                  {membro.papel.charAt(0) + membro.papel.slice(1).toLowerCase()}
                </span>
              </div>
              {usuario && membro?.usuarioId !== usuario?.id && (
                <Popover
                  trigger={
                    <button
                      type="button"
                      className="opcao-membro gradient-card"
                      aria-label={`Opções de ${membro.nome}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-three"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      </svg>
                    </button>
                  }
                  placement="bottom-end"
                >
                  <PopoverItem
                    onClick={() => {
                      if (membro.papel === "ADMIN") {
                        alterarCargo(membro.usuarioId, "MEMBRO", false);
                      } else {
                        alterarCargo(membro.usuarioId, "ADMIN", false);
                      }
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Tornar</span>
                    {membro.papel === "ADMIN" ? "membro" : "administrador"}
                  </PopoverItem>
                  <PopoverItem
                    danger
                    onClick={() => removerMembro(membro.usuarioId)}
                  >
                    Remover do grupo
                  </PopoverItem>
                </Popover>
                // <button className="opcao-membro gradient-card">
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="currentColor"
                //   className="bi bi-three"
                //   viewBox="0 0 16 16"
                // >
                //   <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                // </svg>
                // </button>
              )}
            </div>
          ))}
          {membros.length > 5 && (
            <button
              onClick={() => {
                setVerMaisMembros(true);
                membrosGrupo(membros);
              }}
            >
              Ver mais
            </button>
          )}
        </div>
      </div>

      <div className="gradient-card gerenciar-container">
        <div className="gerenciar-container-header">
          <div className="gerenciar-grupo-titulo">
            <div className="icon-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-gerenciar"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <h1 className="title-generic">Configurações do Grupo</h1>
            </div>
            <h2 className="subtitle-generic">
              Personalize as informações e preferências do grupo.
            </h2>

            <form
              className="gerenciar-config-corpo"
              onSubmit={salvarConfiguracoes}
            >
              {/* Imagem */}
              <div className="gerenciar-imagem-grupo">
                {previewImagem ? (
                  <img src={previewImagem} alt="Imagem do grupo" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
                  </svg>
                )}
                <button
                  type="button"
                  className="gerenciar-imagem-editar"
                  aria-label="Alterar imagem do grupo"
                  onClick={() => inputArquivoRef.current?.click()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
                <input
                  ref={inputArquivoRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={escolherImagem}
                />
              </div>

              <div className="gerenciar-campos">
                <div className="gerenciar-nome-grupo">
                  <label htmlFor="grupo-nome title-generic">
                    Nome do grupo
                  </label>
                  <input
                    id="grupo-nome"
                    type="text"
                    value={nome}
                    maxLength={60}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="gerenciar-descricao-grupo">
                  <label htmlFor="grupo-descricao title-generic">
                    Descrição
                  </label>
                  <div className="gerenciar-descricao-wrap">
                    <textarea
                      id="grupo-descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                    {/* <span className="gerenciar-contador">
                      {descricao.length}/200
                    </span> */}
                  </div>
                </div>
                <button type="submit" className="gerenciar-botao">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                    <path d="M17 21v-8H7v8M7 3v5h8" />
                  </svg>
                  Salvar alterações
                </button>
              </div>

              {/* Cor, privacidade e salvar */}
              <div className="gerenciar-lateral">
                {/* <div className="gerenciar-cor-grupo">
                  <span className="gerenciar-rotulo" id="grupo-cor-rotulo">
                    Cor do grupo
                  </span>
                  <div
                    className="gerenciar-cores"
                    role="radiogroup"
                    aria-labelledby="grupo-cor-rotulo"
                  >
                    {CORES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={cor === c.id}
                        aria-label={c.nome}
                        title={c.nome}
                        className={`gerenciar-cor${cor === c.id ? " gerenciar-cor--ativa" : ""}`}
                        style={{ background: c.valor }}
                        onClick={() => setCor(c.id)}
                      />
                    ))}
                  </div>
                </div> */}

                <div className="gerenciar-privacidade-grupo">
                  {/* <span className="gerenciar-rotulo">Privacidade</span>

                  <div className="gerenciar-select-wrap" ref={privacidadeRef}>
                    <button
                      type="button"
                      className="gerenciar-select"
                      aria-haspopup="listbox"
                      aria-expanded={menuPrivacidade}
                      onClick={() => setMenuPrivacidade((v) => !v)}
                    >
                      <span className="gerenciar-select__icone">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 018 0v4" />
                        </svg>
                      </span>
                      <span className="gerenciar-select__texto">
                        {PRIVACIDADES.find((p) => p.id === privacidade).rotulo}
                      </span>
                      <span
                        className="gerenciar-select__seta"
                        aria-hidden="true"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    {menuPrivacidade && (
                      <ul className="gerenciar-select-menu" role="listbox">
                        {PRIVACIDADES.map((p) => (
                          <li
                            key={p.id}
                            role="option"
                            aria-selected={privacidade === p.id}
                          >
                            <button
                              type="button"
                              className={`gerenciar-select-opcao${privacidade === p.id ? " gerenciar-select-opcao--ativa" : ""}`}
                              onClick={() => {
                                setPrivacidade(p.id);
                                setMenuPrivacidade(false);
                              }}
                            >
                              {p.rotulo}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div> */}

                  {/* <button type="submit" className="gerenciar-botao">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                      <path d="M17 21v-8H7v8M7 3v5h8" />
                    </svg>
                    Salvar alterações
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="">
          <div className="gerenciar-imagem-grupo"></div>

          <div className="">
            <div className="gerenciar-nome-grupo">
              <label htmlFor=""></label>
              <input type="text" />
            </div>
          </div>

          <div className="">
            <div className="gerenciar-descricao-grupo">
              <label htmlFor=""></label>
              <input type="text" />
            </div>
          </div>

          <div className="gerenciar-privacidade-grupo">
            <button className="gerenciar-botao">Salvar alterações</button>
          </div>
        </div> */}
      </div>

      {/* Deletar Grupo */}
      <div className="deletar-card ">
        <div className="deletar-info">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-lixo"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
            <h1 className="">Excluir grupo</h1>
          </div>
          <h2 className="">Está ação não pode ser desfeita.</h2>
        </div>

        <button className="gerenciar-botao" onClick={() => setDeletar(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-lixo"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg>
          Excluir Grupo
        </button>
      </div>
      <VerMais
        isOpen={verMaisMembros}
        lista={membros}
        conteudo={"membros"}
        onClose={() => {
          setVerMaisMembros(false);
        }}
      />
      <VerMais
        isOpen={deletar}
        lista={[]}
        conteudo={"deletar"}
        onClose={() => {
          setDeletar(false);
        }}
        acao={deletarGrupo}
      />
      <ModalAdicionarMembro
        isOpen={adicionarMembro}
        onClose={() => setAdicionarMembro(false)}
        grupoId={grupo?.id}
        onMembroAdicionado={recarregarMembros}
      />
      {/* export default function ModalAdicionarMembro({
  isOpen,
  onClose,
  grupoId,
  onMembroAdicionado,
}) */}
    </div>
  );
}
