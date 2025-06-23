package com.ufpr.frotas.model.entity;

import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.model.enums.TipoVeiculo;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String modelo;

    @Enumerated(EnumType.STRING)
    private TipoVeiculo tipo;
    private int ano;
    private int quilometragemAtual;

    @Enumerated(EnumType.STRING)
    private StatusVeiculo status;
    private String marca;

    private boolean ativo = true;
}
