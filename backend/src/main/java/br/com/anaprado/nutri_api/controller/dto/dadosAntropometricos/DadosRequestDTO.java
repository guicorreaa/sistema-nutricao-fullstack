package br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos;

import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosRequestDTO(

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
        boolean toma_medicamentos,

        @NotNull(message = "O campo circ_braco é obrigatório!")
        Double circ_braco,

        @NotNull(message = "O campo circ_panturrilha é obrigatório!")
        Double circ_panturrilha,

        @NotNull(message = "O campo circ_cintura é obrigatório!")
        Double circ_cintura,

        @NotNull(message = "O campo circ_quadril é obrigatório!")
        Double circ_quadril,

        @NotNull(message = "O campo dobra_cutanea_triceps é obrigatório!")
        Double dobra_cutanea_triceps,

        @NotNull(message = "O campo dobra_cutanea_biceps é obrigatório!")
        Double dobra_cutanea_biceps,

        @NotNull(message = "O campo dobra_cutanea_escapular é obrigatório!")
        Double dobra_cutanea_escapular,

        @NotNull(message = "O campo dobra_cutanea_iliaca é obrigatório!")
        Double dobra_cutanea_iliaca,

        @NotNull(message = "O campo fator_atividade_fisica é obrigatório!")
        FatorAtividade fator_atividade_fisica
) {
}
