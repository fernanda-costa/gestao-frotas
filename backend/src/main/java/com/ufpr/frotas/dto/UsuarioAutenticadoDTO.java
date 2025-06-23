package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.enums.PerfilUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UsuarioAutenticadoDTO {
    private Long id;
    private String nome;
    private String email;
    private PerfilUsuario perfil;
}
