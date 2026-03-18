package br.com.anaprado.nutri_api.controller.dto.agenda;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendaCadastroRequestDTO(

        @Schema(description = "Nome completo do cliente", example = "Guilherme Corrêa")
        @NotBlank(message = "Campo nome obrigatório!")
        String nome,

        @Schema(description = "Celular", example = "19999999999")
        @NotBlank(message = "Campo celular obrigatório!")
        String celular,

        @Schema(description = "Telefone", example = "1934219999")
        String telefone,

        @Schema(description = "Email", example = "seu_email@exemplo.com")
        String email,

        @Schema(description = "Data a realizar a consulta", example = "dd/MM/yyyy")
        @NotNull(message = "Campo data_consulta obrigatório!")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        LocalDate data_consulta,

        @Schema(description = "Horário da consulta", example = "HH:mm")
        @NotNull(message = "Campo horario_consulta obrigatório!")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
        LocalTime horario_consulta,

        @Schema(description = "Tipo da consulta", example = "Avaliação")
        @NotBlank(message = "Campo tipo_consulta obrigatório!")
        String tipo_consulta,

        @Schema(description = "Cancelar consulta", example = "true")
        boolean cancelamento_cliente,

        @Schema(description = "Observação", example = "O paciente pode atrasar um pouco.")
        String observacoes_consulta

) {
}
