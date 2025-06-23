package com.ufpr.frotas.model.entity;

import com.ufpr.frotas.model.enums.TipoCombustivel;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor
public class Abastecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    @Enumerated(EnumType.STRING)
    private TipoCombustivel tipoCombustivel;
    private double valor;
    private int quilometragem;

    @ManyToOne
    private Veiculo veiculo;

    @ManyToOne
    private Motorista motorista;
}
