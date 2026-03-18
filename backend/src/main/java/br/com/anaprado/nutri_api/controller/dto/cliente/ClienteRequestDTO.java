package br.com.anaprado.nutri_api.controller.dto.cliente;

import br.com.anaprado.nutri_api.model.SexoType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ClienteRequestDTO(

        @NotBlank(message = "Campo nome obrigatório!")
        @Schema(description = "Nome completo", example = "Guilherme Corrêa")
        String nome,

        @NotNull(message = "Campo dataNascimento obrigatório!")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        @Past(message = "A data de nascimento deve ser uma data válida no passado")
        @Schema(description = "Data de nascimento", example = "dd/MM/yyyy")
        LocalDate dataNascimento,

        @Schema(description = "Sexo", example = "M ou F")
        SexoType sexo,

        @NotBlank(message = "Campo objetivoNutricional obrigatório!")
        @Schema(description = "Objetivo nutricional", example = "Ganho de massa magra.")
        String objetivoNutricional
) {
}
