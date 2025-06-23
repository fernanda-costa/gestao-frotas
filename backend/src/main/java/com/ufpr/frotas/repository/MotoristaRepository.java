package com.ufpr.frotas.repository;

import com.ufpr.frotas.model.entity.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
    Optional<Motorista> findByEmail(String email);
}
