package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CollectionIdJdbcTypeCode;

import java.time.LocalTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "refeicao")
public class Refeicao {

    @Id
    @Column(name = "refeicao_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID refeicao_id;

    @Column(name = "horario", nullable = false)
    private LocalTime horario;

    @ManyToOne
    @JoinColumn(name = "dieta_id", nullable = false)
    private Dieta dieta;

    @ManyToOne
    @JoinColumn(name = "tipo_refeicao", nullable = false)
    private TipoRefeicao tipoRefeicao;

    @Column(name = "observacao")
    private String observacao;


}
