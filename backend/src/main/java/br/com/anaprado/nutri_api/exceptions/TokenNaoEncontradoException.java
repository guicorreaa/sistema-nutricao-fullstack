package br.com.anaprado.nutri_api.exceptions;

public class TokenNaoEncontradoException extends RuntimeException {
    public TokenNaoEncontradoException(String message) {
        super(message);
    }
}
