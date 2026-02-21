<<<<<<< HEAD
import { useState } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    const usuario = {
      nome,
      email,
      senha,
    };

    await fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    alert("Usuário cadastrado!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={cadastrarUsuario}>
        <div>
          <label>Nome:</label>
          <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha:</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <br />
        <button type="submit">Cadastrar</button>
      </form>
=======
import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:8080/usuario";

const theme = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a26",
  border: "#1e1e2e",
  accent: "#6c63ff",
  accentHover: "#8a84ff",
  accentGlow: "rgba(108, 99, 255, 0.3)",
  success: "#22c55e",
  danger: "#ef4444",
  dangerHover: "#f87171",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#94a3b8",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${theme.bg};
    color: ${theme.text};
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 ${theme.accentGlow}; }
    50%       { box-shadow: 0 0 0 8px transparent; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .fade-in { animation: fadeIn 0.35s ease both; }
  .slide-in { animation: slideIn 0.3s ease both; }

  input, select {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.bg}; }
  ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
`;

// ─── API helpers ────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const api = {
  list:   ()           => apiFetch(`${API_BASE}/lista`),
  get:    (email)      => apiFetch(`${API_BASE}?email=${encodeURIComponent(email)}`),
  create: (data)       => apiFetch(API_BASE, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)   => apiFetch(API_BASE, { method: "PUT", body: JSON.stringify({ ...data, id }) }),
  delete: (email)      => apiFetch(`${API_BASE}?email=${encodeURIComponent(email)}`, { method: "DELETE" }),
};

// ─── Sub-components ─────────────────────────────────────────────

function Spinner() {
  return (
    <div style={{
      width: 18, height: 18,
      border: `2px solid ${theme.border}`,
      borderTopColor: theme.accent,
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      display: "inline-block",
    }} />
  );
}

function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const color = type === "success" ? theme.success : theme.danger;
  return (
    <div className="slide-in" style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 1000,
      background: theme.surface,
      border: `1px solid ${color}`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 10,
      padding: "12px 20px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
      fontSize: 14,
      maxWidth: 320,
    }}>
      <span style={{ color, fontSize: 18 }}>{type === "success" ? "✓" : "✕"}</span>
      <span style={{ color: theme.textDim }}>{message}</span>
>>>>>>> d8f32c8 (Introduzinho Frotnend)
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
function Badge({ count }) {
  return (
    <span style={{
      background: theme.accent,
      color: "#fff",
      fontSize: 11,
      fontFamily: "'DM Mono', monospace",
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 20,
      marginLeft: 8,
    }}>{count}</span>
  );
}

function Avatar({ name }) {
  const initials = name
    ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const hue = name
    ? name.charCodeAt(0) * 37 % 360
    : 200;
  return (
    <div style={{
      width: 38, height: 38,
      borderRadius: "50%",
      background: `hsl(${hue}, 55%, 35%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, color: "#fff",
      flexShrink: 0,
      border: `2px solid hsl(${hue}, 55%, 25%)`,
    }}>{initials}</div>
  );
}

function Button({ children, onClick, variant = "default", size = "md", loading, disabled, style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "none", cursor: disabled || loading ? "not-allowed" : "pointer",
    borderRadius: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600,
    transition: "all 0.18s ease",
    opacity: disabled || loading ? 0.6 : 1,
    ...style,
  };
  const sizes = { sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "9px 18px", fontSize: 13 } };
  const variants = {
    primary:  { background: theme.accent, color: "#fff" },
    danger:   { background: theme.danger, color: "#fff" },
    ghost:    { background: "transparent", color: theme.textDim, border: `1px solid ${theme.border}` },
    default:  { background: theme.surface, color: theme.textDim, border: `1px solid ${theme.border}` },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          if (variant === "primary") e.currentTarget.style.background = theme.accentHover;
          if (variant === "danger")  e.currentTarget.style.background = theme.dangerHover;
          if (variant === "ghost" || variant === "default") e.currentTarget.style.background = theme.surfaceHover;
        }
      }}
      onMouseLeave={e => {
        if (variant === "primary") e.currentTarget.style.background = theme.accent;
        if (variant === "danger")  e.currentTarget.style.background = theme.danger;
        if (variant === "ghost" || variant === "default") e.currentTarget.style.background = "transparent";
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}{required && <span style={{ color: theme.accent }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          background: theme.bg,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: "9px 14px",
          color: theme.text,
          outline: "none",
          transition: "border-color 0.18s",
          width: "100%",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = theme.accent; }}
        onBlur={e => { e.currentTarget.style.borderColor = theme.border; }}
      />
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────
function UserModal({ user, onClose, onSave }) {
  const isEdit = !!(user?.Id ?? user?.id);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", ...(user || {}) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (isEdit) await api.update(user.Id ?? user.id, form);
      else        await api.create(form);
      onSave();
    } catch (err) {
      setError("Falha ao salvar. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fade-in" style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 32,
        width: "100%", maxWidth: 420,
        boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${theme.border}`,
      }}>
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Nome completo" name="nome" value={form.nome} onChange={handleChange} required />
          <Field label="E-mail" name="email" value={form.email} onChange={handleChange} type="email" required />
          <Field label="Senha" name="senha" value={form.senha} onChange={handleChange} type="password" required />

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

// ─── Delete confirm ──────────────────────────────────────────────
function DeleteConfirm({ user, onClose, onConfirm, loading }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div className="fade-in" style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 32, maxWidth: 380, width: "100%",
        boxShadow: `0 24px 64px rgba(0,0,0,0.6)`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Excluir usuário?</h3>
        <p style={{ color: theme.textMuted, fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
          Você está prestes a excluir <strong style={{ color: theme.text }}>{user?.nome}</strong>. Esta ação não pode ser desfeita.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>Excluir</Button>
        </div>
      </div>
    </div>
  );
}

// ─── User Row ────────────────────────────────────────────────────
function UserRow({ user, onEdit, onDelete, index }) {
  return (
    <div className="fade-in" style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: "14px 20px",
      background: theme.surface,
      border: `1px solid ${theme.border}`,
      borderRadius: 12,
      transition: "all 0.18s ease",
      animationDelay: `${index * 0.05}s`,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.background = theme.surfaceHover; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.surface; }}
    >
      <Avatar name={user.nome} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: theme.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {user.nome}
        </p>
        <p style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {user.email}
        </p>
      </div>
      <span style={{
        fontSize: 10, fontFamily: "'DM Mono', monospace",
        color: theme.textMuted, background: theme.bg,
        border: `1px solid ${theme.border}`,
        padding: "3px 8px", borderRadius: 6,
      }}>#{user.id}</span>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <Button size="sm" variant="ghost" onClick={() => onEdit(user)}>✏️ Editar</Button>
        <Button size="sm" variant="ghost" onClick={() => onDelete(user)} style={{ color: theme.danger }}>🗑 Excluir</Button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [search, setSearch]         = useState("");
  const [modal, setModal]           = useState(null); // null | { type: 'create' | 'edit', user? }
  const [deleteTarget, setDelTarget] = useState(null);
  const [deleteLoading, setDelLoad] = useState(false);
  const [toast, setToast]           = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const showToast = (message, type = "success") => setToast({ message, type });

  const loadUsers = useCallback(async () => {
    setLoading(true); setFetchError(false);
    try {
      const data = await api.list();
      setUsers(data || []);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleSave = async () => {
    setModal(null);
    await loadUsers();
    showToast(modal?.user?.id ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
  };

  const handleDeleteConfirm = async () => {
    setDelLoad(true);
    try {
      await api.delete(deleteTarget.email);
      setDelTarget(null);
      await loadUsers();
      showToast("Usuário excluído.", "success");
    } catch {
      showToast("Erro ao excluir usuário.", "error");
    } finally {
      setDelLoad(false);
    }
  };

  const filtered = users.filter(u =>
    (u.nome?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <>
      <style>{globalStyles}</style>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.25,
      }} />

      {/* Accent glow */}
      <div style={{
        position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 700, height: 400,
        background: `radial-gradient(ellipse at center, ${theme.accentGlow} 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div className="fade-in" style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: theme.accent,
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: 11, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
              API · localhost:8080
            </span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 6 }}>
            Gerenciamento<br />
            <span style={{ color: theme.accent }}>de Usuários</span>
          </h1>
          <p style={{ color: theme.textMuted, fontSize: 14 }}>
            CRUD integrado com Spring Boot REST API
          </p>
        </div>

        {/* Toolbar */}
        <div className="fade-in" style={{
          display: "flex", gap: 12, alignItems: "center",
          marginBottom: 24,
          animationDelay: "0.1s",
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: theme.textMuted, fontSize: 14 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail…"
              style={{
                width: "100%", padding: "10px 14px 10px 40px",
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 10, color: theme.text,
                outline: "none", transition: "border-color 0.18s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = theme.accent; }}
              onBlur={e => { e.currentTarget.style.borderColor = theme.border; }}
            />
          </div>
          <Button variant="ghost" onClick={loadUsers} loading={loading}>↻</Button>
          <Button variant="primary" onClick={() => setModal({ type: "create" })}>
            + Novo usuário
          </Button>
        </div>

        {/* Stats bar */}
        <div className="fade-in" style={{
          display: "flex", gap: 2, alignItems: "center",
          marginBottom: 16, animationDelay: "0.15s",
        }}>
          <span style={{ fontSize: 12, color: theme.textMuted }}>
            {loading ? "Carregando…" : `${filtered.length} usuário${filtered.length !== 1 ? "s" : ""}`}
          </span>
          {search && <span style={{ fontSize: 12, color: theme.accent, marginLeft: 4 }}>(filtrado de {users.length})</span>}
        </div>

        {/* Error state */}
        {fetchError && (
          <div className="fade-in" style={{
            background: "rgba(239,68,68,0.08)",
            border: `1px solid ${theme.danger}`,
            borderRadius: 12, padding: "20px 24px",
            marginBottom: 20,
          }}>
            <p style={{ fontWeight: 700, color: theme.danger, marginBottom: 4 }}>Não foi possível conectar à API</p>
            <p style={{ fontSize: 13, color: theme.textMuted }}>
              Certifique-se de que o backend está rodando em <code style={{ color: theme.accent }}>http://localhost:8080</code> e que o CORS está habilitado.
            </p>
          </div>
        )}

        {/* User list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {loading && users.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: theme.textMuted }}>
              <Spinner />
              <p style={{ marginTop: 12, fontSize: 13 }}>Carregando usuários…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="fade-in" style={{
              textAlign: "center", padding: "60px 0",
              color: theme.textMuted, fontSize: 14,
              border: `1px dashed ${theme.border}`,
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>👤</div>
              {search ? "Nenhum usuário encontrado para essa busca." : "Nenhum usuário cadastrado ainda."}
            </div>
          ) : (
            filtered.map((u, i) => (
              <UserRow
                key={u.id}
                user={u}
                index={i}
                onEdit={u => setModal({ type: "edit", user: u })}
                onDelete={u => setDelTarget(u)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Mono', monospace" }}>
            by Kaio Lamanna
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {["POST /usuarios", "GET /usuarios", "PUT /{id}", "DELETE /{id}"].map(ep => (
              <span key={ep} style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'DM Mono', monospace" }}>{ep}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <UserModal
          user={modal.user}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          user={deleteTarget}
          onClose={() => setDelTarget(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </>
  );
}
>>>>>>> d8f32c8 (Introduzinho Frotnend)
