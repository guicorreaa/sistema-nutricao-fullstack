package br.com.anaprado.nutri_api.service;

import br.com.anaprado.nutri_api.config.PageUtils;
import br.com.anaprado.nutri_api.controller.dto.Paginacao.PageResponse;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaCadastroRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaEditarRequestDTO;
import br.com.anaprado.nutri_api.controller.dto.agenda.AgendaObterListaCompletaDTO;
import br.com.anaprado.nutri_api.controller.mappers.AgendaMapper;
import br.com.anaprado.nutri_api.model.Agenda;
import br.com.anaprado.nutri_api.repository.AgendaRepository;
import br.com.anaprado.nutri_api.validator.AgendaValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AgendaService {

    private final AgendaRepository agendaRepository;
    private final AgendaValidator agendaValidator;
    private final AgendaMapper agendaMapper;

    @Transactional
    public void agendarConsulta(AgendaCadastroRequestDTO dto) {
        agendaValidator.verificarSeTemConsultaNaqueleMomento(dto.data_consulta(), dto.horario_consulta());
        Agenda agenda = agendaMapper.cadastroToEntity(dto);

        // Força o horário de Brasília
        LocalDateTime horaBrasilia = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
        agenda.setData_agendamento(horaBrasilia);

        agenda.setCancelamento_cliente(false);
        agendaRepository.save(agenda);
    }

    @Transactional
    public void editarAgendamento(UUID id, AgendaEditarRequestDTO dto) {
        Agenda agendamento = agendaValidator.validarSeAgendamentoExiste(id);
        agendaValidator.verificarSeTemConsultaNaqueleMomento(dto.data_consulta(), dto.horario_consulta());
        Agenda agenda = agendaMapper.editarToEntity(dto, agendamento);
        agenda.setData_agendamento(LocalDateTime.now());
        agendaRepository.save(agenda);
    }

    public PageResponse<AgendaObterListaCompletaDTO> obterAgendamentos(
            String nomeEmail,
            Pageable pageable
    ) {

        Page<AgendaObterListaCompletaDTO> page = agendaRepository.buscarPessoas(nomeEmail, pageable);

        return PageUtils.from(page);

    }

    public void deletarAgendamento(UUID id) {
        agendaValidator.validarSeAgendamentoExiste(id);
        agendaRepository.deleteById(id);
    }

    public AgendaObterListaCompletaDTO obterAgendamentoEspecifico(UUID idAgendamento){
        Agenda dadoExistente = agendaValidator.validarSeAgendamentoExiste(idAgendamento);
        return agendaMapper.entityToDTO(dadoExistente);
    }

}
