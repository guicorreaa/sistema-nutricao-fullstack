package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.Relatorio.Historico.HistoricoCompletoAntropometricoDTO;
import br.com.anaprado.nutri_api.controller.dto.Relatorio.ObterAntropometriaCompletaDTO;
import br.com.anaprado.nutri_api.model.Antropometria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AntropometriaRepository extends JpaRepository<Antropometria, UUID> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.Relatorio.ObterAntropometriaCompletaDTO(
                a.dataAvaliacao,
                a.peso,
                a.circBraco,
                a.circPanturrilha,
                a.circCintura,
                a.circQuadril,
                a.dobraCutaneaTriceps,
                a.dobraCutaneaBiceps,
                a.dobraCutaneaEscapular,
                a.dobraCutaneaIliaca
            ) FROM Antropometria a
            WHERE a.cliente.clienteId = :clienteId
            ORDER BY a.dataAvaliacao DESC
            LIMIT 1
            """)
    Optional<ObterAntropometriaCompletaDTO> findAntropometriaClientId (UUID clienteId);

@Query("""
        SELECT new br.com.anaprado.nutri_api.controller.dto.Relatorio.Historico.HistoricoCompletoAntropometricoDTO(
            a.dataAvaliacao,
            a.peso,
            a.circBraco,
            a.circPanturrilha,
            a.circCintura,
            a.circQuadril,
            a.dobraCutaneaTriceps,
            a.dobraCutaneaBiceps,
            a.dobraCutaneaEscapular,
            a.dobraCutaneaIliaca
        ) FROM Antropometria a
                JOIN a.cliente as c
        WHERE c.clienteId = :clienteId
        ORDER BY a.dataAvaliacao DESC
        """)
    List<HistoricoCompletoAntropometricoDTO> findHistoricoByClienteId (UUID clienteId);
}
