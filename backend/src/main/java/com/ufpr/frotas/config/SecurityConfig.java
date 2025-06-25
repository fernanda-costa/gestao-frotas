package com.ufpr.frotas.config;

import com.ufpr.frotas.security.UsuarioDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final UsuarioDetailsService usuarioDetailsService;

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers("/api/usuarios/cadastrar").hasRole("ADMINISTRADOR")
//                        .anyRequest().authenticated()
//                )
//                .cors(cors -> Customizer.withDefaults())
//                .httpBasic(withDefaults());
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .cors(cors -> Customizer.withDefaults())

                .httpBasic(withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:4200"));  // frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

        authBuilder.userDetailsService(usuarioDetailsService)
                .passwordEncoder(passwordEncoder());

        return authBuilder.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Sha256SaltPasswordEncoder();
    }

    public static class Sha256SaltPasswordEncoder implements PasswordEncoder {

        @Override
        public String encode(CharSequence rawPassword) {
            try {
                byte[] salt = new byte[16];
                new SecureRandom().nextBytes(salt);
                byte[] hash = hashSenha(rawPassword.toString(), salt);
                return Base64.getEncoder().encodeToString(hash) + ":" + Base64.getEncoder().encodeToString(salt);
            } catch (Exception e) {
                throw new RuntimeException("Erro ao gerar hash da senha", e);
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
}
