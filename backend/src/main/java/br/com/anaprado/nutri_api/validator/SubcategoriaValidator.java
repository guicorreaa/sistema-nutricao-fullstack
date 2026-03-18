package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.SubcategoriaJaExisteNessaCategoria;
import br.com.anaprado.nutri_api.exceptions.SubcategoriaNaoEncontradaException;
import br.com.anaprado.nutri_api.exceptions.SubcategoriaSendoUsadaException;
import br.com.anaprado.nutri_api.model.Subcategoria;
import br.com.anaprado.nutri_api.repository.SubcategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SubcategoriaValidator {

    private final SubcategoriaRepository subcategoriaRepository;

    public Subcategoria verificarSeSubcategoriaExiste(Integer subcategoria_id) {
        return subcategoriaRepository.findById(subcategoria_id).orElseThrow(() -> new SubcategoriaNaoEncontradaException("Subcategoria nao encontrada!"));
    }

    public void subcategoriaSendoUsada(Integer subcategoria_id) {
        boolean sendoUsado = subcategoriaRepository.verificarSubcategoriaEstaSendoUsada(subcategoria_id);
        if (sendoUsado) {
            throw new SubcategoriaSendoUsadaException("Subcategoria em uso!");
        }
    }

//    Validar se já existe essa subcategoria NESTA categoria
    public void existeEssaSubcategoriaNessaCategoria(String subcategoria, int categoriaId){
        boolean subDuplicada = subcategoriaRepository.existeDuplicada(subcategoria, categoriaId);
        if (subDuplicada) {
            throw new SubcategoriaJaExisteNessaCategoria("Essa subcategoria já existe dentro dessa categoria!");
        }
    }
}
