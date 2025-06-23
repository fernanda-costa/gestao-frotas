package com.ufpr.frotas.model.entity;

import com.ufpr.frotas.model.enums.StatusAgendamento;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Motorista motorista;

    @ManyToOne
    private Veiculo veiculo;

    private LocalDateTime dataHoraSaida;
    private LocalDateTime dataHoraRetorno;

    private String destino;
    private String justificativa;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;    private int kmSaida;
    private int kmRetorno;
    private String obsSaida;
    private String obsRetorno;
}
