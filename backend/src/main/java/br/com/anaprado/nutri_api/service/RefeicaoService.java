package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.Refeicao.*;
import br.com.anaprado.nutri_api.controller.mappers.RefeicaoMapper;
import br.com.anaprado.nutri_api.model.Dieta;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.model.TipoRefeicao;
import br.com.anaprado.nutri_api.repository.RefeicaoRepository;
import br.com.anaprado.nutri_api.validator.DietaValidator;
import br.com.anaprado.nutri_api.validator.RefeicaoValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefeicaoService {

    private final RefeicaoRepository refeicaoRepository;
    private final RefeicaoValidator refeicaoValidator;
    private final RefeicaoMapper refeicaoMapper;

    private final DietaValidator dietaValidator;

    public ExibirRefeicaoAposCadastrarDTO cadastrarNovaRefeicao(CadastrarRefeicaoDTO cadastrarRefeicaoDTO) {
        Dieta dietaExiste = dietaValidator.verificarSeDietaExiste(cadastrarRefeicaoDTO.dieta_id());
        TipoRefeicao tipoRefeicaoExiste = refeicaoValidator.verificarSeTipoRefeicaoExiste(cadastrarRefeicaoDTO.tipo_id());

        Refeicao entidade = refeicaoMapper.cadastrarToEntity(cadastrarRefeicaoDTO);
        entidade.setDieta(dietaExiste);
        entidade.setTipoRefeicao(tipoRefeicaoExiste);
        Refeicao refeicaoSalva = refeicaoRepository.save(entidade);
        return refeicaoMapper.exibirAposCadastrarToDTO(refeicaoSalva);
    }

    public void editarRefeicao(UUID refeicaoId, EditarRefeicaoDTO editarRefeicaoDTO) {
        Refeicao refeicaoExiste = refeicaoValidator.verificarSeRefeicaoExiste(refeicaoId);

        // Só valida e seta se o campo veio preenchido
        if (editarRefeicaoDTO.dieta_id() != null) {
            Dieta dietaExiste = dietaValidator.verificarSeDietaExiste(editarRefeicaoDTO.dieta_id());
            refeicaoExiste.setDieta(dietaExiste);
        }

        if (editarRefeicaoDTO.tipo_id() != null) {
            TipoRefeicao tipoRefeicaoExiste = refeicaoValidator.verificarSeTipoRefeicaoExiste(editarRefeicaoDTO.tipo_id());
            refeicaoExiste.setTipoRefeicao(tipoRefeicaoExiste);
        }

        // Atualiza apenas os campos permitidos no mapper
        refeicaoMapper.editarToEntity(editarRefeicaoDTO, refeicaoExiste);
        refeicaoRepository.save(refeicaoExiste);

    }

    public void deletarRefeicao(UUID refeicaoId) {
        Refeicao refeicaoExiste = refeicaoValidator.verificarSeRefeicaoExiste(refeicaoId);
        refeicaoRepository.delete(refeicaoExiste);
    }

    public List<ExibirRefeicoesEspecificoSimplesDTO> obterTodasRefeicoesEspecifico(UUID dietaId) {
        List<RefeicaoSumarizada> refeicao = refeicaoRepository.obterTodasRefeicoesPessoaEspecifica(dietaId);
        return refeicaoMapper.RefeicaoSumarizadaToDTO(refeicao);
    }

    public List<ExibirDadosDaRefeicaoCompletaDTO> exibirRefeicaoCompleta(UUID refeicaoId) {
        return refeicaoRepository.obterInformacoesCompletaDaRefeicao(refeicaoId);
    }
}
