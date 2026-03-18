package br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos;

import br.com.anaprado.nutri_api.model.enuns.FatorAtividade;

import java.time.LocalDateTime;
import java.util.UUID;

public record DadosResponseTodosDadosDTO(
        UUID dados_id,
        String dieta_atual,
        String observacoes,
        Double altura,
        boolean fuma,
        String frequencia_fuma,
        Double consumo_agua_dia,
        String antecedentes_familiar,
        boolean precisa_acompanhamento_especial,
        boolean tem_restricoes_alimentares,
        boolean toma_medicamentos,
        Double peso,
        Double circ_braco,
        Double circ_panturrilha,
        Double circ_cintura,
        Double circ_quadril,
        Double dobra_cutanea_triceps,
        Double dobra_cutanea_biceps,
        Double dobra_cutanea_escapular,
        Double dobra_cutanea_iliaca,
        FatorAtividade fator_atividade_fisica,
        LocalDateTime ultima_alteracao
) {}

