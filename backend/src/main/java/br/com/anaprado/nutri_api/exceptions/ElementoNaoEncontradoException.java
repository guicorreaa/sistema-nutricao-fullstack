package br.com.anaprado.nutri_api.exceptions;

import org.springframework.data.crossstore.ChangeSetPersister;

public class ElementoNaoEncontradoException extends  RuntimeException{

    public ElementoNaoEncontradoException(String message) {
        super(message);
    }
}
