package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.model.TipoRefeicao;
import br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.TodosTiposRefeicaoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TipoRefeicaoRepository extends JpaRepository<TipoRefeicao, Integer> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.TipoRefeicao.TodosTiposRefeicaoDTO (
                t.tipo_id, t.descricao, t.ativo
            ) FROM TipoRefeicao t
              WHERE t.ativo = :ativo
            """) // mudar aqui
    List<TodosTiposRefeicaoDTO> findAllTipos(boolean ativo);

}

