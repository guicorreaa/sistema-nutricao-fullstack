package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.PageUtils;
import br.com.anaprado.nutri_api.controller.dto.Alimento.CadastrarAlimentoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.EditarAlimentosDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentoEspecificoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentosSimplesDTO;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.mappers.AlimentoMapper;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.model.Categoria;
import br.com.anaprado.nutri_api.model.Subcategoria;
import br.com.anaprado.nutri_api.repository.AlimentoRepository;
import br.com.anaprado.nutri_api.validator.AlimentosValidator;
import br.com.anaprado.nutri_api.validator.CategoriaValidator;
import br.com.anaprado.nutri_api.validator.SubcategoriaValidator;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlimentoService {

    private final AlimentoMapper alimentoMapper;
    private final AlimentosValidator alimentosValidator;
    private final AlimentoRepository alimentosRepository;

    private final CategoriaValidator categoriaValidator;
    private final SubcategoriaValidator subcategoriaValidator;

    @Transactional
    public void cadastrarNovoAlimento(CadastrarAlimentoDTO cadastrarAlimentoDTO) {
        Categoria categoriaExistente = categoriaValidator.verificaSeCategoriaExiste(cadastrarAlimentoDTO.categoria_id());
        Subcategoria subcategoriaExiste = subcategoriaValidator.verificarSeSubcategoriaExiste(cadastrarAlimentoDTO.subcategoria_id());

        Alimentos entidadeAlimento = alimentoMapper.cadastrarToEntity(cadastrarAlimentoDTO);
        entidadeAlimento.setCategoria(categoriaExistente);
        entidadeAlimento.setSubcategoria(subcategoriaExiste);
        entidadeAlimento.setCriado_por_usuario(true);
        entidadeAlimento.setAtivo(true);

        alimentosRepository.save(entidadeAlimento);
    }

    @Transactional
    public void editarAlimento(Integer idAlimento, @Valid EditarAlimentosDTO editarAlimentosDTO) {
        Alimentos alimentoExiste = alimentosValidator.alimentoExiste(idAlimento);
        Categoria categoriaExistente = categoriaValidator.verificaSeCategoriaExiste(editarAlimentosDTO.categoria_id());
        Subcategoria subcategoriaExiste = subcategoriaValidator.verificarSeSubcategoriaExiste(editarAlimentosDTO.subcategoria_id());
        Alimentos alimentoAtualizado = alimentoMapper.editarToEntity(editarAlimentosDTO, alimentoExiste);

        alimentoAtualizado.setCategoria(categoriaExistente);
        alimentoAtualizado.setSubcategoria(subcategoriaExiste);

        alimentosRepository.save(alimentoAtualizado);
    }

    //No caso no front end eu preciso mandar a requisição subsitituindo o nome_alimento, onde todos os % viram %25
    public PageResponse<ObterAlimentosSimplesDTO> obterAlimentosTabelaPrincipal(
            Boolean ativo,
            Integer categoria_id,
            Integer subcategoria_id,
            String nome_alimento,
            Pageable pageable) {

        if (nome_alimento != null) {
            nome_alimento = "%" + nome_alimento + "%";
        }

        Page<ObterAlimentosSimplesDTO> page = alimentosRepository.findAllAlimentosDadosSimples(
                ativo,
                categoria_id,
                subcategoria_id,
                nome_alimento,
                pageable
                );

        return PageUtils.from(page);
    }

    public ObterAlimentoEspecificoDTO obterAlimentoEspecifico(Integer alimentoId) {
        Alimentos alimentoExiste = alimentosValidator.alimentoExiste(alimentoId);
        return alimentosRepository.obterAlimentoEspecifico(alimentoExiste.getAlimento_id());
    }
}
