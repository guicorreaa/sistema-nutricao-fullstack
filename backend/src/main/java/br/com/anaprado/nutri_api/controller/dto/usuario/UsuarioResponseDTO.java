package br.com.anaprado.nutri_api.controller.dto.usuario;

import java.time.LocalDateTime;
import java.util.UUID;

public record UsuarioResponseDTO(UUID usuario_id, String email, String role, Boolean ativo, LocalDateTime data_criacao) {
}
