package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "item_refeicao")
public class ItemRefeicao {

    @Id
    @Column(name = "id_item_refeicao")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id_item_refeicao;

    @ManyToOne
    @JoinColumn(name = "refeicao_id", nullable = false)
    private Refeicao refeicao;

    @ManyToOne
    @JoinColumn(name = "alimento_id", nullable = false)
    private Alimentos alimentos;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "quantidade_gramas", nullable = false)
    private BigDecimal quantidadeGramas;

}
