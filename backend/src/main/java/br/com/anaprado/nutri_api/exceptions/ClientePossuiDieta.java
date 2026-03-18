package br.com.anaprado.nutri_api.exceptions;

public class ClientePossuiDieta extends RuntimeException {
    public ClientePossuiDieta(String message) {
        super(message);
    }
}
