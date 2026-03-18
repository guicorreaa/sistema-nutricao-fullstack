package br.com.anaprado.nutri_api.controller.dto.cliente;

import br.com.anaprado.nutri_api.model.SexoType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ClienteResponsePerfilDTO(

        @Schema(description = "Nome completo", example = "Guilherme Corrêa")
        String nome,

        @Schema(description = "Data de nascimento", example = "dd/MM/yyyy")
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataNascimento,

        @Schema(description = "Sexo")
        SexoType sexo,

        @Schema(description = "Objetivo nutricional", example = "Ganho de massa magra.")
        String objetivoNutricional,

        @Schema(description = "Ultima alteração feita")
        LocalDateTime ultimaAlteracao

) {
}
