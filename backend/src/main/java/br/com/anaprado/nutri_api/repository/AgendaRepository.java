package br.com.anaprado.nutri_api.repository;

import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaObterListaCompletaDTO;
import br.com.anaprado.nutri_api.model.Agenda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AgendaRepository extends JpaRepository<Agenda, UUID> {

    @Query("""
            SELECT new br.com.anaprado.nutri_api.controller.dto.agenda.AgendaObterListaCompletaDTO(
                a.consulta_id,
                a.nome,
                a.celular,
                a.telefone,
                a.email,
                a.data_consulta,
                a.tipo_consulta,
                a.horario_consulta,
                a.data_agendamento,
                a.cancelamento_cliente,
                a.observacoes_consulta
            ) FROM Agenda a
            WHERE (:nomeEmail IS NULL OR a.nome LIKE %:nomeEmail%)
            OR (:nomeEmail IS NULL OR a.email LIKE %:nomeEmail%)
            ORDER BY
              a.data_consulta ASC,
              a.horario_consulta ASC
            """)
    Page<AgendaObterListaCompletaDTO> buscarPessoas(@Param("nomeEmail") String nomeEmail, Pageable pageable);

    @Query("""
                SELECT a 
                FROM Agenda a
                WHERE a.data_consulta = :dataConsulta
                  AND a.horario_consulta BETWEEN :inicio AND :fim
            """)
    List<Agenda> verificarHorariosProximos(
            @Param("dataConsulta") LocalDate dataConsulta,
            @Param("inicio") LocalTime inicio,
            @Param("fim") LocalTime fim
    );


}
