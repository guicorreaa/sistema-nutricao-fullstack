package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.Refeicao.ExibirDadosDaRefeicaoCompletaDTO;
import br.com.anaprado.nutri_api.controller.dto.Refeicao.RefeicaoSumarizada;
import br.com.anaprado.nutri_api.model.Refeicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RefeicaoRepository extends JpaRepository<Refeicao, UUID> {

    @Query(value = """
            SELECT 
                r.refeicao_id as refeicao_id, 
                r.horario as horario, 
                d.nome_dieta as nome_dieta, 
                tr.descricao as descricao, 
                r.observacao as observacao,
                COALESCE(SUM(a.energia_kcal * ir.quantidade_gramas / 100.0), 0.0) as total_kcal,
                COALESCE(SUM(a.proteina * ir.quantidade_gramas / 100.0), 0.0) as total_prot,
                COALESCE(SUM(a.carboidrato * ir.quantidade_gramas / 100.0), 0.0) as total_carbo,
                COALESCE(SUM(a.lipidios * ir.quantidade_gramas / 100.0), 0.0) as total_lip
            FROM refeicao r
            JOIN dieta d ON d.dieta_id = r.dieta_id
            JOIN tipo_refeicao tr ON tr.tipo_id = r.tipo_refeicao
            LEFT JOIN item_refeicao ir ON ir.refeicao_id = r.refeicao_id
            LEFT JOIN alimentos a ON a.alimento_id = ir.alimento_id
            WHERE r.dieta_id = :dieta_id
            GROUP BY r.refeicao_id, r.horario, d.nome_dieta, tr.descricao, r.observacao
            """, nativeQuery = true)
    List<RefeicaoSumarizada> obterTodasRefeicoesPessoaEspecifica(UUID dieta_id);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Refeicao.ExibirDadosDaRefeicaoCompletaDTO(
                r.refeicao_id,
                r.horario,
                r.dieta.dieta_id,
                r.dieta.nome_dieta,
                r.tipoRefeicao.tipo_id,
                r.tipoRefeicao.descricao,
                r.observacao
            ) FROM Refeicao as r
              WHERE r.refeicao_id = :refeicao_id
            """)
    List<ExibirDadosDaRefeicaoCompletaDTO> obterInformacoesCompletaDaRefeicao(UUID refeicao_id);

    @Query("""
            SELECT
                CASE WHEN COUNT(r) > 0 THEN true ELSE false END
            FROM Refeicao as r
                JOIN r.dieta as d
                JOIN d.cliente as c
            WHERE c.clienteId = :clienteId
            """)
    boolean verificarSeClienteTemRefeicao(@Param("clienteId") UUID clienteId);
}
