package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.*;
import br.com.anaprado.nutri_api.controller.mappers.ItemRefeicaoMapper;
import br.com.anaprado.nutri_api.model.Alimentos;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.repository.ItemRefeicaoRepository;
import br.com.anaprado.nutri_api.validator.AlimentosValidator;
import br.com.anaprado.nutri_api.validator.DietaValidator;
import br.com.anaprado.nutri_api.validator.ItemRefeicaoValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemRefeicaoService {

    private final ItemRefeicaoValidator itemRefeicaoValidator;
    private final ItemRefeicaoMapper itemRefeicaoMapper;
    private final ItemRefeicaoRepository itemRefeicaoRepository;

    private final DietaValidator dietaValidator;
    private final AlimentosValidator alimentosValidator;

    public void cadastrarNovoItemRefeicao(CadastrarNovoItemRefeicaoDTO cadastrarNovoItemRefeicaoDTO) {
        Refeicao refeicaoExiste = itemRefeicaoValidator.verificarSeRefeicaoExiste(cadastrarNovoItemRefeicaoDTO.refeicao_id());
        Alimentos alimentoExiste = alimentosValidator.alimentoExiste(cadastrarNovoItemRefeicaoDTO.alimento_id());
        // Lança exceção se o alimento já estiver cadastrado
        itemRefeicaoValidator.verificarSeAlimentoEstaNaRefeicao(cadastrarNovoItemRefeicaoDTO.refeicao_id(), cadastrarNovoItemRefeicaoDTO.alimento_id());

        ItemRefeicao entidade = itemRefeicaoMapper.cadastrarToEntity(cadastrarNovoItemRefeicaoDTO);

        entidade.setRefeicao(refeicaoExiste);
        entidade.setAlimentos(alimentoExiste);
        itemRefeicaoRepository.save(entidade);
    }

    public void editarItem(UUID idItemRefeicao, @Valid EditarItemRefeicaoDTO editarItemRefeicaoDTO) {
        ItemRefeicao itemExiste = itemRefeicaoValidator.verificarItemRefeicaoExiste(idItemRefeicao);
        Alimentos alimentoExiste = alimentosValidator.alimentoExiste(editarItemRefeicaoDTO.alimento_id());

        itemRefeicaoMapper.editarToEntity(editarItemRefeicaoDTO, itemExiste);
        itemExiste.setAlimentos(alimentoExiste);

        itemRefeicaoRepository.save(itemExiste);
    }

    public List<ObterItensDaRefeicaoDTO> obterItensDaRefeicao(String refeicao_id) {
        UUID refeicao_id_formatado = UUID.fromString(refeicao_id);
        itemRefeicaoValidator.verificarSeRefeicaoExiste(refeicao_id_formatado);

        return itemRefeicaoRepository.findItensDaRefeicao(refeicao_id_formatado);
    }

    public void deletarItem(UUID idItemRefeicao) {
        ItemRefeicao itemExiste = itemRefeicaoValidator.verificarItemRefeicaoExiste(idItemRefeicao);
        itemRefeicaoRepository.delete(itemExiste);
    }

    public List<ObterItensDaRefeicaoCompletoDTO> obterAlimentosDaMesmaRefeicaoCompleto(UUID refeicaoId) {
        itemRefeicaoValidator.verificarSeRefeicaoExiste(refeicaoId);

        return itemRefeicaoRepository.findItensDaRefeicaoCompleto(refeicaoId);
    }

    public List<ObterTodosAlimentosTodasRefeicoes> obterTodosAlimentos(UUID dietaId) {
        dietaValidator.verificarSeDietaExiste(dietaId);

        return itemRefeicaoRepository.findTodosAlimentosRefeicoesDoDia(dietaId);
    }
}
