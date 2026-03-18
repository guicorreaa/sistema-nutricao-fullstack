package br.com.anaprado.nutri_api.controller.dto.ItemRefeicao;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record EditarItemRefeicaoDTO(

        @NotNull(message = "O campo alimento_id é obrigatório!")
        Integer alimento_id,

        String observacao,

        @NotNull(message = "O campo quantidade é obrigatório!")
        BigDecimal quantidadeGramas

) {
}
