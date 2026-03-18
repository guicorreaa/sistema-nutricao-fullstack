package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "alimentos")
public class Alimentos {

    @Id
    @Column(name = "alimento_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer alimento_id;

    @Column(name = "nome_alimento", nullable = false)
    private String nome_alimento;

    @Column(name = "umidade")
    private Double umidade;

    @Column(name = "energia_kcal")
    private Double energia_kcal;

    @Column(name = "energia_kj")
    private Double energia_kj;

    @Column(name = "proteina")
    private Double proteina;

    @Column(name = "lipidios")
    private Double lipidios;

    @Column(name = "colesterol")
    private Double colesterol;

    @Column(name = "carboidrato")
    private Double carboidrato;

    @Column(name = "fibra_alimentar")
    private Double fibra_alimentar;

    @Column(name = "calcio")
    private Double calcio;

    @Column(name = "magnesio")
    private Double magnesio;

    @Column(name = "manganes")
    private Double manganes;

    @Column(name = "fosforo")
    private Double fosforo;

    @Column(name = "ferro")
    private Double ferro;

    @Column(name = "sodio")
    private Double sodio;

    @Column(name = "potassio")
    private Double potassio;

    @Column(name = "cobre")
    private Double cobre;

    @Column(name = "zinco")
    private Double zinco;

    @Column(name = "retinol")
    private Double retinol;

    @Column(name = "vitamina_a_re")
    private Double vitamina_a_re;

    @Column(name = "vitamina_a_rae")
    private Double vitamina_a_rae;

    @Column(name = "tiamina")
    private Double tiamina;

    @Column(name = "riboflavina")
    private Double riboflavina;

    @Column(name = "piridoxina")
    private Double piridoxina;

    @Column(name = "niacina")
    private Double niacina;

    @Column(name = "vitamina_c")
    private Double vitamina_c;

    // Relacionamento com categoria e subcategoria, se existir
    @ManyToOne
    @JoinColumn(name = "categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "subcategoria")
    private Subcategoria subcategoria;

    @Column(name = "criado_por_usuario")
    private Boolean criado_por_usuario;

    @Column(name = "ativo")
    private Boolean ativo;

}
