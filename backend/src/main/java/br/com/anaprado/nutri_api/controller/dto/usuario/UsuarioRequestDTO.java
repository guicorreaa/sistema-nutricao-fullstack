package br.com.anaprado.nutri_api.controller.dto.usuario;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioRequestDTO(

        @Email(message = "Insira um e-mail valido!")
        @NotBlank(message = "Campo obrigatório!")
        @Schema(description = "Informe o e-mail do cliente", example = "email_cliente@exemplo.com")
        String email,

        @NotBlank(message = "Campo telefone obrigatório!")
        @Schema(description = "Informe o telefone do cliente", example = "19999999999")
        String telefone,

        @Schema(description = "Informe se o cliente está ativo!", example = "true")
        Boolean ativo

) {
}
