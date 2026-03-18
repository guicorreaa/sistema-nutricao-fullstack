package br.com.anaprado.nutri_api.exceptions;

public class RefeicaoNaoEncontradaException extends RuntimeException {
    public RefeicaoNaoEncontradaException(String message) {
        super(message);
    }
}
