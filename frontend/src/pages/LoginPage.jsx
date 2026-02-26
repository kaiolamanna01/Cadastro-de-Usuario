import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://backend-cadastro-production.up.railway.app";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        setError("Email ou senha inválidos.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      onLogin();
    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0f0f11;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        .login-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .login-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at center, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 400px;
          padding: 40px 36px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .login-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7c3aed;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .login-badge span {
          font-size: 11px;
          color: #7c3aed;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f1f1f3;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .login-title span {
          color: #7c3aed;
        }

        .login-subtitle {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .login-label {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .login-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f1f1f3;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          margin-bottom: 16px;
        }

        .login-input:focus {
          border-color: #7c3aed;
          background: rgba(124, 58, 237, 0.06);
        }

        .login-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .login-error {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12px;
          color: #ef4444;
          margin-bottom: 16px;
          animation: fadeUp 0.2s ease both;
        }

        .login-btn {
          width: 100%;
          padding: 13px;
          background: #7c3aed;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s;
          margin-top: 4px;
        }

        .login-btn:hover:not(:disabled) {
          background: #6d28d9;
        }

        .login-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="login-root">
        <div className="login-grid" />
        <div className="login-glow" />

        <div className="login-card">
          <div className="login-badge">
            <div className="login-dot" />
            <span>Gerenciamento · Railway</span>
          </div>

          <h1 className="login-title">
            Bem-vindo de<br />
            <span>volta</span>
          </h1>
          <p className="login-subtitle">
            Acesse o painel de gerenciamento de usuários
          </p>

          <form onSubmit={handleSubmit}>
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />

            <label className="login-label">Senha</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />

            {error && <div className="login-error">{error}</div>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <div className="login-footer">
            by Kaio Lamanna
          </div>
        </div>
      </div>
    </>
  );
}
