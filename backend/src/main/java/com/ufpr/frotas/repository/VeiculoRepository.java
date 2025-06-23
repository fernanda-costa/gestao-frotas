package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByAtivoTrue();
}
