package br.com.anaprado.nutri_api.exceptions;

public class DietaNaoEncontradaException extends RuntimeException {
    public DietaNaoEncontradaException(String message) {
        super(message);
    }
}
