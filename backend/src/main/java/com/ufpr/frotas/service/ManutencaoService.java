package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.repository.ManutencaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;

    public List<Manutencao> listarTodos() {
        return manutencaoRepository.findAll();
    }

    public Manutencao buscarPorId(Long id) {
        return manutencaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutencao não encontrada"));
    }

    public Manutencao salvar(ManutencaoRequestDTO dto) {
        Manutencao manutencao = new Manutencao();
        preencherManutencaoComDTO(manutencao, dto);
        return manutencaoRepository.save(manutencao);
    }

    public Manutencao atualizar(Long id, ManutencaoRequestDTO dto) {
        Manutencao manutencao = buscarPorId(id);
        preencherManutencaoComDTO(manutencao, dto);
        return manutencaoRepository.save(manutencao);
    }

    private void preencherManutencaoComDTO(Manutencao manutencao, ManutencaoRequestDTO dto) {

    }

}
