import { theme } from "../styles/global";

export default function Spinner() {
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
