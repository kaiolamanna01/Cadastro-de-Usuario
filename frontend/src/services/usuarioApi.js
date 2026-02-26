const API_BASE = "https://backend-cadastro-production.up.railway.app";

function getToken() {
  return localStorage.getItem("token");
}

async function apiFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  login:  (email, senha) => apiFetch(`${API_BASE}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  }),
  list:   ()           => apiFetch(`${API_BASE}/usuario/lista`),
  get:    (email)      => apiFetch(`${API_BASE}/usuario?email=${encodeURIComponent(email)}`),
  create: (data)       => apiFetch(`${API_BASE}/usuario`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)   => apiFetch(`${API_BASE}/usuario`, { method: "PUT", body: JSON.stringify({ ...data, id }) }),
  delete: (email)      => apiFetch(`${API_BASE}/usuario?email=${encodeURIComponent(email)}`, { method: "DELETE" }),
  search: (nome)       => apiFetch(`${API_BASE}/usuario/buscar?nome=${encodeURIComponent(nome)}`),
};