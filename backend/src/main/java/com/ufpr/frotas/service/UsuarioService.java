package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.entity.*;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    private static final DateTimeFormatter CNH_DATE_FORMATTER = DateTimeFormatter.ISO_DATE;

    public UsuarioAutenticadoDTO cadastrarMotorista(UsuarioCadastroDTO dto) {
        return cadastrarUsuario(dto, PerfilUsuario.MOTORISTA);
    }

    public UsuarioAutenticadoDTO cadastrarAdmin(UsuarioCadastroDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Admin admin = new Admin();
        admin.setNome(dto.getNome());
        admin.setEmail(dto.getEmail());
        admin.setTelefone(dto.getTelefone());
        admin.setSenha(passwordEncoder.encode(dto.getSenha()));
        admin.setPerfil(PerfilUsuario.ADMINISTRADOR);

        Admin salvo = usuarioRepository.save(admin);

        return new UsuarioAutenticadoDTO(salvo.getId(), salvo.getNome(), salvo.getEmail(), salvo.getPerfil());
    }

    private UsuarioAutenticadoDTO cadastrarUsuario(UsuarioCadastroDTO dto, PerfilUsuario perfil) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario;

        if (perfil == PerfilUsuario.MOTORISTA) {
            Motorista motorista = new Motorista();
            motorista.setPerfil(PerfilUsuario.MOTORISTA);

            if (dto.getCnh() != null) {
                Cnh cnh = new Cnh();
                cnh.setNumCnh(dto.getCnh().getNumCnh());
                cnh.setCategoria(dto.getCnh().getCategoria());
                cnh.setDataEmissao(dto.getCnh().getDataEmissao());

                try {
                    if (dto.getCnh().getValidade() != null) {
                        cnh.setValidade(dto.getCnh().getValidade());
                    }
                } catch (DateTimeParseException e) {
                    throw new IllegalArgumentException("Data de validade da CNH inválida. Use formato yyyy-MM-dd.");
                }

                cnh.setOrgaoEmissor(dto.getCnh().getOrgaoEmissor());
                motorista.setCnh(cnh);
            }

            if (dto.getEndereco() != null) {
                Endereco endereco = new Endereco();
                endereco.setLogradouro(dto.getEndereco().getLogradouro());
                endereco.setNumero(dto.getEndereco().getNumero());
                endereco.setComplemento(dto.getEndereco().getComplemento());
                endereco.setBairro(dto.getEndereco().getBairro());
                endereco.setCidade(dto.getEndereco().getCidade());
                endereco.setEstado(dto.getEndereco().getEstado());
                endereco.setCep(dto.getEndereco().getCep());
                motorista.setEndereco(endereco);
            }

            usuario = motorista;
        } else {
            usuario = new Usuario() {};
            usuario.setPerfil(perfil);
        }

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        Usuario salvo = usuarioRepository.save(usuario);

        return new UsuarioAutenticadoDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail(),
                salvo.getPerfil()
        );
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public List<UsuarioAutenticadoDTO> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(u -> new UsuarioAutenticadoDTO(u.getId(), u.getNome(), u.getEmail(), u.getPerfil()))
                .collect(Collectors.toList());
    }
}
