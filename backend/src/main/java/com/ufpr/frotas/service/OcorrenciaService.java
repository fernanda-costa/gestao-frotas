package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.OcorrenciaRequestDTO;
import com.ufpr.frotas.model.entity.Ocorrencia;
import com.ufpr.frotas.repository.OcorrenciaRepository;
import com.ufpr.frotas.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OcorrenciaService {
    private final OcorrenciaRepository ocorrenciaRepository;
    private final VeiculoRepository veiculoRepository;

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

    private void preencherOcorrenciaComDTO(Ocorrencia ocorrencia, OcorrenciaRequestDTO dto) {

    }
}