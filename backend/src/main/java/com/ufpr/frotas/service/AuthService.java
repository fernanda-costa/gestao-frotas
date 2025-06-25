package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.entity.Admin;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.entity.Endereco;
import com.ufpr.frotas.model.entity.Cnh;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.repository.AdminRepository;
import com.ufpr.frotas.repository.MotoristaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;

import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final MotoristaRepository motoristaRepository;

    public Optional<UsuarioAutenticadoDTO> login(String email, String senha) throws Exception {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (verificarSenha(senha, admin.getSenha())) {
                return Optional.of(new UsuarioAutenticadoDTO(admin.getId(), admin.getNome(), email, PerfilUsuario.ADMINISTRADOR));
            }
            return Optional.empty();
        }

        Optional<Motorista> motOpt = motoristaRepository.findByEmail(email);
        if (motOpt.isPresent()) {
            Motorista motorista = motOpt.get();
            if (verificarSenha(senha, motorista.getSenha())) {
                return Optional.of(new UsuarioAutenticadoDTO(motorista.getId(), motorista.getNome(), email, PerfilUsuario.MOTORISTA));
            }
            return Optional.empty();
        }

        return Optional.empty();
    }

    private boolean verificarSenha(String senhaDigitada, String senhaArmazenada) throws Exception {
        String[] parts = senhaArmazenada.split(":");
        if (parts.length != 2) return false;

        byte[] hashArmazenado = Base64.getDecoder().decode(parts[0]);
        byte[] salt = Base64.getDecoder().decode(parts[1]);

        byte[] hashDigitado = hashSenha(senhaDigitada, salt);

        return MessageDigest.isEqual(hashArmazenado, hashDigitado);
    }

    private byte[] hashSenha(String senha, byte[] salt) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt);
        return md.digest(senha.getBytes(StandardCharsets.UTF_8));
    }

    public String gerarSenhaHashComSalt(String senha) throws Exception {
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        byte[] hash = hashSenha(senha, salt);

        return Base64.getEncoder().encodeToString(hash) + ":" + Base64.getEncoder().encodeToString(salt);
    }

    public Admin cadastrarAdmin(UsuarioCadastroDTO dto) throws Exception {
        Admin admin = new Admin();
        admin.setNome(dto.getNome());
        admin.setEmail(dto.getEmail());
        admin.setTelefone(dto.getTelefone());
        String senhaCripto = gerarSenhaHashComSalt(dto.getSenha());
        admin.setSenha(senhaCripto);
        return adminRepository.save(admin);
    }

    public Motorista cadastrarMotorista(UsuarioCadastroDTO dto) throws Exception {
        Motorista motorista = new Motorista();
        motorista.setNome(dto.getNome());
        motorista.setEmail(dto.getEmail());
        motorista.setTelefone(dto.getTelefone());
        motorista.setCpf(dto.getCpf());

        String senhaCripto = gerarSenhaHashComSalt(dto.getSenha());
        motorista.setSenha(senhaCripto);

        if(dto.getCnh() != null) {
            Cnh cnh = new Cnh();
            cnh.setNumCnh(dto.getCnh().getNumCnh());
            cnh.setCategoria(dto.getCnh().getCategoria());
            cnh.setDataEmissao(dto.getCnh().getDataEmissao());

            if (dto.getCnh().getValidade() != null) {
                cnh.setValidade(dto.getCnh().getValidade());
            }

            cnh.setOrgaoEmissor(dto.getCnh().getOrgaoEmissor());
            motorista.setCnh(cnh);
        }

        if(dto.getEndereco() != null) {
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

        return motoristaRepository.save(motorista);
    }
}
