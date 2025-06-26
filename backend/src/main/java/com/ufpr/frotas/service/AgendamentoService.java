package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.AgendamentoRequestDTO;
import com.ufpr.frotas.dto.FinalizarViagemDTO;
import com.ufpr.frotas.dto.IniciarViagemRequestDTO;
import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import com.ufpr.frotas.repository.AgendamentoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final VeiculoService veiculoService;
    private final MotoristaService motoristaService;

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

        if (dto.getMotoristaId() != null) {
            Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId());
            agendamento.setMotorista(motorista);
        }
    }

    public List<Agendamento> buscarPorMotoristaId(Long id) {
        return agendamentoRepository.findByMotoristaIdOrderByDataHoraSaidaAsc(id);
    }

    public List<Agendamento> buscarPorMotoristaIdConcluidas(Long id, StatusAgendamento finalizado) {
        return agendamentoRepository.findByMotoristaIdAndStatus(id, finalizado);
    }

    public Agendamento iniciarViagem(Long id, @Valid IniciarViagemRequestDTO dto) {
        Agendamento agendamento = buscarPorId(id);

        agendamento.setStatus(StatusAgendamento.EM_USO);
        agendamento.setKmSaida(dto.getKmSaida());
        agendamento.setObsSaida(dto.getObservacoes());
        agendamento.setDataHoraSaida(LocalDateTime.now());

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento finalizarViagem(Long id, @Valid FinalizarViagemDTO dto) {
        Agendamento agendamento = buscarPorId(id);

        agendamento.setStatus(StatusAgendamento.FINALIZADO);
        agendamento.setKmRetorno(dto.getKmRetorno());
        agendamento.setObsRetorno(dto.getObservacoes());
        agendamento.setDataHoraRetorno(LocalDateTime.now());

        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamento> buscarComFiltros(StatusAgendamento status, Long motoristaId, LocalDate dataInicio, LocalDate dataFim) {
        return agendamentoRepository.buscarComFiltros(motoristaId, status);
    }
}
