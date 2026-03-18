package br.com.anaprado.nutri_api.controller.dto.Categoria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastrarCategoriaAlimentoDTO(

        @NotBlank(message = "Preencher descrição!")
        String descricao,

        @NotNull(message = "Preencher se está ativo!")
        Boolean ativo

) {
}
