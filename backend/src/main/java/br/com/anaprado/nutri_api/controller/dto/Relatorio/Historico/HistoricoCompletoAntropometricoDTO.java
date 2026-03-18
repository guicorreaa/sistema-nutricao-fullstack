package br.com.anaprado.nutri_api.controller.dto.Relatorio.Historico;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record HistoricoCompletoAntropometricoDTO (
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDateTime dataAvaliacao, // Essencial para o eixo X do gráfico
        Double peso,
        Double circBraco,
        Double circPanturrilha,
        Double circCintura,
        Double circQuadril,
        Double dobraCutaneaTriceps,
        Double dobraCutaneaBiceps,
        Double dobraCutaneaEscapular,
        Double dobraCutaneaIliaca
) {
}
