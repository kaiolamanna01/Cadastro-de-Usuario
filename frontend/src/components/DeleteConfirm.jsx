import { theme } from "../styles/global";
import Button from "./Button";

export default function DeleteConfirm({ user, onClose, onConfirm, loading }) {
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
          Você está prestes a excluir{" "}
          <strong style={{ color: theme.text }}>{user?.nome}</strong>.{" "}
          Esta ação não pode ser desfeita.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>Excluir</Button>
        </div>
      </div>
    </div>
  );
}
