package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
}
