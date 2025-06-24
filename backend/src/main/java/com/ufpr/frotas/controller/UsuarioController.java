package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody @Valid UsuarioCadastroRequest request) {
        try {
            PerfilUsuario perfil = PerfilUsuario.valueOf(request.getPerfil().toUpperCase());

            UsuarioAutenticadoDTO usuarioSalvo;
            if (perfil == PerfilUsuario.MOTORISTA) {
                usuarioSalvo = usuarioService.cadastrarMotorista(request.getUsuario());
            } else if (perfil == PerfilUsuario.ADMINISTRADOR) {
                usuarioSalvo = usuarioService.cadastrarAdmin(request.getUsuario());
            } else {
                return ResponseEntity.badRequest().body("Perfil inválido");
            }

            return ResponseEntity.ok(usuarioSalvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Email já cadastrado ou perfil inválido");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro interno ao cadastrar usuário");
        }
    }

    public static class UsuarioCadastroRequest {
        @Valid
        private UsuarioCadastroDTO usuario;
        private String perfil;

        public UsuarioCadastroDTO getUsuario() {
            return usuario;
        }

        public void setUsuario(UsuarioCadastroDTO usuario) {
            this.usuario = usuario;
        }

        public String getPerfil() {
            return perfil;
        }

        public void setPerfil(String perfil) {
            this.perfil = perfil;
        }
    }
}
