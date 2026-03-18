package br.com.anaprado.nutri_api.controller.dto.Dieta;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.UUID;

public record EditarDietaDTO(

        String nome_dieta,

        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        @Schema(description = "Data de ínicio da dieta", example = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime data_inicio,

        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        @Schema(description = "Data do final da dieta", example = "dd/MM/yyyy HH:mm:ss")
        LocalDateTime data_final

) {
}
