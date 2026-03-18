package br.com.anaprado.nutri_api.repository;


import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterDietaEspecificaDTO;
import br.com.anaprado.nutri_api.controller.dto.Dieta.ObterNomesDietasDTO;
import br.com.anaprado.nutri_api.model.Dieta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DietaRepository extends JpaRepository<Dieta, UUID> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Dieta.ObterDietaEspecificaDTO(
                d.dieta_id,
                d.cliente.nome,
                d.cliente.clienteId,
                d.nome_dieta,
                d.data_inicio,
                d.data_final
            )
            FROM Dieta d
            WHERE d.cliente.clienteId = :cliente_id
            """)
    List<ObterDietaEspecificaDTO> findAllDietasClienteEspecifico(UUID cliente_id);

    List<Dieta> findByCliente_ClienteId(UUID cliente_id);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Dieta.ObterNomesDietasDTO(
                d.dieta_id,
                d.nome_dieta
            )
            FROM Dieta d
            WHERE d.cliente.clienteId = :cliente_id
            """)
    List<ObterNomesDietasDTO> findAllNomesDietas(UUID cliente_id);
}
