package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.AbastecimentoRequestDTO;
import com.ufpr.frotas.model.entity.Abastecimento;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.repository.AbastecimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AbastecimentoService {

    private final AbastecimentoRepository abastecimentoRepository;
    private final VeiculoService veiculoService;
    private final MotoristaService motoristaService;

    public List<Abastecimento> listarTodos() {
        return abastecimentoRepository.findAll();
    }

    public Abastecimento buscarPorId(Long id) {
        return abastecimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Abastecimento não encontrado"));
    }

    public Abastecimento salvar(AbastecimentoRequestDTO dto) {
        Abastecimento abastecimento = new Abastecimento();
        abastecimento = preencherAbastecimentoComDTO(abastecimento, dto);
        return abastecimentoRepository.save(abastecimento);
    }

    public Abastecimento atualizar(Long id, AbastecimentoRequestDTO dto) {
        Abastecimento abastecimento = buscarPorId(id);
        preencherAbastecimentoComDTO(abastecimento, dto);
        return abastecimentoRepository.save(abastecimento);
    }

    public Abastecimento preencherAbastecimentoComDTO(Abastecimento abastecimento, AbastecimentoRequestDTO dto) {
        abastecimento.setData(dto.getData());
        abastecimento.setTipoCombustivel(dto.getTipoCombustivel());
        abastecimento.setValor(dto.getValor());
        abastecimento.setQuilometragem(dto.getQuilometragem());

        if (dto.getVeiculoId() != null) {
            Veiculo veiculo = veiculoService.buscarPorId(dto.getVeiculoId());
            abastecimento.setVeiculo(veiculo);
        }

        if (dto.getMotoristaId() != null) {
            Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId());
            abastecimento.setMotorista(motorista);
        }

        return abastecimento;
    }

    public List<Abastecimento> listarComFiltros(Long motoristaId, String status, LocalDateTime dataInicio, LocalDateTime dataFinal) {
        return  null;
    }
}
