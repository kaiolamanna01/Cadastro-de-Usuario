export default function Avatar({ name }) {
  const initials = name
    ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const hue = name ? name.charCodeAt(0) * 37 % 360 : 200;

  return (
    <div style={{
      width: 38, height: 38,
      borderRadius: "50%",
      background: `hsl(${hue}, 55%, 35%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, color: "#fff",
      flexShrink: 0,
      border: `2px solid hsl(${hue}, 55%, 25%)`,
    }}>
      {initials}
    </div>
  );
}
