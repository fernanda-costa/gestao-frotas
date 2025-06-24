package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.AbastecimentoRequestDTO;
import com.ufpr.frotas.dto.OcorrenciaRequestDTO;
import com.ufpr.frotas.model.entity.Abastecimento;
import com.ufpr.frotas.model.entity.Ocorrencia;
import com.ufpr.frotas.service.AbastecimentoService;
import com.ufpr.frotas.service.OcorrenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@RequiredArgsConstructor
public class OcorrenciaController {

    private final OcorrenciaService ocorrenciaService;

    @GetMapping
    public ResponseEntity<List<Ocorrencia>> listar() {
        return ResponseEntity.ok(ocorrenciaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ocorrencia> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ocorrenciaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Ocorrencia> salvar(@RequestBody @Valid OcorrenciaRequestDTO dto) {
        return ResponseEntity.ok(ocorrenciaService.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ocorrencia> atualizar(@PathVariable Long id, @RequestBody @Valid OcorrenciaRequestDTO dto) {
        return ResponseEntity.ok(ocorrenciaService.atualizar(id, dto));
    }

}
