package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.TipoManutencao;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;
@Getter
@Setter
public class ManutencaoRequestDTO {

    private Long id;
    private LocalDate data;
    private TipoManutencao tipo;
    private String descricao;
    private double valor;
    private int quilometragem;
    private Long veiculoId;
}