package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.enums.TipoCombustivel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class AbastecimentoRequestDTO {
    private Long id;
    private LocalDate data;
    private TipoCombustivel tipoCombustivel;
    private double valor;
    private int quilometragem;
    private Long veiculoId;
    private Long motoristaId;
}
