package br.com.anaprado.nutri_api.controller.dto.token;

import jakarta.validation.constraints.NotBlank;

public record DefinirSenhaRequestDTO(@NotBlank(message = "Senha inválida!") String novaSenha) {
}
