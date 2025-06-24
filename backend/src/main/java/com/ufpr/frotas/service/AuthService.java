package com.ufpr.frotas.service;

import com.ufpr.frotas.dto.CnhDTO;
import com.ufpr.frotas.dto.EnderecoDTO;
import com.ufpr.frotas.dto.UsuarioAutenticadoDTO;
import com.ufpr.frotas.dto.UsuarioCadastroDTO;
import com.ufpr.frotas.model.entity.Admin;
import com.ufpr.frotas.model.entity.Cnh;
import com.ufpr.frotas.model.entity.Endereco;
import com.ufpr.frotas.model.entity.Motorista;
import com.ufpr.frotas.model.enums.PerfilUsuario;
import com.ufpr.frotas.repository.AdminRepository;
import com.ufpr.frotas.repository.MotoristaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
                return Optional.of(new UsuarioAutenticadoDTO(admin.getId(), admin.getNome(), email, PerfilUsuario.ADMIN));
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

    public byte[] hashSenha(String senha, byte[] salt) throws Exception {
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

    private Cnh mapearCnhDTO(CnhDTO dto) {
        if (dto == null) return null;

        Cnh cnh = new Cnh();
        cnh.setNumCnh(dto.getNumCnh());
        cnh.setCategoria(dto.getCategoria());

        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

        if (dto.getValidade() != null && !dto.getValidade().isBlank()) {
            cnh.setValidade(LocalDate.parse(dto.getValidade(), formatter));
        }

        return cnh;
    }

    public Motorista cadastrarMotorista(UsuarioCadastroDTO dto) throws Exception {
        Motorista motorista = new Motorista();
        motorista.setNome(dto.getNome());
        motorista.setEmail(dto.getEmail());
        motorista.setTelefone(dto.getTelefone());
        motorista.setCpf(dto.getCpf());

        String senhaCripto = gerarSenhaHashComSalt(dto.getSenha());
        motorista.setSenha(senhaCripto);

        Endereco endereco = mapearEnderecoDTO(dto.getEndereco());
        motorista.setEndereco(endereco);

        Cnh cnh = mapearCnhDTO(dto.getCnh());
        motorista.setCnh(cnh);

        return motoristaRepository.save(motorista);
    }

    private Endereco mapearEnderecoDTO(EnderecoDTO dto) {
        if (dto == null) return null;
        Endereco endereco = new Endereco();
        endereco.setLogradouro(dto.getLogradouro());
        endereco.setNumero(dto.getNumero());
        endereco.setComplemento(dto.getComplemento());
        endereco.setBairro(dto.getBairro());
        endereco.setCidade(dto.getCidade());
        endereco.setEstado(dto.getEstado());
        endereco.setCep(dto.getCep());
        return endereco;
    }

}
