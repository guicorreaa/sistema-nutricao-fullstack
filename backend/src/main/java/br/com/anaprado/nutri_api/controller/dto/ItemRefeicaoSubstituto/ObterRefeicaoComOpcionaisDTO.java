package br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto;

import java.math.BigDecimal;
import java.util.UUID;

public record ObterRefeicaoComOpcionaisDTO(

        UUID itemPrincipalId,
        UUID refeicaoId,

        String alimentoPrincipalNome,
        BigDecimal qtdPrincipal,

        BigDecimal kcalPrincipal,
        BigDecimal carbPrincipal,
        BigDecimal lipidiosPrincipal,
        BigDecimal proteinaPrincipal,

        UUID itemSubstitutoId,
        String alimentoSubstitutoNome,
        BigDecimal qtdSubstituto,

        BigDecimal kcalSubstituto,
        BigDecimal carbSubstituto,
        BigDecimal lipidiosSubstituto,
        BigDecimal proteinaSubstituto

) {
}
