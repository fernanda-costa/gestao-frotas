package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.AgendamentoRequestDTO;
import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.repository.AgendamentoRepository;
import com.ufpr.frotas.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final VeiculoService veiculoService;
//    private final MotoristaService motoristaService;

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public Agendamento buscarPorId(Long id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    }

    public Agendamento salvar(AgendamentoRequestDTO dto) {
        Agendamento agendamento = new Agendamento();
        preencherAgendamentoComDTO(agendamento, dto);

        agendamento.setStatus(StatusAgendamento.AGENDADO);

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizar(Long id, AgendamentoRequestDTO dto) {
        Agendamento agendamento = buscarPorId(id);
        preencherAgendamentoComDTO(agendamento, dto);
        return agendamentoRepository.save(agendamento);
    }

    private void preencherAgendamentoComDTO(Agendamento agendamento, AgendamentoRequestDTO dto) {
        agendamento.setDataHoraSaida(dto.getDataHoraSaida());
        agendamento.setDestino(dto.getDestino());
        agendamento.setJustificativa(dto.getJustificativa());

        agendamento.setStatus(StatusAgendamento.AGENDADO);

        if (dto.getVeiculoId() != null) {
            Veiculo veiculo = veiculoService.buscarPorId(dto.getVeiculoId());
            agendamento.setVeiculo(veiculo);
        }
//
//        if (dto.getMotoristaId() != null) {
//            Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId());
//            agendamento.setMotorista(motorista);
//        }
    }
}
