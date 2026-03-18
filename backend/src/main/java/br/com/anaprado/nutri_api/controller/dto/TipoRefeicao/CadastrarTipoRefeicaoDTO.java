package br.com.anaprado.nutri_api.controller.dto.TipoRefeicao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastrarTipoRefeicaoDTO(

        @NotBlank(message = "Preencha a descrição!.")
        String descricao,

        @NotNull(message = "Campo ativo faltando!.")
        Boolean ativo

) {
}
