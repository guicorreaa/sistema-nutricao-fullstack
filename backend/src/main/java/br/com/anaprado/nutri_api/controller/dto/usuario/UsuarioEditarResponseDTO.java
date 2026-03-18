package br.com.anaprado.nutri_api.controller.dto.usuario;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioEditarResponseDTO(

        @NotBlank(message = "Campo e-mail obrigatório!")
        @Schema(description = "Informe o e-mail do cliente", example = "email_cliente@exemplo.com")
        String email,

        @NotNull(message = "Campo ativo obrigatório!")
        @Schema(description = "Informe se o cliente está ativo!", example = "true")
        Boolean ativo,

        @NotBlank(message = "Campo telefone obrigatório!")
        @Schema(description = "Informe o telefone do cliente", example = "19999999999")
        String telefone
) {
}
