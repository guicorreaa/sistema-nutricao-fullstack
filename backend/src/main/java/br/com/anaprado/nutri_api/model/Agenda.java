package br.com.anaprado.nutri_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "agenda")
public class Agenda {

    @Id
    @Column(name = "consulta_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID consulta_id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "celular")
    private String celular;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @Column(name = "data_consulta")
    private LocalDate data_consulta;

    @Column(name = "horario_consulta")
    private LocalTime horario_consulta;

    @Column(name = "tipo_consulta")
    private String tipo_consulta;

    @Column(name = "data_agendamento")
    private LocalDateTime data_agendamento;

    @Column(name = "cancelamento_cliente")
    private boolean cancelamento_cliente;

    @Column(name = "observacoes_consulta")
    private String observacoes_consulta;

}
