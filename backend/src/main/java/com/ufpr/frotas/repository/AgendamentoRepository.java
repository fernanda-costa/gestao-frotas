package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByMotoristaIdOrderByDataHoraSaidaAsc(Long motoristaId);

    List<Agendamento> findByMotoristaIdAndStatus(Long motoristaId, StatusAgendamento status);

    @Query("SELECT a FROM Agendamento a WHERE " +
            "(:motoristaId IS NULL OR a.motorista.id = :motoristaId) AND " +
            "(:status IS NULL OR a.status = :status) "
            )
    List<Agendamento> buscarComFiltros(
            @Param("motoristaId") Long motoristaId,
            @Param("status") StatusAgendamento status
    );
}