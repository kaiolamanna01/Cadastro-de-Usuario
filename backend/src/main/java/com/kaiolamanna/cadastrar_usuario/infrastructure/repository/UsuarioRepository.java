package com.kaiolamanna.cadastrar_usuario.infrastructure.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kaiolamanna.cadastrar_usuario.infrastructure.entitys.Usuario;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByEmail(String email);
    void deleteByEmail(String email);
    List<Usuario> findByNomeContainingIgnoreCase(String nome);
}


