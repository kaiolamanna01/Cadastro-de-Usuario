import { useState } from "react";
import { api } from "./services/usuarioApi";
import { theme } from "./styles/global";

export default function LoginPage({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [senha, setSenha]     = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, senha);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        setError("Email ou senha inválidos.");
      }
    } catch {
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: theme.background, padding: 24,
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: theme.surface, border: `1px solid ${theme.border}`,
        borderRadius: 16, padding: 40,
      }}>
        <h2 style={{ color: theme.text, marginBottom: 8, fontSize: 24, fontWeight: 800 }}>
          Bem-vindo de volta
        </h2>
        <p style={{ color: theme.textMuted, fontSize: 13, marginBottom: 28 }}>
          Faça login para continuar
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "12px 14px", background: theme.background,
              border: `1px solid ${theme.border}`, borderRadius: 10,
              color: theme.text, outline: "none", fontSize: 14,
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              padding: "12px 14px", background: theme.background,
              border: `1px solid ${theme.border}`, borderRadius: 10,
              color: theme.text, outline: "none", fontSize: 14,
            }}
          />

          {error && (
            <p style={{ color: theme.danger, fontSize: 13, margin: 0 }}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "13px", background: theme.accent, border: "none",
              borderRadius: 10, color: "#fff", cursor: "pointer",
              fontWeight: 700, fontSize: 14, marginTop: 4,
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}