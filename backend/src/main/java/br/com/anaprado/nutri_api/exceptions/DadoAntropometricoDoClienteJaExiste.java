package br.com.anaprado.nutri_api.exceptions;

public class DadoAntropometricoDoClienteJaExiste extends RuntimeException {
    public DadoAntropometricoDoClienteJaExiste(String message) {
        super(message);
    }
}
