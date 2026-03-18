package br.com.anaprado.nutri_api.exceptions;

public class DadoAntropometricoNaoEncontrado extends RuntimeException {
    public DadoAntropometricoNaoEncontrado(String message) {
        super(message);
    }
}
