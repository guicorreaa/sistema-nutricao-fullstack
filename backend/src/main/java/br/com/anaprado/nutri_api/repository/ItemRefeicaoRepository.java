package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterItensDaRefeicaoCompletoDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterItensDaRefeicaoDTO;
import br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterTodosAlimentosTodasRefeicoes;
import br.com.anaprado.nutri_api.model.ItemRefeicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRefeicaoRepository extends JpaRepository<ItemRefeicao, UUID> {

    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterItensDaRefeicaoDTO(
                    ir.id_item_refeicao,
                    ir.refeicao.id,
                    a.alimento_id,
                    a.nome_alimento,
                    a.energia_kcal,
                    a.proteina,
                    a.carboidrato,
                    a.lipidios,
                    a.fibra_alimentar,
                    a.sodio,
                    a.potassio,
                    a.calcio,
                    a.ferro,
                    a.vitamina_c,
                    ir.quantidadeGramas,
                    ir.observacao,
                    CASE 
                        WHEN irs.id_substituicao IS NOT NULL THEN true 
                        ELSE false 
                    END,
                    CASE 
                        WHEN irs.id_substituicao IS NOT NULL 
                        THEN ap.nome_alimento 
                        ELSE null 
                    END
                )
                FROM ItemRefeicao ir
                JOIN ir.alimentos a
            
                LEFT JOIN ItemRefeicaoSubstituto irs 
                    ON ir.id_item_refeicao = irs.itemSubstituto.id_item_refeicao
            
                LEFT JOIN irs.itemPrincipal ip
                LEFT JOIN ip.alimentos ap
            
                WHERE ir.refeicao.id = :refeicaoId
            """)
    List<ObterItensDaRefeicaoDTO> findItensDaRefeicao(UUID refeicaoId);


    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterItensDaRefeicaoCompletoDTO(
                ir.id_item_refeicao,
                ir.refeicao.refeicao_id,
                ir.alimentos.alimento_id,
                ir.alimentos.nome_alimento,
                ir.alimentos.umidade,
                ir.alimentos.energia_kcal,
                ir.alimentos.energia_kj,
                ir.alimentos.proteina,
                ir.alimentos.lipidios,
                ir.alimentos.colesterol,
                ir.alimentos.carboidrato,
                ir.alimentos.fibra_alimentar,
                ir.alimentos.calcio,
                ir.alimentos.magnesio,
                ir.alimentos.manganes,
                ir.alimentos.fosforo,
                ir.alimentos.ferro,
                ir.alimentos.sodio,
                ir.alimentos.potassio,
                ir.alimentos.cobre,
                ir.alimentos.zinco,
                ir.alimentos.retinol,
                ir.alimentos.vitamina_a_re,
                ir.alimentos.vitamina_a_rae,
                ir.alimentos.tiamina,
                ir.alimentos.riboflavina,
                ir.alimentos.piridoxina,
                ir.alimentos.niacina,
                ir.alimentos.vitamina_c,
                ir.quantidadeGramas,
                ir.observacao
            ) FROM ItemRefeicao as ir
              WHERE ir.refeicao.refeicao_id = :refeicao_id
            """)
    List<ObterItensDaRefeicaoCompletoDTO> findItensDaRefeicaoCompleto(UUID refeicao_id);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.ItemRefeicao.ObterTodosAlimentosTodasRefeicoes(
                ir.id_item_refeicao,
                ir.refeicao.refeicao_id,
                ir.alimentos.alimento_id,
                ir.alimentos.nome_alimento,
                ir.alimentos.energia_kcal,
                ir.alimentos.proteina,
                ir.alimentos.carboidrato,
                ir.alimentos.lipidios,
                ir.alimentos.fibra_alimentar,
                ir.alimentos.sodio,
                ir.alimentos.potassio,
                ir.alimentos.calcio,
                ir.alimentos.ferro,
                ir.alimentos.vitamina_c,
                ir.quantidadeGramas,
                ir.observacao
            ) FROM ItemRefeicao as ir
                WHERE ir.refeicao.dieta.dieta_id = :dieta_id
            """)
    List<ObterTodosAlimentosTodasRefeicoes> findTodosAlimentosRefeicoesDoDia(UUID dieta_id);

    // Usado para validar se o alimento já foi cadastrado na refeição selecionada
    @Query("""
                SELECT ir
                FROM ItemRefeicao ir
                WHERE ir.refeicao.refeicao_id = :refeicao_id
                  AND ir.alimentos.alimento_id = :alimento_id
            """)
    Optional<ItemRefeicao> findItemNaRefeicao(UUID refeicao_id, int alimento_id);

}
