package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.VeiculoRequestDTO;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Veiculo;
import com.ufpr.frotas.service.MotoristaService;
import com.ufpr.frotas.service.VeiculoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motoristas")
@RequiredArgsConstructor
public class MotoristaController {

    private final MotoristaService motoristaService;

    @GetMapping
    public ResponseEntity<List<Motorista>> listar() {
        return ResponseEntity.ok(motoristaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motorista> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(motoristaService.buscarPorId(id));
    }

//    @PostMapping
//    public ResponseEntity<Motorista> salvar(@RequestBody @Valid VeiculoRequestDTO dto) {
//        return ResponseEntity.ok(motoristaService.salvar(dto));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Motorista> atualizar(@PathVariable Long id, @RequestBody @Valid VeiculoRequestDTO dto) {
//        return ResponseEntity.ok(motoristaService.atualizar(id, dto));
//    }
//
//    @PatchMapping("/{id}")
//    public ResponseEntity<Void> desativar(@PathVariable Long id) {
//        motoristaService.desativar(id);
//        return ResponseEntity.noContent().build();
//    }
}
