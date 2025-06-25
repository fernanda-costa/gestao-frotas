package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.VeiculoRequestDTO;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findByAtivoTrue();
    }

    public Veiculo buscarPorId(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
    }

    public Veiculo salvar(VeiculoRequestDTO dto) {
        Veiculo veiculo = new Veiculo();
        preencherVeiculoComDTO(veiculo, dto);
        veiculo.setAtivo(true);
        return veiculoRepository.save(veiculo);
    }

    public Veiculo atualizar(Long id, VeiculoRequestDTO dto) {
        Veiculo veiculo = buscarPorId(id);
        preencherVeiculoComDTO(veiculo, dto);
        return veiculoRepository.save(veiculo);
    }

    private void preencherVeiculoComDTO(Veiculo veiculo, VeiculoRequestDTO dto) {
        veiculo.setPlaca(dto.placa());
        veiculo.setModelo(dto.modelo());
        veiculo.setTipo(dto.tipo());
        veiculo.setAno(dto.ano());
        veiculo.setQuilometragemAtual(dto.quilometragemAtual());
        veiculo.setStatus(dto.status());
        veiculo.setMarca(dto.marca());
    }

    public void desativar(Long id) {
        Veiculo veiculo = buscarPorId(id);
        veiculo.setAtivo(false);
        veiculo.setStatus(StatusVeiculo.INATIVO);
        veiculoRepository.save(veiculo);
    }
}
