package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.CategoriaJaExisteException;
import br.com.anaprado.nutri_api.exceptions.CategoriaNaoEncontradaException;
import br.com.anaprado.nutri_api.exceptions.CategoriaSendoUsadaException;
import br.com.anaprado.nutri_api.model.Categoria;
import br.com.anaprado.nutri_api.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoriaValidator {

    private final CategoriaRepository categoriaRepository;

    public void verificarSeCategoriaJaEstaCadatrada(String categoriaDescricao){
        boolean categoria = categoriaRepository.existsByDescricaoIgnoreCase(categoriaDescricao);
        if (categoria) {
            throw new CategoriaJaExisteException("A categoria já existe no sistema!");
        }
    }

    public Categoria verificaSeCategoriaExiste(Integer categoria_id){
        return categoriaRepository.findById(categoria_id).orElseThrow(() -> new CategoriaNaoEncontradaException("Categoria não encontrada"));
    }

    public void verificarSeCategoriaEstaSendoUsadaAlimentos(Integer categoriaId){
        boolean sendoUsada = categoriaRepository.verificarSeCategSendoUsada(categoriaId);
        if (sendoUsada) {
            throw new CategoriaSendoUsadaException("Categoria em uso!");
        }
    }

    public void verificarSeCategoriaEstaSendoUsadaSubcategoria(Integer categoriaId) {
        boolean sendoUsada = categoriaRepository.verificarSeCategSendoUsadaSubcategoria(categoriaId);
        if (sendoUsada) {
            throw new CategoriaSendoUsadaException("Categoria em uso!");
        }
    }
}
