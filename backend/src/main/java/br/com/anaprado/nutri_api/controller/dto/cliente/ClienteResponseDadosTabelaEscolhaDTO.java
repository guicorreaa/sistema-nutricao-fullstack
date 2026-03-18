package br.com.anaprado.nutri_api.controller.dto.cliente;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record ClienteResponseDadosTabelaEscolhaDTO(

        @Schema(description = "Cliente ID")
        UUID clienteId,

        @Schema(description = "Nome completo", example = "Guilherme Corrêa")
        String nome,

        @Schema(description = "E-mail", example = "email@exemplo.com")
        String email

) {
}
