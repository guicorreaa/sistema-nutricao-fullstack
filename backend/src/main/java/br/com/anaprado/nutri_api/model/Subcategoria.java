package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "subcategoria")
public class Subcategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategoria_id")
    private Integer subcategoria_id;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(name = "ativo")
    private boolean ativo = true;
}
