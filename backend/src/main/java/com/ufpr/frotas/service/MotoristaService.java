package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.repository.MotoristaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotoristaService {

    private final MotoristaRepository motoristaRepository;

    public List<Motorista> listarTodos() {
        return motoristaRepository.findAll();
    }

    public Motorista buscarPorId(Long id) {
        return motoristaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutencao não encontrada"));
    }
}
