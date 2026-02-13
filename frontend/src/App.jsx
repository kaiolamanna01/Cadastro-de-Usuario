import { useState } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    const usuario = {
      nome,
      email,
      senha,
    };

    await fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    alert("Usuário cadastrado!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={cadastrarUsuario}>
        <div>
          <label>Nome:</label>
          <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha:</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
