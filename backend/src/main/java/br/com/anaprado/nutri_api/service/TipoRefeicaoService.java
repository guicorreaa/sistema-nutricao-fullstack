package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.exceptions.TipoRefeicaoNaoEncontradoException;
import br.com.anaprado.nutri_api.model.TipoRefeicao;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.CadastrarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.EditarTipoRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.TodosTiposRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.mappers.TipoRefeicaoMapper;
import br.com.anaprado.nutri_api.repository.TipoRefeicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoRefeicaoService {

    private final TipoRefeicaoRepository tipoRefeicaoRepository;
    private final TipoRefeicaoMapper tipoRefeicaoMapper;

    public List<TodosTiposRefeicaoDTO> obterTodosTipos(boolean ativo) {
        return tipoRefeicaoRepository.findAllTipos(ativo);
    }

    public void cadastrarNovoTipo(CadastrarTipoRefeicaoDTO cadastrarTipoRefeicaoDTO) {
        TipoRefeicao tipoParaCadastrar = tipoRefeicaoMapper.cadastrarToEntity(cadastrarTipoRefeicaoDTO);
        tipoRefeicaoRepository.save(tipoParaCadastrar);
    }

    public void editarTipoRefeicao(Integer tipo_id, EditarTipoRefeicaoDTO editarTipoRefeicaoDTO) {
        TipoRefeicao tipoExistente = tipoRefeicaoRepository.findById(tipo_id).orElseThrow(() -> new TipoRefeicaoNaoEncontradoException("Tipo refeição não encontrado."));
        tipoRefeicaoMapper.editarToEntity(editarTipoRefeicaoDTO, tipoExistente);
        tipoRefeicaoRepository.save(tipoExistente);
    }
}
