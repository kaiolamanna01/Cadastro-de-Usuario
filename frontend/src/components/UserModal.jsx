import { useState } from "react";
import { theme } from "../styles/global";
import { api } from "../services/usuarioApi";
import Button from "./Button";
import Field from "./Field";

export default function UserModal({ user, onClose, onSave }) {
  const isEdit = !!(user?.Id ?? user?.id);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", ...(user || {}) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) await api.update(user.Id ?? user.id, form);
      else        await api.create(form);
      onSave();
    } catch {
      setError("Falha ao salvar. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="fade-in" style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 32,
        width: "100%", maxWidth: 420,
        boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${theme.border}`,
      }}>
        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 4 }}>
              {isEdit ? "Editar" : "Novo usuário"}
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>
              {isEdit ? form.nome || "Usuário" : "Criar conta"}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: theme.textMuted, fontSize: 20, lineHeight: 1,
          }}>×</button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Nome completo" name="nome"  value={form.nome}  onChange={handleChange} required />
          <Field label="E-mail"        name="email" value={form.email} onChange={handleChange} type="email"    required />
          <Field label="Senha"         name="senha" value={form.senha} onChange={handleChange} type="password" required />

          {error && (
            <p style={{ fontSize: 12, color: theme.danger, background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px" }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 8, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" loading={loading}>
              {isEdit ? "Salvar alterações" : "Criar usuário"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
