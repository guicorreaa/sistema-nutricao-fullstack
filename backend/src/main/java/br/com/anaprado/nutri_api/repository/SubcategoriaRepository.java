package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterTodasSubcategoriasDTO;
import br.com.anaprado.nutri_api.model.Subcategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubcategoriaRepository extends JpaRepository<Subcategoria, Integer> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Subcategoria.ObterTodasSubcategoriasDTO(
               s.subcategoria_id, s.descricao, s.categoria.categoria_id, s.ativo
            ) FROM Subcategoria s
            WHERE s.ativo = :ativo
            AND s.categoria.categoria_id = :categoria_id
            ORDER BY s.descricao ASC
            """)
    List<ObterTodasSubcategoriasDTO> obterTodasSubcategorias(@Param("ativo") Boolean ativo,
                                                             @Param("categoria_id") Integer categoria_id);

    @Query("""
    SELECT COUNT(a) > 0
    FROM Alimentos a
    JOIN a.subcategoria s
    WHERE s.subcategoria_id = :subcategoria_id
    """)
    boolean verificarSubcategoriaEstaSendoUsada(Integer subcategoria_id);

    @Query("""
    SELECT 
        COUNT(s) > 0 
    FROM Subcategoria s 
    WHERE UPPER(s.descricao) = UPPER(:descricao) 
    AND s.categoria.categoria_id = :categoriaId
            """)
    boolean existeDuplicada(@Param("descricao") String descricao, @Param("categoriaId") Integer categoriaId);

}
