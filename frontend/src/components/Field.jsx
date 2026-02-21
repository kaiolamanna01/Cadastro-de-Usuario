import { theme } from "../styles/global";

export default function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 600, color: theme.textMuted,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
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
