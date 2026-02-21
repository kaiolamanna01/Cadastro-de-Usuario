export const theme = {
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

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body {
    background: #0a0a0f;
    color: #e2e8f0;
    font-family: 'Syne', sans-serif;
  }

  #root {
    width: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
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
    0%, 100% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.3); }
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
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 3px; }
`;
