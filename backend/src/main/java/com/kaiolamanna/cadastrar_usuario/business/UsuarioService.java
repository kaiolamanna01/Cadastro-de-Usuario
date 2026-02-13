package com.kaiolamanna.cadastrar_usuario.business;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kaiolamanna.cadastrar_usuario.infrastructure.entitys.Usuario;
import com.kaiolamanna.cadastrar_usuario.infrastructure.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario cadastrarUsuario(Usuario usuario) {
       if (usuario == null) {
           throw new IllegalArgumentException("Usuário não pode ser nulo");
       }
       return repository.saveAndFlush(usuario);
    }

    public Usuario buscarUsuarioPorEmail(String email) {
        return repository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email não encontrado"));
    }

    public void deletarUsuario(String email) {
    Usuario usuario = repository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        repository.delete(usuario);
}
    
    public void atualizarUsuarioPorId(Integer id, Usuario usuario) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo");
        }
        Usuario usuarioExistente = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setSenha(usuario.getSenha());
        repository.saveAndFlush(usuarioExistente);
    }

    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

}
