package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicaoSubstituto.ObterRefeicaoComOpcionaisDTO;
import br.com.anaprado.nutri_api.model.ItemRefeicaoSubstituto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ItemRefeicaoSubstitutoRepository extends JpaRepository<ItemRefeicaoSubstituto, UUID> {

    @Query(value = """
            SELECT
                            ir.id_item_refeicao AS itemPrincipalId,
                            ir.refeicao_id AS refeicaoId,
                            a.nome_alimento AS alimentoPrincipalNome,
                            ir.quantidade_gramas AS qtdPrincipal,
                            a.energia_kcal AS kcalPrincipal,
                            a.carboidrato AS carbPrincipal,
                            a.lipidios AS lipidiosPrincipal,
                            a.proteina AS proteinaPrincipal,
                            ir_sub.id_item_refeicao AS itemSubstitutoId,
                            a_sub.nome_alimento AS alimentoSubstitutoNome,
                            ir_sub.quantidade_gramas AS qtdSubstituto,
                            a_sub.energia_kcal AS kcalSubstituto,
                            a_sub.carboidrato AS carbSubstituto,
                            a_sub.lipidios AS lipidiosSubstituto,
                            a_sub.proteina AS proteinaSubstituto
            
                    FROM item_refeicao ir
                    JOIN alimentos a ON a.alimento_id = ir.alimento_id
            
                    LEFT JOIN item_refeicao_substituicao irs ON irs.item_principal_id = ir.id_item_refeicao
            
                    LEFT JOIN item_refeicao ir_sub ON ir_sub.id_item_refeicao = irs.item_substituto_id
            
                    LEFT JOIN alimentos a_sub ON a_sub.alimento_id = ir_sub.alimento_id
            
                    JOIN refeicao r ON r.refeicao_id = ir.refeicao_id
            
                    WHERE r.refeicao_id = :refeicao_id
            """,
            nativeQuery = true)
    List<ObterRefeicaoComOpcionaisDTO> buscarItensComSubstitutos(
            @Param("refeicao_id") UUID refeicao_id
    );

    // Verifica se o ID do item principal fornecido já é, na verdade, um substituto de outro item
    @Query("SELECT COUNT(irs) > 0 FROM ItemRefeicaoSubstituto irs WHERE irs.itemSubstituto.id_item_refeicao = :itemId")
    boolean isItemJaEhUmSubstituto(@Param("itemId") UUID itemId);

    // Mantendo o método anterior de duplicados
    @Query("""
        SELECT COUNT(irs) > 0 
        FROM ItemRefeicaoSubstituto irs 
        WHERE irs.itemPrincipal.id_item_refeicao = :itemPrincipalId 
        AND irs.itemSubstituto.alimentos.alimento_id = :alimentoId
    """)
    boolean existsByItemPrincipalAndAlimentoSubstituto(UUID itemPrincipalId, Integer alimentoId);
}






