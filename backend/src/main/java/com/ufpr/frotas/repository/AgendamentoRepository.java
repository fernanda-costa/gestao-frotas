package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByMotoristaIdOrderByDataHoraSaidaAsc(Long motoristaId);
}
