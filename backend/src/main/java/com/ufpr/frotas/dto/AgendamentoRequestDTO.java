package com.ufpr.frotas.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AgendamentoRequestDTO {

    private Long id;

    @NotNull(message = "O ID do veículo é obrigatório")
    private Long veiculoId;

    @NotNull(message = "O ID do motorista é obrigatório")
    private Long motoristaId;

    @NotNull(message = "A data e hora de saída são obrigatórias")
    @Future(message = "A data e hora de saída devem estar no futuro")
    private LocalDateTime dataHoraSaida;

    @NotBlank(message = "O destino é obrigatório")
    private String destino;

    @NotBlank(message = "A justificativa é obrigatória")
    private String justificativa;
}
