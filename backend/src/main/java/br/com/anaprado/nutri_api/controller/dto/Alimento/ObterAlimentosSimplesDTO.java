package br.com.anaprado.nutri_api.controller.dto.Alimento;

public record ObterAlimentosSimplesDTO(

        Integer alimento_id,
        String nome_alimento,
        Double umidade,
        Double energia_kcal,
        Double energia_kj,
        Double proteina,
        Double lipidios,
        Double colesterol,
        Double carboidrato,
        Double fibra_alimentar,
        Double calcio,
        Double magnesio,
        Double manganes,
        Double fosforo,
        Double ferro,
        Double sodio,
        Double potassio,
        Double cobre,
        Double zinco,
        Double retinol,
        Double vitamina_a_re,
        Double vitamina_a_rae,
        Double tiamina,
        Double riboflavina,
        Double piridoxina,
        Double niacina,
        Double vitamina_c,
        String categoria,
        String subcategoria,
        Boolean criado_por_usuario,
        Boolean ativo
) {
}
