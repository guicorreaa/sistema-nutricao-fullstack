package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.Categoria.ObterTodasCategoriasDTO;
import br.com.anaprado.nutri_api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Categoria.ObterTodasCategoriasDTO(
                c.categoria_id, c.descricao, c.ativo
            ) FROM Categoria c
            WHERE c.ativo = :ativo
            """)
    List<ObterTodasCategoriasDTO>findAllCategorias(boolean ativo);

    @Query("""
            SELECT Count(a) > 0
            FROM Alimentos a 
            JOIN a.categoria c
            WHERE c.categoria_id = :idCategoria
            """)
    boolean verificarSeCategSendoUsada(Integer idCategoria);

    boolean existsByDescricaoIgnoreCase(String descricao);

    @Query("""
            SELECT Count(s) > 0
            FROM Subcategoria as s 
            JOIN s.categoria as c
            WHERE c.categoria_id = :categoriaId
            """)
    boolean verificarSeCategSendoUsadaSubcategoria(Integer categoriaId);
}
