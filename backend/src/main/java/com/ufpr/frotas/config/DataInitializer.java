package com.ufpr.frotas.config;

import com.ufpr.frotas.dto.CnhDTO;
import com.ufpr.frotas.dto.EnderecoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.entity.*;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.model.enums.StatusAgendamento;
import com.ufpr.frotas.model.enums.StatusVeiculo;
import com.ufpr.frotas.repository.*;
import com.ufpr.frotas.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioService usuarioService;
    private final VeiculoRepository veiculoRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final ManutencaoRepository manutencaoRepository;
    private final AbastecimentoRepository abastecimentoRepository;

    @Override
    public void run(String... args) throws Exception {
        cadastrarAdmins();
        cadastrarMotoristas();
    }

    private void cadastrarAdmins() {
        System.out.println("Cadastrando administradores...");
        try {
            usuarioService.cadastrarAdmin(UsuarioCadastroDTO.builder()
                    .nome("Lucas Silva")
                    .email("lucas@ufpr.com")
                    .telefone("41999990001")
                    .senha("admin123")
                    .build());

            usuarioService.cadastrarAdmin(UsuarioCadastroDTO.builder()
                    .nome("Amanda Souza")
                    .email("amanda@ufpr.com")
                    .telefone("41999990002")
                    .senha("admin123")
                    .build());

            usuarioService.cadastrarAdmin(UsuarioCadastroDTO.builder()
                    .nome("Jorge Almeida")
                    .email("jorge@ufpr.com")
                    .telefone("41999990003")
                    .senha("admin123")
                    .build());
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar admin: " + e.getMessage());
        }
    }

    private void cadastrarMotoristas() {
        System.out.println("Cadastrando motoristas...");

        List<UsuarioCadastroDTO> motoristas = List.of(
                UsuarioCadastroDTO.builder()
                        .nome("Paulo Oliveira")
                        .email("paulo@ufpr.com")
                        .telefone("41999990010")
                        .senha("motorista123")
                        .cpf("12345678901")
                        .cnh(new CnhDTO("123456789", "B", LocalDate.of(2018, 5, 20), LocalDate.of(2026, 5, 20), "Detran-PR"))
                        .endereco(new EnderecoDTO("Rua A", "123", "", "Centro", "Curitiba", "PR", "80000000"))
                        .build(),
                UsuarioCadastroDTO.builder()
                        .nome("Carla Mendes")
                        .email("carla@ufpr.com")
                        .telefone("41999990011")
                        .senha("motorista123")
                        .cpf("23456789012")
                        .cnh(new CnhDTO("987654321", "C", LocalDate.of(2017, 3, 15), LocalDate.of(2025, 3, 15), "Detran-PR"))
                        .endereco(new EnderecoDTO("Rua B", "456", "Apto 101", "Batel", "Curitiba", "PR", "80010000"))
                        .build(),
                UsuarioCadastroDTO.builder()
                        .nome("Roberta Lima")
                        .email("roberta@ufpr.com")
                        .telefone("41999990012")
                        .senha("motorista123")
                        .cpf("34567890123")
                        .cnh(new CnhDTO("456789123", "D", LocalDate.of(2019, 7, 10), LocalDate.of(2027, 7, 10), "Detran-PR"))
                        .endereco(new EnderecoDTO("Rua C", "789", "", "Cabral", "Curitiba", "PR", "80020000"))
                        .build(),
                UsuarioCadastroDTO.builder()
                        .nome("Diego Fernandes")
                        .email("diego@ufpr.com")
                        .telefone("41999990013")
                        .senha("motorista123")
                        .cpf("45678901234")
                        .cnh(new CnhDTO("654321987", "B", LocalDate.of(2016, 11, 5), LocalDate.of(2024, 11, 5), "Detran-PR"))
                        .endereco(new EnderecoDTO("Rua D", "321", "", "Portão", "Curitiba", "PR", "80030000"))
                        .build(),
                UsuarioCadastroDTO.builder()
                        .nome("Thiago Santos")
                        .email("thiago@ufpr.com")
                        .telefone("41999990014")
                        .senha("motorista123")
                        .cpf("56789012345")
                        .cnh(new CnhDTO("789123456", "E", LocalDate.of(2015, 1, 1), LocalDate.of(2023, 1, 1), "Detran-PR"))
                        .endereco(new EnderecoDTO("Rua E", "654", "Casa", "Santa Cândida", "Curitiba", "PR", "80040000"))
                        .build()
        );

        for (UsuarioCadastroDTO dto : motoristas) {
            try {
                usuarioService.cadastrarMotorista(dto);
            } catch (Exception e) {
                System.err.println("Erro ao cadastrar motorista " + dto.getNome() + ": " + e.getMessage());
            }
        }
    }
}