import React, { useState } from "react";
import { getErrorMessage } from "../../utils/errorHandler";
import "../../css/login.css";

// Caminhos das imagens a partir da pasta public/
const logoImg = "/img/logo.png";
const mascotHeaderImg = "/img/Migo.png";
const decorBottomImg = "/img/MigoLogin.png";

const API_URL = "http://localhost:8080/api/auth/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Corrigido: Declaração com const
    const loginPayload = {
      email: email,
      senha: senha,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginPayload),
      });

        if (!res.ok) {
            const mensagem = await getErrorMessage(res);
            throw new Error(mensagem);
      }

      window.location.href = "/home";
    } catch (err) {
      // 2. Corrigido: Captura de err e atualização do estado de erro
      console.error("Erro na requisição:", err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header-logo">
        {logoImg ? (
          <img src={logoImg} alt="Migopan Logo" className="brand-logo" />
        ) : (
          <div className="img-placeholder logo-placeholder">
            <span>Logo (Migopan)</span>
          </div>
        )}
      </header>

      <main className="login-card">
        <div className="card-header">
          <div className="mascot-wrapper">
            {mascotHeaderImg ? (
              <img src={mascotHeaderImg} alt="Mascote Migo" className="mascot-avatar" />
            ) : (
              <div className="img-placeholder mascot-placeholder">
                <span>Mascote Migo</span>
              </div>
            )}
          </div>
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para continuar</p>
        </div>

        {/* Banner de Mensagem de Erro */}
        {errorMsg && <div className="error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Digite seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              <span className="checkmark"></span>
              Lembrar de mim
            </label>
            <a href="/recuperar-senha" className="forgot-password">Esqueceu sua senha?</a>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            <span>{loading ? "Entrando..." : "Entrar"}</span>
            {!loading && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="btn-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </form>

        <div className="divider">
          <span>ou entre com</span>
        </div>

        <div className="social-login">
          <button type="button" className="social-btn facebook">
            <span className="social-icon fb-icon">f</span>
            <span>Entrar com Facebook</span>
          </button>
          <button type="button" className="social-btn google">
            <span className="social-icon google-icon">G</span>
            <span>Entrar com Google</span>
          </button>
        </div>

        <div className="card-footer">
          <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
        </div>
      </main>

      {/* 3. Ilustração de Fundo dos Mascotes */}
      <footer className="login-footer-decor">
        {decorBottomImg ? (
          <img src={decorBottomImg} alt="Ilustração Mascotes" className="bottom-mascots" />
        ) : (
          <div className="img-placeholder bottom-placeholder">
            <span>Ilustração Inferior dos Mascotes</span>
          </div>
        )}
      </footer>
    </div>
  );
}