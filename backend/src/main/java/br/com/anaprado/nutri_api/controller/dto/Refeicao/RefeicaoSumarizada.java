package br.com.anaprado.nutri_api.controller.dto.Refeicao;

import java.time.LocalTime;
import java.util.UUID;

public interface RefeicaoSumarizada {
    UUID getRefeicao_id();
    LocalTime getHorario();
    String getNome_dieta();
    String getDescricao();
    String getObservacao();

    // Totais
    Double getTotal_kcal();
    Double getTotal_prot();
    Double getTotal_carbo();
    Double getTotal_lip();
}
