package br.com.anaprado.nutri_api.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    // token → tempo de expiração
    private final Map<String, Instant> invalidatedTokens = new ConcurrentHashMap<>();

    /**
     * Adiciona o token à blacklist e define quando ele deve expirar da memória.
     */
    public void invalidateToken(String token, long expirationInSeconds) {
        Instant expirationTime = Instant.now().plusSeconds(expirationInSeconds);
        invalidatedTokens.put(token, expirationTime);
    }

    /**
     * Verifica se o token foi invalidado e limpa os expirados automaticamente.
     */
    public boolean isTokenInvalid(String token) {
        Instant expiration = invalidatedTokens.get(token);

        if (expiration == null) {
            return false;
        }

        // Se já passou do tempo de expiração, remove e libera memória
        if (Instant.now().isAfter(expiration)) {
            invalidatedTokens.remove(token);
            return false;
        }

        return true;
    }
}