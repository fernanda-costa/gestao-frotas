package com.ufpr.frotas.controller;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
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
    public ResponseEntity<List<Motorista>> listar(@RequestParam(required = false) Boolean  ativo) {
        return ResponseEntity.ok(motoristaService.listarTodos(ativo));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Motorista> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(motoristaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<UsuarioAutenticadoDTO> cadastrar(@RequestBody @Valid UsuarioCadastroDTO dto) {
        return ResponseEntity.ok(motoristaService.cadastrar(dto));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Motorista> atualizar(@PathVariable Long id, @RequestBody @Valid VeiculoRequestDTO dto) {
//        return ResponseEntity.ok(motoristaService.atualizar(id, dto));
//    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        motoristaService.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
