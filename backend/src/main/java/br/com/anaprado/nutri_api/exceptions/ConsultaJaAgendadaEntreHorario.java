package br.com.anaprado.nutri_api.exceptions;

public class ConsultaJaAgendadaEntreHorario extends RuntimeException {
    public ConsultaJaAgendadaEntreHorario(String message) {
        super(message);
    }
}
