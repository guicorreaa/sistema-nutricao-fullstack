package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.AlimentoJaCadastradoComoOpcionalException;
import br.com.anaprado.nutri_api.exceptions.AlimentoSelecionadoEOpcionalException;
import br.com.anaprado.nutri_api.repository.ItemRefeicaoSubstitutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ItemRefeicaoSubstitutoValidator {

    private final ItemRefeicaoSubstitutoRepository itemRefeicaoSubstitutoRepository;

    public void validarRegrasSubstituicao(UUID itemPrincipalId, Integer alimentoSubstitutoId) {

        // 1. Regra: Não pode adicionar substituto a um item que já é substituto
        if (itemRefeicaoSubstitutoRepository.isItemJaEhUmSubstituto(itemPrincipalId)) {
            throw new AlimentoSelecionadoEOpcionalException("Não é permitido adicionar substitutos a um item que já é opcional.");
        }

        // 2. Regra: Não permitir o mesmo alimento duplicado no mesmo item pai
        if (itemRefeicaoSubstitutoRepository.existsByItemPrincipalAndAlimentoSubstituto(itemPrincipalId, alimentoSubstitutoId)) {
            throw new AlimentoJaCadastradoComoOpcionalException("Este alimento já está cadastrado como substituto para este item.");
        }
    }

}



