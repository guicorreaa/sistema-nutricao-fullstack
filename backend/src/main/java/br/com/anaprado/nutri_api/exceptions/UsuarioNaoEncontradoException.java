package br.com.anaprado.nutri_api.exceptions;

public class UsuarioNaoEncontradoException extends RuntimeException{
    public UsuarioNaoEncontradoException(String mensage){
        super(mensage);
    }
}
