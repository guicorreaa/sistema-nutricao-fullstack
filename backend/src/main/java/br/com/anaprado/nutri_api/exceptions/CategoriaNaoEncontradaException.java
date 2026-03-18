package br.com.anaprado.nutri_api.exceptions;

public class CategoriaNaoEncontradaException extends RuntimeException {
    public CategoriaNaoEncontradaException(String message) {
        super(message);
    }
}
