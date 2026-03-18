package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.AlimentoRepetidoNaRefeicaoException;
import br.com.anaprado.nutri_api.exceptions.ItemRefeicaoNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.RefeicaoNaoEncontradaException;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import br.com.anaprado.nutri_api.model.Refeicao;
import br.com.anaprado.nutri_api.repository.AlimentoRepository;
import br.com.anaprado.nutri_api.repository.ItemRefeicaoRepository;
import br.com.anaprado.nutri_api.repository.RefeicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ItemRefeicaoValidator {

    private final RefeicaoRepository refeicaoRepository;
    private final AlimentoRepository alimentoRepository;
    private final ItemRefeicaoRepository itemRefeicaoRepository;

    public Refeicao verificarSeRefeicaoExiste(UUID refeicao_id) {
        return refeicaoRepository.findById(refeicao_id).orElseThrow(() -> new RefeicaoNaoEncontradaException("A refeição não foi encontrada."));
    }

    public ItemRefeicao verificarItemRefeicaoExiste(UUID id_item_refeicao) {
        return itemRefeicaoRepository.findById(id_item_refeicao).orElseThrow(() -> new ItemRefeicaoNaoEncontradoException("Não foi encontrado o item principal."));
    }

    public void verificarSeAlimentoEstaNaRefeicao(UUID refeicaoId, int alimentoId) {
        Optional<ItemRefeicao> alimentoJaCadastrado = itemRefeicaoRepository.findItemNaRefeicao(refeicaoId, alimentoId);
        if (alimentoJaCadastrado.isPresent()) {
            throw new AlimentoRepetidoNaRefeicaoException("O alimento já foi inscrito na refeição.");
        }
    }

}
