package com.kaiolamanna.cadastrar_usuario.controller;

import com.kaiolamanna.cadastrar_usuario.infrastructure.config.JwtUtil;
import com.kaiolamanna.cadastrar_usuario.infrastructure.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository repository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        return repository.findByEmail(email)
                .filter(u -> passwordEncoder.matches(senha, u.getSenha()))
                .map(u -> ResponseEntity.ok(Map.of("token", jwtUtil.generateToken(email))))
                .orElse(ResponseEntity.status(401).build());
    }
}