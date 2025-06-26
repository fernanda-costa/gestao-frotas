package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByMotoristaIdOrderByDataHoraSaidaAsc(Long motoristaId);

    List<Agendamento> findByMotoristaIdAndStatus(Long motoristaId, StatusAgendamento status);
}
