package com.ufpr.frotas.model.entity;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Usuario {
    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String telefone;
}
