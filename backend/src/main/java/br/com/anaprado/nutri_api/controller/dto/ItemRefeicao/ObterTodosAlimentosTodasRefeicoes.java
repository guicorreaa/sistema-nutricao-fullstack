package br.com.anaprado.nutri_api.controller.dto.ItemRefeicao;

import java.math.BigDecimal;
import java.util.UUID;

public record ObterTodosAlimentosTodasRefeicoes(

        UUID id_item_refeicao,
        UUID refeicao_id,
        Integer alimento_id,
        String nome_alimento,
        Double energia_kcal,
        Double proteina,
        Double carboidrato,
        Double lipidios,
        Double fibra_alimentar,
        Double sodio,
        Double potassio,
        Double calcio,
        Double ferro,
        Double vitamina_c,
        BigDecimal quantidadeGramas,
        String observacao

) {
}
