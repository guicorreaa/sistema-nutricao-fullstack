package br.com.anaprado.nutri_api.controller.dto.Subcategoria;


public record ObterTodasSubcategoriasDTO(

        Integer subcategoria_id, String descricao, Integer categoria_id, Boolean ativo

) {
}
