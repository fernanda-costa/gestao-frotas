package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.model.enums.TipoVeiculo;
import jakarta.validation.constraints.*;

public record VeiculoRequestDTO(

        @NotBlank(message = "Placa é obrigatória")
        String placa,

        @NotBlank(message = "Modelo é obrigatório")
        String modelo,

        @NotNull(message = "Tipo de veículo é obrigatório")
        TipoVeiculo tipo,

        @Min(value = 1900, message = "Ano inválido")
        int ano,

        @Min(value = 0, message = "Quilometragem deve ser positiva")
        int quilometragemAtual,

        @NotNull(message = "Status do veículo é obrigatório")
        StatusVeiculo status,

        @NotBlank(message = "Marca é obrigatória")
        String marca,

        @NotBlank(message = "RENAVAM é obrigatório")
        String renavam,

        @NotBlank(message = "Chassi é obrigatório")
        String chassi
) {}
