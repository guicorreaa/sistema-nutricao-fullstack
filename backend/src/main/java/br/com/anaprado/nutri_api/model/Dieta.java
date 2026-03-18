package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "dieta")
public class Dieta {

    @Id
    @Column(name = "dieta_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID dieta_id;

    @Column(name = "nome_dieta")
    private String nome_dieta;

    @Column(name = "data_inicio")
    private LocalDateTime data_inicio;

    @Column(name = "data_final")
    private LocalDateTime data_final;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

}
