package com.ufpr.frotas.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;
    private String descricao;

    @ManyToOne
    private Motorista motorista;

    @ManyToOne
    private Veiculo veiculo;
}
