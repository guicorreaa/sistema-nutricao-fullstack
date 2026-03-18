package br.com.anaprado.nutri_api.controller.dto.Antropometria;

import jakarta.validation.constraints.NotNull;

public record AntropometriaCadastrarDTO(

        @NotNull(message = "O campo peso é obrigatório")
        Double peso,

        @NotNull(message = "O campo circ_braco é obrigatório")
        Double circBraco,

        @NotNull(message = "O campo circ_panturrilha é obrigatório")
        Double circPanturrilha,

        @NotNull(message = "O campo circ_cintura é obrigatório")
        Double circCintura,

        @NotNull(message = "O campo circ_quadril é obrigatório")
        Double circQuadril,

        @NotNull(message = "O campo dobra_cutanea_triceps é obrigatório")
        Double dobraCutaneaTriceps,

        @NotNull(message = "O campo dobra_cutanea_biceps é obrigatório")
        Double dobraCutaneaBiceps,

        @NotNull(message = "O campo dobra_cutanea_escapular é obrigatório")
        Double dobraCutaneaEscapular,

        @NotNull(message = "O campo dobra_cutanea_iliaca é obrigatório")
        Double dobraCutaneaIliaca,

        String observacoes

) {

}
