package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @Column(name = "cliente_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID clienteId;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "sexo")
    @Enumerated(EnumType.STRING)
    private SexoType sexo;

    @Column(name = "objetivo_nutricional")
    private String objetivoNutricional;

    @Column(name = "ultima_alteracao")
    private LocalDateTime ultimaAlteracao;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true, nullable = false)
    private Usuario usuario;
}


