package com.ufpr.frotas.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("MOTORISTA")
@Getter @Setter
@NoArgsConstructor
public class Motorista extends Usuario {
    private String cpf;

    @Embedded
    private Cnh cnh;

    @Embedded
    private Endereco endereco;

    private boolean ativo = true;
}

