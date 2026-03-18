package br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos;

import jakarta.validation.constraints.NotNull;

public record DadosRequestClienteDTO(

        String dieta_atual,

        String observacoes,

        @NotNull(message = "O campo altura é obrigatório!")
        Double altura,

        @NotNull(message = "O campo peso é obrigatório!")
        Double peso,

        @NotNull(message = "O campo fuma é obrigatório!")
        boolean fuma,

        String frequencia_fuma,

        @NotNull(message = "O campo consumo_agua_dia é obrigatório!")
        Double consumo_agua_dia,

        String antecedentes_familiar,

        @NotNull(message = "O campo precisa_acompanhamento_especial é obrigatório!")
        boolean precisa_acompanhamento_especial,

        @NotNull(message = "O campo tem_restricoes_alimentares é obrigatório!")
        boolean tem_restricoes_alimentares,

        @NotNull(message = "O campo toma_medicamentos é obrigatório!")
        boolean toma_medicamentos
) {
}
