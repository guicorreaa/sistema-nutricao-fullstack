package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Subcategoria.CadastrarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.EditarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterAposEnviarSubcategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterTodasSubcategoriasDTO;
import br.com.anaprado.nutri_api.controller.mappers.SubcategoriaMapper;
import br.com.anaprado.nutri_api.exceptions.SubcategoriaSendoUsadaException;
import br.com.anaprado.nutri_api.model.Categoria;
import br.com.anaprado.nutri_api.model.Subcategoria;
import br.com.anaprado.nutri_api.repository.SubcategoriaRepository;
import br.com.anaprado.nutri_api.validator.CategoriaValidator;
import br.com.anaprado.nutri_api.validator.SubcategoriaValidator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubcategoriaService {

    private final SubcategoriaMapper subcategoriaMapper;
    private final SubcategoriaRepository subcategoriaRepository;
    private final SubcategoriaValidator subcategoriaValidator;

    private final CategoriaValidator categoriaValidator;

    public List<ObterTodasSubcategoriasDTO> obterTodasSubcategorias(Boolean ativo, Integer categoria_id) {
        return subcategoriaRepository.obterTodasSubcategorias(ativo, categoria_id);
    }

    @Transactional
    public ObterAposEnviarSubcategoriaDTO cadastrarSubcategoria(CadastrarSubcategoriaDTO cadastrarSubcategoriaDTO) {
        Categoria categoriaExistente = categoriaValidator.verificaSeCategoriaExiste(cadastrarSubcategoriaDTO.categoria_id());
        subcategoriaValidator.existeEssaSubcategoriaNessaCategoria(cadastrarSubcategoriaDTO.descricao(), cadastrarSubcategoriaDTO.categoria_id());

        Subcategoria subcategoria = subcategoriaMapper.cadastrarToEntity(cadastrarSubcategoriaDTO);
        subcategoria.setCategoria(categoriaExistente);
        Subcategoria cadastrado = subcategoriaRepository.save(subcategoria);

        return subcategoriaMapper.obterAposEnviar(cadastrado);
    }

    // Estou verificando se a subcategoria NÃO está sendo usada para permitir editar
    @Transactional
    public void editarSubcategoria(Integer subcategoriaId, EditarSubcategoriaDTO editarSubcategoriaDTO) {
        Subcategoria subcategoria = subcategoriaValidator.verificarSeSubcategoriaExiste(subcategoriaId);

        subcategoriaValidator.subcategoriaSendoUsada(subcategoriaId);
        subcategoriaValidator.existeEssaSubcategoriaNessaCategoria(editarSubcategoriaDTO.descricao(), editarSubcategoriaDTO.categoria_id());

        Subcategoria entidade = subcategoriaMapper.editarToEntity(editarSubcategoriaDTO, subcategoria);
        subcategoriaRepository.save(entidade);
    }

    public void excluirSubcategoria(Integer subcategoriaId) {
        Subcategoria subcategoria = subcategoriaValidator.verificarSeSubcategoriaExiste(subcategoriaId);

        subcategoriaValidator.subcategoriaSendoUsada(subcategoriaId);

        subcategoriaRepository.delete(subcategoria);
    }

}
