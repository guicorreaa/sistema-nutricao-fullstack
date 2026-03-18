package br.com.anaprado.nutri_api.model;

import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.CadastrarTipoRefeicaoDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tipo_refeicao")
@NoArgsConstructor
@AllArgsConstructor
public class TipoRefeicao {

    @Id
    @Column(name = "tipo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tipo_id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "ativo")
    private boolean ativo;


    public TipoRefeicao(CadastrarTipoRefeicaoDTO dto) {
        this.descricao = dto.descricao();
        this.ativo = dto.ativo();
    }

}
