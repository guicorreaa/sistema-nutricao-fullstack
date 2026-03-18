package br.com.anaprado.nutri_api.controller.dto.Subcategoria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EditarSubcategoriaDTO(

        @NotBlank(message = "Preencha o campo descrição!.")
        String descricao,

        @NotNull(message = "Categoria não pode ser nula!.")
        Integer categoria_id,

        @NotNull(message = "Preencha o campo se ele está ativo")
        Boolean ativo

) {
}
