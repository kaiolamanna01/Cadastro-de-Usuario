import { useEffect, useState } from "react";
import {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
} from "../services/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Carrega usuários ao iniciar
  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const dados = await listarUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editandoId) {
        await atualizarUsuario(editandoId, { nome });
        setEditandoId(null);
      } else {
        await criarUsuario({ nome });
      }

      setNome("");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await deletarUsuario(id);
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  function handleEdit(usuario) {
    setNome(usuario.nome);
    setEditandoId(usuario.id);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de Usuários</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">
          {editandoId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <hr />

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome}{" "}
            <button onClick={() => handleEdit(usuario)}>
              Editar
            </button>
            <button onClick={() => handleDelete(usuario.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;