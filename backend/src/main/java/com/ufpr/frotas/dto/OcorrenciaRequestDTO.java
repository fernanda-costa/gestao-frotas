package com.ufpr.frotas.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Setter
@Getter
public class OcorrenciaRequestDTO {

    private Long id;
    private LocalDate dataHora;
    private String descricao;
    private Long motoristaId;
    private Long veiculoId;
}
