package br.com.anaprado.nutri_api.controller.dto.Refeicao;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;
import java.util.UUID;

public record EditarRefeicaoDTO(


        @NotNull(message = "Campo horário obrigatório.")
        @Schema(description = "Horário da refeição", example = "HH:mm:ss")
        LocalTime horario,

        @NotNull(message = "Campo dieta_id obrigatório.")
        UUID dieta_id,

        @NotNull(message = "Campo tipo_id obrigatório.")
        Integer tipo_id,

        String observacao

) {
}
