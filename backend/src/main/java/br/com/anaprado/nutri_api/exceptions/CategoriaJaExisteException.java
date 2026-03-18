package br.com.anaprado.nutri_api.exceptions;

public class CategoriaJaExisteException extends RuntimeException {
    public CategoriaJaExisteException(String message) {
        super(message);
    }
}
