package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentoEspecificoDTO;
import br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentosSimplesDTO;
import br.com.anaprado.nutri_api.model.Alimentos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AlimentoRepository extends JpaRepository<Alimentos, Integer> {

    @Query("""
    SELECT new br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentosSimplesDTO(
        a.alimento_id,
        a.nome_alimento,
        a.umidade,
        a.energia_kcal,
        a.energia_kj,
        a.proteina,
        a.lipidios,
        a.colesterol,
        a.carboidrato,
        a.fibra_alimentar,
        a.calcio,
        a.magnesio,
        a.manganes,
        a.fosforo,
        a.ferro,
        a.sodio,
        a.potassio,
        a.cobre,
        a.zinco,
        a.retinol,
        a.vitamina_a_re,
        a.vitamina_a_rae,
        a.tiamina,
        a.riboflavina,
        a.piridoxina,
        a.niacina,
        a.vitamina_c,
        c.descricao,
        s.descricao,
        a.criado_por_usuario,
        a.ativo
    )
    FROM Alimentos a
    JOIN a.categoria c
    JOIN a.subcategoria s
    WHERE (:ativo IS NULL OR a.ativo = :ativo)
    AND (:categoria_id IS NULL OR c.categoria_id = :categoria_id)
    AND (:subcategoria_id IS NULL OR s.subcategoria_id = :subcategoria_id)
    AND (:nome_alimento IS NULL OR a.nome_alimento LIKE :nome_alimento)
            """)
    Page<ObterAlimentosSimplesDTO> findAllAlimentosDadosSimples(
            @Param("ativo") Boolean ativo,
            @Param("categoria_id") Integer categoria_id,
            @Param("subcategoria_id") Integer subcategoria_id,
            @Param("nome_alimento") String nome_alimento,
            Pageable pageable
            );


    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Alimento.ObterAlimentoEspecificoDTO(
             a.alimento_id,
                 a.nome_alimento,
                 COALESCE(a.umidade, 0.0),
                 COALESCE(a.energia_kcal, 0.0),
                 COALESCE(a.energia_kj, 0.0),
                 COALESCE(a.proteina, 0.0),
                 COALESCE(a.lipidios, 0.0),
                 COALESCE(a.colesterol, 0.0),
                 COALESCE(a.carboidrato, 0.0),
                 COALESCE(a.fibra_alimentar, 0.0),
                 COALESCE(a.calcio, 0.0),
                 COALESCE(a.magnesio, 0.0),
                 COALESCE(a.manganes, 0.0),
                 COALESCE(a.fosforo, 0.0),
                 COALESCE(a.ferro, 0.0),
                 COALESCE(a.sodio, 0.0),
                 COALESCE(a.potassio, 0.0),
                 COALESCE(a.cobre, 0.0),
                 COALESCE(a.zinco, 0.0),
                 COALESCE(a.retinol, 0.0),
                 COALESCE(a.vitamina_a_re, 0.0),
                 COALESCE(a.vitamina_a_rae, 0.0),
                 COALESCE(a.tiamina, 0.0),
                 COALESCE(a.riboflavina, 0.0),
                 COALESCE(a.piridoxina, 0.0),
                 COALESCE(a.niacina, 0.0),
                 COALESCE(a.vitamina_c, 0.0),
                 COALESCE(c.categoria_id, 0),
                 COALESCE(c.descricao, 'Sem Categoria'),
                 COALESCE(s.subcategoria_id, 0),
                 COALESCE(s.descricao, 'Sem Subcategoria'),
                 a.criado_por_usuario,
                 a.ativo
            ) FROM Alimentos a
                JOIN a.categoria c
                JOIN a.subcategoria s
            WHERE a.alimento_id = :alimentoId
            """)
    ObterAlimentoEspecificoDTO obterAlimentoEspecifico(@Param("alimentoId") Integer alimentoId);

}
