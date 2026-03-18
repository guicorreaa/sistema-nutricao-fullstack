package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "usuario", schema = "public")
@Data
public class Usuario {

    @Id
    @Column(name = "usuario_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID usuario_id;

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    @ToString.Exclude
    private String senha;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(name = "ativo")
    private Boolean ativo;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime data_criacao;

    @Column(name = "telefone")
    private String telefone;

    @PrePersist
    public void prePersist() {
        this.data_criacao = LocalDateTime.now();
    }

}
