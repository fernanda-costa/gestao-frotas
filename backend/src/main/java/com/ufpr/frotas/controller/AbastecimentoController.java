package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.AbastecimentoRequestDTO;
import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Abastecimento;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.service.AbastecimentoService;
import com.ufpr.frotas.service.ManutencaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/abastecimentos")
@RequiredArgsConstructor
public class AbastecimentoController {

    private final AbastecimentoService abastecimentoService;

    @GetMapping
    public ResponseEntity<List<Abastecimento>> listar() {
        return ResponseEntity.ok(abastecimentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abastecimento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(abastecimentoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Abastecimento> salvar(@RequestBody @Valid AbastecimentoRequestDTO dto) {
        return ResponseEntity.ok(abastecimentoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abastecimento> atualizar(@PathVariable Long id, @RequestBody @Valid AbastecimentoRequestDTO dto) {
        return ResponseEntity.ok(abastecimentoService.atualizar(id, dto));
    }

}
