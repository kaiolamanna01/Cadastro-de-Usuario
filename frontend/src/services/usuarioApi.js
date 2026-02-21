const API_BASE = "http://localhost:8080/usuario";

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  list:   ()           => apiFetch(`${API_BASE}/lista`),
  get:    (email)      => apiFetch(`${API_BASE}?email=${encodeURIComponent(email)}`),
  create: (data)       => apiFetch(API_BASE, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)   => apiFetch(API_BASE, { method: "PUT", body: JSON.stringify({ ...data, id }) }),
  delete: (email)      => apiFetch(`${API_BASE}?email=${encodeURIComponent(email)}`, { method: "DELETE" }),
  search: (nome) => apiFetch(`${API_BASE}/buscar?nome=${encodeURIComponent(nome)}`),
};
