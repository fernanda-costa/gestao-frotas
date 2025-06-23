package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.VeiculoRequestDTO;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.service.VeiculoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@RequiredArgsConstructor
public class VeiculoController {

    private final VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<List<Veiculo>> listar() {
        return ResponseEntity.ok(veiculoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Veiculo> salvar(@RequestBody @Valid VeiculoRequestDTO dto) {
        return ResponseEntity.ok(veiculoService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody @Valid VeiculoRequestDTO dto) {
        return ResponseEntity.ok(veiculoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        veiculoService.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
