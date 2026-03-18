package br.com.anaprado.nutri_api.exceptions;

public class AutenticacaoInvalida extends RuntimeException {
    public AutenticacaoInvalida(String message) {
        super(message);
    }
}
