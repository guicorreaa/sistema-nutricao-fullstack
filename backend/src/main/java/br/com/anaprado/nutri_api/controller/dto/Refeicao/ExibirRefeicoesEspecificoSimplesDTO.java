package br.com.anaprado.nutri_api.controller.dto.Refeicao;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalTime;
import java.util.UUID;

public record ExibirRefeicoesEspecificoSimplesDTO(

        UUID refeicao_id,

        @Schema(description = "Horário da refeição", example = "HH:mm:ss")
        LocalTime horario,

        String nome_dieta,

        String descricao,

        String observacao,

        // totais calculados
        Double total_kcal,
        Double total_prot,
        Double total_carbo,
        Double total_lip

) {
}
