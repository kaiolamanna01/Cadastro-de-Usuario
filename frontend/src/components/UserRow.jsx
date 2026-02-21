import { theme } from "../styles/global";
import Avatar from "./Avatar";

export default function UserRow({ user, onEdit, onDelete, index, isMobile }) {
  return (
    <div
      className="fade-in"
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 12 : 16,
        padding: isMobile ? "14px 16px" : "14px 20px",
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        transition: "all 0.18s ease",
        animationDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = theme.accent;
        e.currentTarget.style.background  = theme.surfaceHover;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.background  = theme.surface;
      }}
    >
      {/* Avatar + info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0, width: "100%" }}>
        <Avatar name={user.nome} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontWeight: 700, fontSize: 14, color: theme.text, marginBottom: 2,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {user.nome}
          </p>
          <p style={{
            fontSize: 12, color: theme.textMuted,
            fontFamily: "'DM Mono', monospace",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {user.email}
          </p>
        </div>

        {/* ID badge — só aparece em telas maiores */}
        {!isMobile && (
          <span style={{
            fontSize: 10, fontFamily: "'DM Mono', monospace",
            color: theme.textMuted, background: theme.bg,
            border: `1px solid ${theme.border}`,
            padding: "3px 8px", borderRadius: 6, flexShrink: 0,
          }}>
            #{user.Id ?? user.id}
          </span>
        )}
      </div>

      {/* Ações */}
      <div style={{
        display: "flex", gap: 6, flexShrink: 0,
        width: isMobile ? "100%" : "auto",
      }}>
        <button
          onClick={() => onEdit(user)}
          style={{
            flex: isMobile ? 1 : "none",
            padding: "6px 12px",
            background: "transparent",
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            color: theme.textDim,
            cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(user)}
          style={{
            flex: isMobile ? 1 : "none",
            padding: "6px 12px",
            background: "transparent",
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            color: theme.danger,
            cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          🗑 Excluir
        </button>
      </div>
    </div>
  );
}
