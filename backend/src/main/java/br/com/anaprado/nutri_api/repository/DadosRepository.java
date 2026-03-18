package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosFixosResponseDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseAntopometriaDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseTabelaInformacoesDTO;
import br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseTodosDadosDTO;
import br.com.anaprado.nutri_api.model.Cliente;
import br.com.anaprado.nutri_api.model.DadosCliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DadosRepository extends JpaRepository<DadosCliente, UUID> {

    DadosCliente findByCliente(Cliente dto);

    Optional<DadosCliente> findByCliente_ClienteId(UUID clienteId);

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseTabelaInformacoesDTO (
                dc.dados_id,
                c.nome,
                u.email
            )
            FROM DadosCliente as dc
            JOIN dc.cliente as c
            JOIN c.usuario as u
            WHERE (:nomeEmail IS NULL OR c.nome LIKE %:nomeEmail%)
            OR (:nomeEmail IS NULL OR u.email LIKE %:nomeEmail%)
            """)
    Page<DadosResponseTabelaInformacoesDTO> clientesQueTemDados(@Param("nomeEmail") String nomeEmail, Pageable pageable);

    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseTodosDadosDTO(
                    dc.dados_id,
                    dc.dieta_atual,
                    dc.observacoes,
                    dc.altura,
                    dc.fuma,
                    dc.frequencia_fuma,
                    dc.consumo_agua_dia,
                    dc.antecedentes_familiar,
                    dc.precisa_acompanhamento_especial,
                    dc.tem_restricoes_alimentares,
                    dc.toma_medicamentos,
                    a.peso,
                    a.circBraco,
                    a.circPanturrilha,
                    a.circCintura,
                    a.circQuadril,
                    a.dobraCutaneaTriceps,
                    a.dobraCutaneaBiceps,
                    a.dobraCutaneaEscapular,
                    a.dobraCutaneaIliaca,
                    dc.fator_atividade_fisica,
                    a.dataAvaliacao
                )
                FROM DadosCliente dc
                JOIN Antropometria a 
                  ON a.cliente.clienteId = dc.cliente.clienteId
                WHERE dc.dados_id = :dadoId
                  AND a.dataAvaliacao = (
                      SELECT MAX(a2.dataAvaliacao)
                      FROM Antropometria a2
                      WHERE a2.cliente.clienteId = dc.cliente.clienteId
                  )
            """)
    DadosResponseTodosDadosDTO visualizarDadosCliente(@Param("dadoId") UUID dadoId);

    // Usado para trazer os dados na interface do cliente
    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosResponseAntopometriaDTO(
                    dc.dados_id,
                    dc.dieta_atual,
                    a.observacoes,
                    dc.altura,
                    dc.fuma,
                    dc.frequencia_fuma,
                    dc.consumo_agua_dia,
                    dc.antecedentes_familiar,
                    dc.precisa_acompanhamento_especial,
                    dc.tem_restricoes_alimentares,
                    dc.toma_medicamentos,
                    a.peso,
                    a.circBraco,
                    a.circPanturrilha,
                    a.circCintura,
                    a.circQuadril,
                    a.dobraCutaneaTriceps,
                    a.dobraCutaneaBiceps,
                    a.dobraCutaneaEscapular,
                    a.dobraCutaneaIliaca,
                    dc.fator_atividade_fisica,
                    a.dataAvaliacao
                )
                FROM DadosCliente dc
                JOIN dc.cliente as c
                JOIN Antropometria a ON a.cliente.clienteId = c.clienteId
                WHERE c.clienteId = :clienteId
                  AND a.dataAvaliacao = (
                      SELECT MAX(a2.dataAvaliacao)
                      FROM Antropometria a2
                      WHERE a2.cliente.clienteId = dc.cliente.clienteId
                  )
            """)
    DadosResponseAntopometriaDTO dadosInterfaceCliente(@Param("clienteId") UUID clienteId);

    @Query("""
                SELECT new br.com.anaprado.nutri_api.controller.dto.dadosAntropometricos.DadosFixosResponseDTO(
                    dc.dados_id,
                    dc.dieta_atual,
                    a.observacoes,
                    dc.altura,
                    dc.fuma,
                    dc.frequencia_fuma,
                    dc.consumo_agua_dia,
                    dc.antecedentes_familiar,
                    dc.precisa_acompanhamento_especial,
                    dc.tem_restricoes_alimentares,
                    dc.toma_medicamentos,
                    dc.fator_atividade_fisica,
                    a.dataAvaliacao
                )
                FROM DadosCliente dc
                JOIN dc.cliente as c
                JOIN Antropometria a ON a.cliente.clienteId = c.clienteId
                WHERE c.clienteId = :clienteId
                  AND a.dataAvaliacao = (
                      SELECT MAX(a2.dataAvaliacao)
                      FROM Antropometria a2
                      WHERE a2.cliente.clienteId = dc.cliente.clienteId
                  )
            """)
    Optional<DadosFixosResponseDTO> findDadosFixosCliente(@Param("clienteId") UUID clienteId);

}
