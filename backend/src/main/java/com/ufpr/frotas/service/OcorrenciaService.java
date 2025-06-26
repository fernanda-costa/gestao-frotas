package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.OcorrenciaRequestDTO;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Ocorrencia;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.repository.OcorrenciaRepository;
import com.ufpr.frotas.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OcorrenciaService {
    private final OcorrenciaRepository ocorrenciaRepository;
    private final VeiculoService veiculoService;
    private final MotoristaService motoristaService;

    public List<Ocorrencia> listarTodos() {
        return ocorrenciaRepository.findAll();
    }

    public Ocorrencia buscarPorId(Long id) {
        return ocorrenciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutencao não encontrada"));
    }

    public Ocorrencia salvar(OcorrenciaRequestDTO dto) {
        var ocorrencia = new Ocorrencia();
        preencherOcorrenciaComDTO(ocorrencia, dto);

        return ocorrenciaRepository.save(ocorrencia);
    }

    public Ocorrencia atualizar(Long id, OcorrenciaRequestDTO dto) {
        Ocorrencia ocorrencia = buscarPorId(id);
        preencherOcorrenciaComDTO(ocorrencia, dto);
        return ocorrenciaRepository.save(ocorrencia);
    }

    private Ocorrencia preencherOcorrenciaComDTO(Ocorrencia ocorrencia, OcorrenciaRequestDTO dto) {
        ocorrencia.setDataHora(LocalDateTime.now());
        ocorrencia.setDescricao(dto.getDescricao());

        if (dto.getVeiculoId() != null) {
            Veiculo veiculo = veiculoService.buscarPorId(dto.getVeiculoId());
            ocorrencia.setVeiculo(veiculo);
        }

        if (dto.getMotoristaId() != null) {
            Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId());
            ocorrencia.setMotorista(motorista);
        }

        return ocorrencia;
    }
}