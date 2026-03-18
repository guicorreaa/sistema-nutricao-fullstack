package br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record CadastrarItemRefeicaoDoSubstitutoDTO(

        @NotNull(message = "Campo idItemPrincipal faltando")
        @Schema(description = "ID do alimento já cadastrado.")
        UUID idItemPrincipal,       // ItemRefeicao que será substituído

        @NotNull(message = "Campo idAlimentoSubstituto faltando")
        @Schema(description = "ID do alimento que vai ser o opcional.")
        Integer idAlimentoSubstituto,  // Alimento que será usado no substituto

        @NotNull(message = "Campo quantidadeGramas faltando")
        BigDecimal quantidadeGramas,   // Quantidade do substituto

        String observacao           // Observação opcional

        ) {
}
