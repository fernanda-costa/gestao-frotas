package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.repository.ManutencaoRepository;
import com.ufpr.frotas.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;
    private final VeiculoRepository veiculoRepository;

    public List<Manutencao> listarTodos() {
        return manutencaoRepository.findAll();
    }

    public Manutencao buscarPorId(Long id) {
        return manutencaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutencao não encontrada"));
    }

    public Manutencao salvar(ManutencaoRequestDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId())
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));

        veiculo.setStatus(StatusVeiculo.EM_MANUTENCAO);
        veiculoRepository.save(veiculo);

        Manutencao manutencao = new Manutencao();
        preencherManutencaoComDTO(manutencao, dto);
        manutencao.setVeiculo(veiculo);

        return manutencaoRepository.save(manutencao);
    }

    public Manutencao atualizar(Long id, ManutencaoRequestDTO dto) {
        Manutencao manutencao = buscarPorId(id);
        preencherManutencaoComDTO(manutencao, dto);
        return manutencaoRepository.save(manutencao);
    }

    private void preencherManutencaoComDTO(Manutencao manutencao, ManutencaoRequestDTO dto) {
        manutencao.setData(dto.getData());
        manutencao.setTipo(dto.getTipo());
        manutencao.setDescricao(dto.getDescricao());
        manutencao.setValor(dto.getValor());
        manutencao.setQuilometragem(dto.getQuilometragem());
    }

}
