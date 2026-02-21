import { useState, useEffect, useCallback } from "react";
import { globalStyles, theme } from "./styles/global";
import { api } from "./services/usuarioApi";
import Spinner from "./components/Spinner";
import Toast from "./components/Toast";
import UserRow from "./components/UserRow";
import UserModal from "./components/UserModal";
import DeleteConfirm from "./components/DeleteConfirm";

// Hook para detectar largura da tela
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

export default function App() {
  const [users, setUsers]            = useState([]);
  const [loading, setLoading]        = useState(false);
  const [search, setSearch]          = useState("");
  const [modal, setModal]            = useState(null);
  const [deleteTarget, setDelTarget] = useState(null);
  const [deleteLoading, setDelLoad]  = useState(false);
  const [toast, setToast]            = useState(null);
  const [fetchError, setFetchError]  = useState(false);

  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width < 900;

  const showToast = (message, type = "success") => setToast({ message, type });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
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
    showToast(modal?.user ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
  };

  const handleDeleteConfirm = async () => {
    setDelLoad(true);
    try {
      await api.delete(deleteTarget.email);
      setDelTarget(null);
      await loadUsers();
      showToast("Usuário excluído.");
    } catch {
      showToast("Erro ao excluir usuário.", "error");
    } finally {
      setDelLoad(false);
    }
  };

  const [filtered, setFiltered] = useState([]);
  // Busca no BACKEND - filtra por nome ou email (ajuda com performance em grandes bases)
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(users);
      return;
    }
    api.search(search).then(data => setFiltered(data || []));
  }, [search, users]);

  return (
    <>
      <style>{globalStyles}</style>

      {/* Fundo — grade */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.25,
      }} />

      {/* Fundo — brilho roxo */}
      <div style={{
        position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)",
        width: "min(700px, 100vw)", height: 400,
        background: `radial-gradient(ellipse at center, ${theme.accentGlow} 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Wrapper centralizado e responsivo */}
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 820,
        width: "100%",
        margin: "0 auto",
        padding: isMobile ? "28px 16px" : isTablet ? "40px 24px" : "56px 32px",
        boxSizing: "border-box",
      }}>

        {/* ── Cabeçalho ── */}
        <div className="fade-in" style={{ marginBottom: isMobile ? 28 : 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: theme.accent, animation: "pulse 2s infinite", flexShrink: 0,
            }} />
            <span style={{
              fontSize: 11, color: theme.accent,
              textTransform: "uppercase", letterSpacing: "0.15em",
              fontWeight: 700, fontFamily: "'DM Mono', monospace",
            }}>
              API · localhost:8080
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? 26 : isTablet ? 34 : 42,
            fontWeight: 800, color: theme.text,
            letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8,
          }}>
            Gerenciamento{!isMobile && <br />}{" "}
            <span style={{ color: theme.accent }}>de Usuários</span>
          </h1>

          <p style={{ color: theme.textMuted, fontSize: isMobile ? 13 : 14 }}>
            CRUD integrado com Spring Boot REST API
          </p>
        </div>

        {/* ── Barra de busca e ações ── */}
        <div className="fade-in" style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 10,
          alignItems: "stretch",
          marginBottom: 20,
          animationDelay: "0.1s",
        }}>
          {/* Busca */}
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              color: theme.textMuted, fontSize: 14, pointerEvents: "none",
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail…"
              style={{
                width: "100%", padding: "11px 14px 11px 40px",
                background: theme.surface, border: `1px solid ${theme.border}`,
                borderRadius: 10, color: theme.text,
                outline: "none", transition: "border-color 0.18s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = theme.accent; }}
              onBlur={e =>  { e.currentTarget.style.borderColor = theme.border; }}
            />
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={loadUsers}
              disabled={loading}
              title="Atualizar lista"
              style={{
                padding: "11px 14px", background: "transparent",
                border: `1px solid ${theme.border}`, borderRadius: 8,
                color: theme.textDim, cursor: "pointer", fontSize: 18, lineHeight: 1,
              }}
            >
              {loading ? <Spinner /> : "↻"}
            </button>

            <button
              onClick={() => setModal({ type: "create" })}
              style={{
                flex: 1,
                padding: "11px 20px",
                background: theme.accent, border: "none", borderRadius: 8,
                color: "#fff", cursor: "pointer",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              + Novo usuário
            </button>
          </div>
        </div>

        {/* ── Contador ── */}
        <div className="fade-in" style={{ display: "flex", alignItems: "center", marginBottom: 14, animationDelay: "0.15s" }}>
          <span style={{ fontSize: 12, color: theme.textMuted }}>
            {loading ? "Carregando…" : `${filtered.length} usuário${filtered.length !== 1 ? "s" : ""}`}
          </span>
          {search && (
            <span style={{ fontSize: 12, color: theme.accent, marginLeft: 6 }}>
              (filtrado de {users.length})
            </span>
          )}
        </div>

        {/* ── Erro de conexão ── */}
        {fetchError && (
          <div className="fade-in" style={{
            background: "rgba(239,68,68,0.08)", border: `1px solid ${theme.danger}`,
            borderRadius: 12, padding: isMobile ? "14px 16px" : "20px 24px", marginBottom: 20,
          }}>
            <p style={{ fontWeight: 700, color: theme.danger, marginBottom: 4 }}>
              Não foi possível conectar à API
            </p>
            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>
              Certifique-se de que o backend está rodando em{" "}
              <code style={{ color: theme.accent }}>http://localhost:8080</code> e que o CORS está habilitado.
            </p>
          </div>
        )}

        {/* ── Lista de usuários ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {loading && users.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: theme.textMuted }}>
              <Spinner />
              <p style={{ marginTop: 12, fontSize: 13 }}>Carregando usuários…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="fade-in" style={{
              textAlign: "center", padding: isMobile ? "40px 16px" : "60px 0",
              color: theme.textMuted, fontSize: 14,
              border: `1px dashed ${theme.border}`, borderRadius: 12,
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>👤</div>
              {search ? "Nenhum usuário encontrado para essa busca." : "Nenhum usuário cadastrado ainda."}
            </div>
          ) : (
            filtered.map((u, i) => (
              <UserRow
                key={u.Id ?? u.id}
                user={u}
                index={i}
                isMobile={isMobile}
                onEdit={u  => setModal({ type: "edit", user: u })}
                onDelete={u => setDelTarget(u)}
              />
            ))
          )}
        </div>

        {/* ── Rodapé ── */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: `1px solid ${theme.border}`,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Mono', monospace" }}>
            by Kaio Lamanna
          </span>
          {!isMobile && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {["POST /usuario", "GET /lista", "PUT /usuario", "DELETE /?email"].map(ep => (
                <span key={ep} style={{ fontSize: 10, color: theme.textMuted, fontFamily: "'DM Mono', monospace" }}>
                  {ep}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modais ── */}
      {modal && (
        <UserModal user={modal.user} onClose={() => setModal(null)} onSave={handleSave} />
      )}
      {deleteTarget && (
        <DeleteConfirm
          user={deleteTarget}
          onClose={() => setDelTarget(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
      )}
    </>
  );
}
