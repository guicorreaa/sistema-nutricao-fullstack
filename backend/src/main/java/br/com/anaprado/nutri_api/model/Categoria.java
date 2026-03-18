package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @Column(name = "categoria_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoria_id;

    @Column(name = "descricao")
    private String descricao ;

    @Column(name = "ativo")
    private Boolean ativo;

}
