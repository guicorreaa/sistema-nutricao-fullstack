package br.com.anaprado.nutri_api.exceptions;

public class ItemRefeicaoNaoEncontradoException extends RuntimeException {
    public ItemRefeicaoNaoEncontradoException(String message) {
        super(message);
    }
}
