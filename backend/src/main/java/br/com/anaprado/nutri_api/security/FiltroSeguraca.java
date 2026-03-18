package br.com.anaprado.nutri_api.security;

import br.com.anaprado.nutri_api.config.UserDetailsImpl;
import br.com.anaprado.nutri_api.exceptions.TokenInvalidoExpirado;
import br.com.anaprado.nutri_api.model.Usuario;
import br.com.anaprado.nutri_api.repository.UsuarioRepository;
import br.com.anaprado.nutri_api.service.TokenBlacklistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class FiltroSeguraca extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    private final TokenBlacklistService tokenBlacklistService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            var token = this.recuperarToken(request);

            if (token != null && !tokenBlacklistService.isTokenInvalid(token)) {

                UUID usuarioId = tokenService.validarToken(token);

                // ← SE O USUÁRIO NÃO EXISTIR → ERRO DE TOKEN
                Usuario usuario = usuarioRepository.findById(usuarioId)
                        .orElseThrow(() -> new TokenInvalidoExpirado("Usuário não encontrado para este token."));

                UserDetailsImpl userDetails = new UserDetailsImpl(usuario);

                var autenticacao = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(autenticacao);
            }

            filterChain.doFilter(request, response);

        } catch (TokenInvalidoExpirado e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"erro\":\"Token inválido ou expirado\",\"mensagem\":\"" + e.getMessage() + "\"}"
            );
            return;
        } catch (Exception e) {
            throw e; // <--- AQUI ESTÁ A CORREÇÃO
        }
    }

    private String recuperarToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        // Se a requisição for para o Swagger, o filtro de JWT nem tenta rodar
        return path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/webjars");
    }

}
