package br.com.anaprado.nutri_api.exceptions;

public class SubcategoriaJaExisteNessaCategoria extends RuntimeException {
    public SubcategoriaJaExisteNessaCategoria(String message) {
        super(message);
    }
}
