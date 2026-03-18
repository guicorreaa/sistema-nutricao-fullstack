package br.com.anaprado.nutri_api.validator;

import br.com.anaprado.nutri_api.exceptions.AgendamentoNaoEncontradoException;
import br.com.anaprado.nutri_api.exceptions.ConsultaJaAgendadaEntreHorario;
import br.com.anaprado.nutri_api.model.Agenda;
import br.com.anaprado.nutri_api.repository.AgendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AgendaValidator {

    private final AgendaRepository agendaRepository;

    public Agenda validarSeAgendamentoExiste(UUID uuid){
        return agendaRepository.findById(uuid).orElseThrow(() -> new AgendamentoNaoEncontradoException("Pessoa agendada não encontrada!"));
    }

    public void verificarSeTemConsultaNaqueleMomento(LocalDate dia_consulta, LocalTime horario_consulta){
        LocalTime inicioConsulta = horario_consulta.minusMinutes(30);
        LocalTime fimConsulta = horario_consulta.plusMinutes(30);
        List<Agenda> consultas = agendaRepository.verificarHorariosProximos(dia_consulta, inicioConsulta, fimConsulta);

        if (!consultas.isEmpty()) {
            String horariosExistentes = consultas.stream()
                    .map(a -> a.getHorario_consulta().toString()) // pega o horário de cada uma
                    .sorted() // organiza em ordem crescente
                    .reduce((a, b) -> a + ", " + b) // junta tudo em uma string: "13:15, 13:45"
                    .orElse("horário desconhecido");

            throw new ConsultaJaAgendadaEntreHorario(String.format("Já existe uma consulta agendada nos horários: %s", horariosExistentes));
        }
    }
}
