package br.com.anaprado.nutri_api.exceptions;

public class UsuarioJaCadastradoEmCliente extends RuntimeException {
    public UsuarioJaCadastradoEmCliente(String message) {
        super(message);
    }
}
