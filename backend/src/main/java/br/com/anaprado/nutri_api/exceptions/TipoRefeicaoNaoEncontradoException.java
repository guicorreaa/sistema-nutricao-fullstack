package br.com.anaprado.nutri_api.exceptions;

public class TipoRefeicaoNaoEncontradoException extends RuntimeException {
    public TipoRefeicaoNaoEncontradoException(String message) {
        super(message);
    }
}
