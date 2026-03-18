package br.com.anaprado.nutri_api.controller.dto.agenda;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendaObterListaResponseDTO(

        String nome,

        LocalDate data_consulta,

        LocalTime horario_consulta

) {
}
