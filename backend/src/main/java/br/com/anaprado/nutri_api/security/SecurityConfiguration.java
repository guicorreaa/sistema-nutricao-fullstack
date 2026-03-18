package br.com.anaprado.nutri_api.security;

import br.com.anaprado.nutri_api.config.SecretConfig;
import br.com.anaprado.nutri_api.exceptions.AcessoNegado;
import br.com.anaprado.nutri_api.exceptions.TokenInvalidoAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private final FiltroSeguraca filtroSeguraca;
    private final AcessoNegado acessoNegado;
    private final TokenInvalidoAuthenticationEntryPoint tokenInvalidoAuthenticationEntryPoint;
    private final ContentSecurityPolicyFilter cspFilter;
    private final SecretConfig secretConfig;

    // --- 1. CONFIGURAÇÃO EXCLUSIVA PARA O SWAGGER (ISOLADA) ---
    @Bean
    @Order(1)
    public SecurityFilterChain swaggerSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 1. Ampliamos o matcher para pegar TUDO do swagger
                .securityMatcher("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html", "/webjars/**", "/swagger-resources/**")
                .csrf(csrf -> csrf.disable())
                // 2. Garante que ele peça o login básico (aquela janelinha do navegador)
                .httpBasic(basic -> {})
                .authorizeHttpRequests(auth -> auth.anyRequest().hasRole("ADMIN"))
                // 3. Forçamos o uso do serviço em memória AQUI
                .userDetailsService(swaggerUserDetailsService())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(List.of("https://localhost:3000"));
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfiguration.setAllowedHeaders(List.of("*"));
                    corsConfiguration.setAllowCredentials(true);
                    return corsConfiguration;
                }))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/definir-senha").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/logout").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(tokenInvalidoAuthenticationEntryPoint)
                        .accessDeniedHandler(acessoNegado))
                .addFilterBefore(cspFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(filtroSeguraca, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Serviço que só conhece o usuário do Docker Secret
    private UserDetailsService swaggerUserDetailsService() {
        return username -> {
            String userDoc = secretConfig.getSecret("USER_DOC");
            String passDoc = secretConfig.getSecret("PASS_DOC");

            if (userDoc != null && userDoc.equals(username)) {
                return User.builder()
                        .username(userDoc)
                        // O Spring pegará o "minhasenha!", fará o encode e
                        // guardará o hash na memória para comparar com o que você digitar
                        .password(passwordEncoder().encode(passDoc))
                        .roles("ADMIN")
                        .build();
            }
            throw new UsernameNotFoundException("Usuário inválido");
        };
    }
}