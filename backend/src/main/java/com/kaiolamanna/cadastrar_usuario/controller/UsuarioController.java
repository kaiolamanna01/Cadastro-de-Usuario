package com.kaiolamanna.cadastrar_usuario.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.kaiolamanna.cadastrar_usuario.business.UsuarioService;
import lombok.RequiredArgsConstructor;
import com.kaiolamanna.cadastrar_usuario.infrastructure.entitys.Usuario;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor

public class UsuarioController {

        private final UsuarioService service;

        @PostMapping
        public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {
                
                return ResponseEntity.ok(service.cadastrarUsuario(usuario));
        }

        @GetMapping
        public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam String email) {
                return ResponseEntity.ok(service.buscarUsuarioPorEmail(email));
        }

        @DeleteMapping
        public ResponseEntity<Void> deletarUsuario(@RequestParam String email) {
                service.deletarUsuario(email);
                return ResponseEntity.ok().build();
        }

        @PutMapping
        public ResponseEntity<Void> atualizarUsuarioPorId(@RequestBody Usuario usuario) {
                service.atualizarUsuarioPorId(usuario.getId(), usuario);
                return ResponseEntity.ok().build();
        }

        @GetMapping("/lista")
        public ResponseEntity<List<Usuario>> listarUsuarios() {
                return ResponseEntity.ok(service.listarUsuarios());
        }

        @GetMapping("/buscar")
        public ResponseEntity<List<Usuario>> buscarPorNome(@RequestParam String nome) {
                return ResponseEntity.ok(service.buscarPorNome(nome));
}
}
