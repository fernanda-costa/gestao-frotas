package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.AbastecimentoRequestDTO;
import com.ufpr.frotas.dto.AgendamentoRequestDTO;
import com.ufpr.frotas.model.entity.Abastecimento;
import com.ufpr.frotas.model.entity.Agendamento;
import com.ufpr.frotas.service.AbastecimentoService;
import com.ufpr.frotas.service.AgendamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoServiceService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Agendamento> salvar(@RequestBody @Valid AgendamentoRequestDTO dto) {
        return ResponseEntity.ok(agendamentoServiceService.salvar(dto));
    }

}
