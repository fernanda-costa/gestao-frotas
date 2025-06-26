package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.entity.*;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.repository.MotoristaRepository;
import com.ufpr.frotas.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MotoristaService {

    private final MotoristaRepository motoristaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Motorista> listarTodos(Boolean ativo) {
        if(ativo != null){
            return motoristaRepository.findAllByAtivo(ativo);
        }

        return motoristaRepository.findAll();
    }

    public Motorista buscarPorId(Long id) {
        return motoristaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Motorista não encontrada"));
    }

    public Motorista desativar(Long id) {
        Motorista motorista = buscarPorId(id);
        motorista.setAtivo(false);
        usuarioRepository.save(motorista);

        return motorista;
    }

    public UsuarioAutenticadoDTO cadastrar(UsuarioCadastroDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario;

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

}

