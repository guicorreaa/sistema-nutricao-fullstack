package br.com.anaprado.nutri_api.exceptions;

public class RegistroDuplicadoException extends RuntimeException{
    public RegistroDuplicadoException(String message) {
        super(message);
    }
}
