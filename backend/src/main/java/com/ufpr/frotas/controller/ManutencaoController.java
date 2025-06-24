package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.ManutencaoRequestDTO;
import com.ufpr.frotas.model.entity.Manutencao;
import com.ufpr.frotas.service.ManutencaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manutencoes")
@RequiredArgsConstructor
public class ManutencaoController {

    private final ManutencaoService manutencaoService;

    @GetMapping
    public ResponseEntity<List<Manutencao>> listar() {
        return ResponseEntity.ok(manutencaoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manutencao> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(manutencaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Manutencao> salvar(@RequestBody @Valid ManutencaoRequestDTO dto) {
        return ResponseEntity.ok(manutencaoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manutencao> atualizar(@PathVariable Long id, @RequestBody @Valid ManutencaoRequestDTO dto) {
        return ResponseEntity.ok(manutencaoService.atualizar(id, dto));
    }

}
