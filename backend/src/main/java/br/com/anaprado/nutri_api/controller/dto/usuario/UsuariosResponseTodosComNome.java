package br.com.anaprado.nutri_api.controller.dto.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.UUID;

public record UsuariosResponseTodosComNome(

        UUID usuario_id,

        @Schema(description = "Informe o e-mail do cliente", example = "email_cliente@exemplo.com")
        String email,

        @Schema(description = "Nome completo", example = "Guilherme Corrêa")
        String nome,

        @Schema(description = "Ativo", example = "true")
        Boolean ativo,

        @Schema(description = "Data de criação")
        LocalDateTime data_criacao,

        @Schema(description = "Telefone")
        String telefone

) {
}
