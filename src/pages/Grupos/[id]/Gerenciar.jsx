import { useOutletContext } from "react-router-dom";
import "../../../css/gerenciar.css";
import VerMais from "../../../components/VerMais/VerMais";
import { useEffect, useState } from "react";
import ModalAdicionarMembro from "../../../components/ModalAdicionarMembro/ModalAdicionarMembro";
import Popover, { PopoverItem } from "../../../components/PopOver/Popover";

export default function Gerenciar() {
  const { grupo, membros, usuario, recarregarMembros } = useOutletContext();
  const [adicionarMembro, setAdicionarMembro] = useState(false);
  const [verMaisMembros, setVerMaisMembros] = useState(false);

  // const alterarCargo = async (e, ) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg("");

  //   const cadastroPayload = {
  //     usuarioId: nome,
  //     email: email,
  //     senha: senha,
  //   };

  //   try {
  //     const res = await fetch(`${API_URL}/usuarios`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cadastroPayload),
  //     });

  //     if (!res.ok) {
  //       const mensagem = await getErrorMessage(res);
  //       throw new Error(mensagem);
  //     }

  //     const resLogin = await fetch(`${API_URL}/auth/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: cadastroPayload.email,
  //         senha: cadastroPayload.senha,
  //       }),
  //       credentials: "include",
  //     });

  //     if (!resLogin.ok) {
  //       const mensagemLogin = await getErrorMessage(resLogin);
  //       throw new Error(
  //         mensagemLogin || "Cadastro realizado, mas falha ao fazer login.",
  //       );
  //     } else {
  //       window.location.href = "/home";
  //     }
  //   } catch (err) {
  //     console.error("Erro na requisição:", err.message);
  //     setErrorMsg(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!usuario) return;
  }, [usuario]);

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

      <div className="gradient-card membros-lista">
        <div className="membros-lista-header">
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
            <span>+</span> Adicionar Membro
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
                    class="bi bi-crown subtitle-generic"
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
                        class="bi bi-three"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      </svg>
                    </button>
                  }
                  placement="bottom-end"
                >
                  <PopoverItem
                    // icon={<CrownIcon />}
                    onClick={() => alterarCargo(membro)}
                  >
                    Tornar{" "}
                    {membro.papel === "ADMIN" ? "administrador" : "membro"}
                  </PopoverItem>
                  <PopoverItem
                    // icon={<TrashIcon />}
                    danger
                    onClick={() => remover(membro)}
                  >
                    Remover do grupo
                  </PopoverItem>
                </Popover>
                // <button className="opcao-membro gradient-card">
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="currentColor"
                //   class="bi bi-three"
                //   viewBox="0 0 16 16"
                // >
                //   <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                // </svg>
                // </button>
              )}
            </div>
          ))}
          {membros.length > 5 ? (
            <button
              onClick={() => {
                setVerMaisMembros(true);
                membrosGrupo(membros);
              }}
            >
              Ver mais
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="gradient-card membros-lista">
        <div className="membros-lista-header">
          <div className="gerenciar-grupo-titulo">
            <div className="icon-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-gerenciar"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <h1 className="title-generic">Configurações do Grupo</h1>
            </div>
            <h2 className="subtitle-generic">
              Personalize as informações e preferências do grupo.
            </h2>
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
      <VerMais
        isOpen={verMaisMembros}
        lista={membros}
        onClose={() => {
          setVerMaisMembros(false);
        }}
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
