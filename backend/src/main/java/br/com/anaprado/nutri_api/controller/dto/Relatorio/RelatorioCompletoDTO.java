package br.com.anaprado.nutri_api.controller.dto.Relatorio;

import br.com.anaprado.nutri_api.controller.dto.Relatorio.Historico.HistoricoCompletoAntropometricoDTO;
import br.com.anaprado.nutri_api.model.SexoType;
import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record RelatorioCompletoDTO(

        // Dados do cliente
        String nome,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataNascimento,
        SexoType sexo,
        String objetivoNutricional,
        Integer idade, // Calculado pelo service

        // Dados antropométricos
        UUID dados_id,
        String observacoes,
        Double altura,
        Boolean fuma,
        String frequencia_fuma,
        Double consumo_agua_dia,
        String antecedentes_familiar,
        Boolean precisa_acompanhamento_especial,
        Boolean tem_restricoes_alimentares,
        Boolean toma_medicamentos,
        FatorAtividade fator_atividade_fisica,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDateTime ultima_alteracao,

        Double peso,
        Double circ_braco,
        Double circ_panturrilha,
        Double circ_cintura,
        Double circ_quadril,
        Double dobra_cutanea_triceps,
        Double dobra_cutanea_biceps,
        Double dobra_cutanea_escapular,
        Double dobra_cutanea_iliaca,

        List<HistoricoCompletoAntropometricoDTO> historicoEvolucao
) {
}
