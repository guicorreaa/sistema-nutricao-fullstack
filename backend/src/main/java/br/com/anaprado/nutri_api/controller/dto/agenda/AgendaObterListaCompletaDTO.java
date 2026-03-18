package br.com.anaprado.nutri_api.controller.dto.agenda;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record AgendaObterListaCompletaDTO(
        @Schema(description = "ID único", example = "UUID")
        UUID consulta_id,

        @Schema(description = "Nome do paciente", example = "Guilherme")
        String nome,

        @Schema(description = "Celular", example = "19999999999")
        String celular,

        @Schema(description = "Telefone fixo", example = "1934219999")
        String telefone,

        @Schema(description = "E-mail", example = "email_cliente@exemplo.com")
        String email,

        @Schema(description = "Data", example = "dd/MM/yyyy")
        LocalDate data_consulta,

        @Schema(description = "Tipo", example = "Avaliação")
        String tipo_consulta,

        @Schema(description = "Horário", example = "HH:mm")
        LocalTime horario_consulta,

        @Schema(description = "Data do registro", example = "dd/MM/yyyy HH:mm")
        LocalDateTime data_agendamento,

        @Schema(description = "Cancelado?", example = "false")
        boolean cancelamento_cliente,

        @Schema(description = "Observações", example = "Paciente alérgico")
        String observacoes_consulta
) {
}
