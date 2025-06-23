package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

    List<Ocorrencia> findByMotoristaId(Long motoristaId);
}
