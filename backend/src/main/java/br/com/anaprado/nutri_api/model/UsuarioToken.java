package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Entity
@Table(name = "usuario_token")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED) // Construtor JPA
public class UsuarioToken {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "usuario_id", nullable = false)
    private UUID usuarioId;

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Column(name = "expiracao", nullable = false)
    private LocalDateTime expiracao;

    @Builder
    public UsuarioToken(UUID id, UUID usuarioId, String token, LocalDateTime expiracao) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.token = token;
        this.expiracao = expiracao;
    }

}
