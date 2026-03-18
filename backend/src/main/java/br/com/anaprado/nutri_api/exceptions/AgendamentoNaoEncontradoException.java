package br.com.anaprado.nutri_api.exceptions;

public class AgendamentoNaoEncontradoException extends RuntimeException {
    public AgendamentoNaoEncontradoException(String message) {
        super(message);
    }
}
