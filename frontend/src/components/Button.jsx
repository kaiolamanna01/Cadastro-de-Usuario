import { theme } from "../styles/global";
import Spinner from "./Spinner";

export default function Button({ children, onClick, variant = "default", size = "md", loading, disabled, style = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "none", cursor: disabled || loading ? "not-allowed" : "pointer",
    borderRadius: 8, fontFamily: "'Syne', sans-serif", fontWeight: 600,
    transition: "all 0.18s ease",
    opacity: disabled || loading ? 0.6 : 1,
    ...style,
  };

  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12 },
    md: { padding: "9px 18px", fontSize: 13 },
  };

  const variants = {
    primary: { background: theme.accent, color: "#fff" },
    danger:  { background: theme.danger, color: "#fff" },
    ghost:   { background: "transparent", color: theme.textDim, border: `1px solid ${theme.border}` },
    default: { background: theme.surface, color: theme.textDim, border: `1px solid ${theme.border}` },
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
