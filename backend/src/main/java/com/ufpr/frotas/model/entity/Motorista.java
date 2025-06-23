package com.ufpr.frotas.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Motorista extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;

    @Embedded
    private Cnh cnh;

    @Embedded
    private Endereco endereco;

    private boolean ativo = true;
}
