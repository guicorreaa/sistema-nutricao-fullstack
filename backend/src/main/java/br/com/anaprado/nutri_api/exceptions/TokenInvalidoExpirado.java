package br.com.anaprado.nutri_api.exceptions;

public class TokenInvalidoExpirado extends RuntimeException {
    public TokenInvalidoExpirado(String message) {
        super(message);
    }
}
