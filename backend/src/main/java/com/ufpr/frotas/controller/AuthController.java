package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String senha = request.get("senha");

        if (email == null || email.isBlank() || senha == null || senha.isBlank()) {
            return ResponseEntity.badRequest().body("Email e senha são obrigatórios");
        }

        try {
            return authService.login(email, senha)
                    .<ResponseEntity<?>>map(userDTO -> ResponseEntity.ok(userDTO))
                    .orElseGet(() -> ResponseEntity.status(401).body("Credenciais inválidas"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro interno no servidor");
        }
    }
}
