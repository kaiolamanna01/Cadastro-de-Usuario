import { useEffect } from "react";
import { theme } from "../styles/global";

export default function Toast({ message, type, onDone }) {
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
    </div>
  );
}
