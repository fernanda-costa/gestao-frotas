package com.ufpr.frotas.model.entity;

import com.ufpr.frotas.model.enums.TipoManutencao;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;

    @Enumerated(EnumType.STRING)
    private TipoManutencao tipo;
    private String descricao;
    private double valor;
    private int quilometragem;

    @ManyToOne
    private Veiculo veiculo;
}
