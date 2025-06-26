package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.AbastecimentoRequestDTO;
import com.ufpr.frotas.dto.AgendamentoRequestDTO;
import com.ufpr.frotas.dto.FinalizarViagemDTO;
import com.ufpr.frotas.dto.IniciarViagemRequestDTO;
import com.ufpr.frotas.model.entity.Abastecimento;
import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import com.ufpr.frotas.service.AbastecimentoService;
import com.ufpr.frotas.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoServiceService;

    @GetMapping
    public ResponseEntity<List<Agendamento>> listar() {
        return ResponseEntity.ok(agendamentoServiceService.listarTodos());
    }

    @GetMapping("filtrar")
    public ResponseEntity<List<Agendamento>> listarComFiltros(
            @RequestParam(required = false) StatusAgendamento status,
            @RequestParam(required = false) Long motoristaId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim
    ) {
        List<Agendamento> resultados = agendamentoServiceService.buscarComFiltros(status, motoristaId, dataInicio, dataFim);
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoServiceService.buscarPorId(id));
    }

    @GetMapping("/motorista/{id}")
    public ResponseEntity<List<Agendamento>> buscarPorMotoristaId(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoServiceService.buscarPorMotoristaId(id));
    }

    @GetMapping("/motorista/{id}/concluidas")
    public ResponseEntity<List<Agendamento>> buscarPorMotoristaIdConcluidas(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoServiceService.buscarPorMotoristaIdConcluidas(id, StatusAgendamento.FINALIZADO));
    }

    @PostMapping
    public ResponseEntity<Agendamento> salvar(@RequestBody @Valid AgendamentoRequestDTO dto) {
        return ResponseEntity.ok(agendamentoServiceService.salvar(dto));
    }

    @PutMapping("iniciar/{id}")
    public ResponseEntity<Agendamento> Inciar(@PathVariable Long id, @RequestBody @Valid IniciarViagemRequestDTO dto) {
        return ResponseEntity.ok(agendamentoServiceService.iniciarViagem(id, dto));
    }

    @PutMapping("finalizar/{id}")
    public ResponseEntity<Agendamento> Finalizar(@PathVariable Long id, @RequestBody @Valid FinalizarViagemDTO dto) {
        return ResponseEntity.ok(agendamentoServiceService.finalizarViagem(id, dto));
    }

}
