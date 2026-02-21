const BASE_URL = "http://localhost:8080/usuario";

export async function listarUsuarios() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function criarUsuario(usuario) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return response.json();
}

export async function deletarUsuario(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}


export async function atualizarUsuario(id, usuario) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return response.json();
}