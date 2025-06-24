package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.TipoManutencao;


import java.time.LocalDate;

public class ManutencaoRequestDTO {
    private Long id;
    private LocalDate data;
    private TipoManutencao tipo;
    private String descricao;
    private double valor;
    private int quilometragem;
    private Veiculo veiculo;
}
