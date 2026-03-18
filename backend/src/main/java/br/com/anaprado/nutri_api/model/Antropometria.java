package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Data
@Entity
@Table(name = "antropometria")
public class Antropometria {

    @Id
    @Column(name = "antropometria_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID antropometriaId;

    @Column(name = "peso")
    private Double peso;

    @Column(name = "circ_braco")
    private Double circBraco;

    @Column(name = "circ_panturrilha")
    private Double circPanturrilha;

    @Column(name = "circ_cintura")
    private Double circCintura;

    @Column(name = "circ_quadril")
    private Double circQuadril;

    @Column(name = "dobra_cutanea_triceps")
    private Double dobraCutaneaTriceps;

    @Column(name = "dobra_cutanea_biceps")
    private Double dobraCutaneaBiceps;

    @Column(name = "dobra_cutanea_escapular")
    private Double dobraCutaneaEscapular;

    @Column(name = "dobra_cutanea_iliaca")
    private Double dobraCutaneaIliaca;

    @Column(name = "data_avaliacao")
    private LocalDateTime dataAvaliacao;

    @Column(name = "observacoes")
    private String observacoes;

    @JoinColumn(name = "cliente_id", nullable = false)
    @ManyToOne
    private Cliente cliente;

    @PrePersist
    private void prePersist() {
        this.dataAvaliacao = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
    }

}
