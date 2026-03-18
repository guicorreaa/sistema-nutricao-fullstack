package br.com.anaprado.nutri_api.controller.dto.usuario;

import br.com.anaprado.nutri_api.model.RoleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestUpdateDTO(
                                @NotBlank(message = "Campo e-mail obrigatório!")
                                String email,
                                @NotNull(message = "Campo permissão obrigatório!")
                                RoleType role,
                                @NotNull(message = "Campo ativo obrigatório!")
                                Boolean ativo
                                ) {
}
