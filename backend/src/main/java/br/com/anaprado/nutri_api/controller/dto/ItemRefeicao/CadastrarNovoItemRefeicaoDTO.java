package br.com.anaprado.nutri_api.controller.dto.ItemRefeicao;

import jakarta.validation.constraints.NotNull;
import org.aspectj.bridge.IMessage;

import java.math.BigDecimal;
import java.util.UUID;

public record CadastrarNovoItemRefeicaoDTO(

        @NotNull(message = "O campo refeicao_id é obrigatório!")
        UUID refeicao_id,

        @NotNull(message = "O campo alimento_id é obrigatório!")
        Integer alimento_id,

        String observacao,

        @NotNull(message = "O campo quantidade é obrigatório!")
        BigDecimal quantidadeGramas

) {
}
