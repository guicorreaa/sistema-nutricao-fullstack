package br.com.anaprado.nutri_api.controller.dto.usuario;

import java.util.UUID;

public record UsuarioLoginResponseDTO (UUID usuario_id,
                                       String email,
                                       String role) {
}
