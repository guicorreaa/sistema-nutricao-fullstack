package br.com.anaprado.nutri_api.exceptions;

public class DadosDoClienteNaoEncontradosException extends RuntimeException {
    public DadosDoClienteNaoEncontradosException(String message) {
        super(message);
    }
}
