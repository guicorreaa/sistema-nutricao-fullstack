package br.com.anaprado.nutri_api.controller.dto.Refeicao;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalTime;
import java.util.UUID;

public record ExibirDadosDaRefeicaoCompletaDTO(

        UUID refeicao_id,

        @Schema(description = "Horário da refeição", example = "HH:mm:ss")
        LocalTime horario,

        UUID dieta_id,

        String nome_dieta,

        Integer tipo_id,

        String descricao_tipo_refeicao,

        String observacao

) {
}
