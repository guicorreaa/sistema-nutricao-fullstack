package br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos;

import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosEditarVariaveisFixasDTO(

        String dieta_atual,

        String observacoes,

        @NotNull(message = "O campo altura é obrigatório")
        Double altura,

        @NotNull(message = "O campo fuma é obrigatório")
        Boolean fuma,

        String frequencia_fuma,

        @NotNull(message = "O campo consumo_agua_dia é obrigatório")
        Double consumo_agua_dia,

        String antecedentes_familiar,

        @NotNull(message = "O campo precisa_acompanhamento_especial é obrigatório")
        boolean precisa_acompanhamento_especial,

        @NotNull(message = "O campo tem_restricoes_alimentares é obrigatório")
        boolean tem_restricoes_alimentares,

        @NotNull(message = "O campo toma_medicamentos é obrigatório")
        boolean toma_medicamentos,

        @NotNull(message = "O campo fator_atividade_fisica é obrigatório")
        FatorAtividade fator_atividade_fisica
) {
}
