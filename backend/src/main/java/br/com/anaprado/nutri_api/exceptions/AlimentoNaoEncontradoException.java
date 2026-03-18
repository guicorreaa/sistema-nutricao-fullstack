package br.com.anaprado.nutri_api.exceptions;

public class AlimentoNaoEncontradoException extends RuntimeException {
    public AlimentoNaoEncontradoException(String message) {
        super(message);
    }
}
