package com.ufpr.frotas.security.crypto.password.PasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class Sha256SaltPasswordEncoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        try {
            byte[] salt = new byte[16];
            new SecureRandom().nextBytes(salt);
            byte[] hash = hashSenha(rawPassword.toString(), salt);
            return Base64.getEncoder().encodeToString(hash) + ":" + Base64.getEncoder().encodeToString(salt);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        try {
            String[] parts = encodedPassword.split(":");
            if (parts.length != 2) return false;

            byte[] hashArmazenado = Base64.getDecoder().decode(parts[0]);
            byte[] salt = Base64.getDecoder().decode(parts[1]);

            byte[] hashDigitado = hashSenha(rawPassword.toString(), salt);

            return MessageDigest.isEqual(hashArmazenado, hashDigitado);
        } catch (Exception e) {
            return false;
        }
    }

    private byte[] hashSenha(String senha, byte[] salt) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt);
        return md.digest(senha.getBytes());
    }
}
