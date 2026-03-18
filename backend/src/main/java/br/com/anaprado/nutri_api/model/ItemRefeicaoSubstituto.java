package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "item_refeicao_substituicao")
public class ItemRefeicaoSubstituto {

    @Id
    @Column(name = "id_substituicao")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id_substituicao;

    @ManyToOne
    @JoinColumn(name = "item_principal_id", nullable = false)
    private ItemRefeicao itemPrincipal;

    @ManyToOne
    @JoinColumn(name = "item_substituto_id", nullable = false)
    private ItemRefeicao itemSubstituto;

}
