package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Categoria.CadastrarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.EditarCategoriaAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterAposEnviarCategoriaDTO;
import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterTodasCategoriasDTO;
import br.com.anaprado.nutri_api.controller.mappers.CategoriaMapper;
import br.com.anaprado.nutri_api.exceptions.CategoriaNaoEncontradaException;
import br.com.anaprado.nutri_api.model.Categoria;
import br.com.anaprado.nutri_api.repository.CategoriaRepository;
import br.com.anaprado.nutri_api.validator.CategoriaValidator;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final CategoriaMapper categoriaMapper;
    private final CategoriaValidator categoriaValidator;

    public List<ObterTodasCategoriasDTO> obterTodasCategorias(boolean ativa) {
        return categoriaRepository.findAllCategorias(ativa);
    }

    @Transactional
    public ObterAposEnviarCategoriaDTO cadastrarNovaCategoria(CadastrarCategoriaAlimentoDTO cadastrarCategoriaAlimentoDTO) {
        Categoria categoriaEntidade = categoriaMapper.cadastrarToEntity(cadastrarCategoriaAlimentoDTO);
        categoriaValidator.verificarSeCategoriaJaEstaCadatrada(categoriaEntidade.getDescricao());
        Categoria entidadeSalva = categoriaRepository.save(categoriaEntidade);
        return categoriaMapper.obterAposEnviar(entidadeSalva);
    }

    @Transactional
    public void editarCategoria(Integer idCategoria, @Valid EditarCategoriaAlimentoDTO editarCategoriaAlimentoDTO) {
        Categoria categoriaExistente = categoriaValidator.verificaSeCategoriaExiste(idCategoria);
        categoriaValidator.verificarSeCategoriaEstaSendoUsadaAlimentos(idCategoria);
        categoriaValidator.verificarSeCategoriaEstaSendoUsadaSubcategoria(idCategoria);
        categoriaValidator.verificarSeCategoriaJaEstaCadatrada(editarCategoriaAlimentoDTO.descricao());

        Categoria categoriaEntidade = categoriaMapper.editarToEntity(editarCategoriaAlimentoDTO, categoriaExistente);
        categoriaRepository.save(categoriaEntidade);
    }

    public void excluirCategoria(Integer idCategoria) {
        Categoria categoriaExistente = categoriaValidator.verificaSeCategoriaExiste(idCategoria);
        categoriaValidator.verificarSeCategoriaEstaSendoUsadaAlimentos(idCategoria);
        categoriaValidator.verificarSeCategoriaEstaSendoUsadaSubcategoria(idCategoria);

        categoriaRepository.delete(categoriaExistente);

    }
}
