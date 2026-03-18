package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.security.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class LogoutService {

    private final TokenBlacklistService tokenBlacklistService;
    private final TokenService tokenService;

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String token = extrairTokenDoCookie(request);

        if (token != null) {
            // pega a expiração real do token
            Instant expiracao = tokenService.pegarExpiracao(token);
            long segundosRestantes = expiracao.getEpochSecond() - Instant.now().getEpochSecond();
            tokenBlacklistService.invalidateToken(token, segundosRestantes);

            // remove o cookie do navegador
            removerCookie(response);
        }
    }

    private String extrairTokenDoCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private void removerCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // deixe true se usar HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // expira imediatamente
        response.addCookie(cookie);
    }
}
