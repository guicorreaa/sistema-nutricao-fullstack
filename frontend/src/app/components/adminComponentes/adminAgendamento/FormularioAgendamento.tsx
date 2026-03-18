"use client";

import React, { useState, useEffect } from "react";
import Global from "@/app/globals.module.css";
import Style from "./FormularioAgendamento.module.css";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useAgendamentoUiStore } from "@/hooks/admin/agenda/useAgendamentoUiStore";
import { useAgendamentoFormStore } from "@/hooks/admin/agenda/useAgendamentoFormStore";
import { useAgendamentoStore } from "@/hooks/admin/agenda/useAgendamentoStore";

export default function FormularioAgendamentoComponent() {
  const mensagem = useMessage();

  // UI GET
  const campoCadastrarAgendamento = useAgendamentoUiStore((state) => state.campoCadastrarAgendamento);
  const campoEditarAgendamento = useAgendamentoUiStore((state) => state.campoEditarAgendamento);

  // UI SET
  const setCampoCadastrarAgendamento = useAgendamentoUiStore((state) => state.setCampoCadastrarAgendamento);
  const setCampoEditarAgendamento = useAgendamentoUiStore((state) => state.setCampoEditarAgendamento);
  const resetarUi = useAgendamentoUiStore((state) => state.resetarUi);

  // CRUD
  const cadastrarAgendamento = useAgendamentoStore((state) => state.cadastrarAgendamento);
  const editarAgendamento = useAgendamentoStore((state) => state.editarAgendamento);
  const agendamentoSelecionado = useAgendamentoStore((state) => state.agendamentoSelecionado);
  const telefoneTratado = useAgendamentoStore((state) => state.telefoneTratado);
  const celularTratado = useAgendamentoStore((state) => state.celularTratado);
  const setCelularTratado = useAgendamentoStore((state) => state.setCelularTratado);
  const setTelefoneTratado = useAgendamentoStore((state) => state.setTelefoneTratado);

  // FORM
  const formularioAgendamento = useAgendamentoFormStore((state) => state.formulario);
  const alterarDadosFormulario = useAgendamentoFormStore((state) => state.setCampo);
  const limparFormulario = useAgendamentoFormStore((state) => state.limparFormulario);

  async function handleEnviarInformacoes() {
    let resposta = null;

    if (campoCadastrarAgendamento) {
      
      resposta = await cadastrarAgendamento(formularioAgendamento);

    } else if (campoEditarAgendamento) {

      if (!agendamentoSelecionado) {
        mensagem.mostrarErro("Selecione o agendamento!");
        return;
      }
      resposta = await editarAgendamento(agendamentoSelecionado?.consulta_id, formularioAgendamento);
    }

    if (resposta) {
      limparFormulario();
      resetarUi();
      mensagem.mostrarSucesso("Agendamento salvo com sucesso!");
    } else {
      mensagem.mostrarErro("Erro ao salvar o agendamento.");
    }
  }

  // Atualiza os valores tratados sempre que o formulário muda
  useEffect(() => {
    // Máscara Progressiva para Celular
    if (formularioAgendamento.celular) {
      let v = formularioAgendamento.celular.replace(/\D/g, "");
      if (v.length > 0) {
        v = v.replace(/^(\d{2})/, "($1) "); // Adiciona (DD) 
        if (v.length > 9) {
          v = v.replace(/(\d{5})(\d)/, "$1-$2"); // Formato celular: (DD) 99999-9999
        } else if (v.length > 6) {
          v = v.replace(/(\d{4})(\d)/, "$1-$2"); // Formato fixo enquanto digita: (DD) 9999-9999
        }
      }
      setCelularTratado(v);
    } else {
      setCelularTratado("");
    }

    // Máscara Progressiva para Telefone
    if (formularioAgendamento.telefone) {
      let v = formularioAgendamento.telefone.replace(/\D/g, "");
      if (v.length > 0) {
        v = v.replace(/^(\d{2})/, "($1) ");
        if (v.length > 6) {
          v = v.replace(/(\d{4})(\d)/, "$1-$2");
        }
      }
      setTelefoneTratado(v);
    } else {
      setTelefoneTratado("");
    }
  }, [formularioAgendamento.celular, formularioAgendamento.telefone]);

  // formata o celular automaticamente e envia só números pro formulário
  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numeros = e.target.value.replace(/\D/g, "");
    if (numeros.length > 11) numeros = numeros.slice(0, 11);

    let formatado = numeros.replace(/^(\d{2})(\d)/, "($1) $2");
    formatado = formatado.replace(/(\d{5})(\d{4})$/, "$1-$2");

    setCelularTratado(formatado);
    alterarDadosFormulario("celular", numeros);
  };

  // formata o telefone automaticamente
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numeros = e.target.value.replace(/\D/g, "");
    if (numeros.length > 10) numeros = numeros.slice(0, 10);

    let formatado = numeros.replace(/^(\d{2})(\d)/, "($1) $2");
    formatado = formatado.replace(/(\d{4})(\d{4})$/, "$1-$2");

    setTelefoneTratado(formatado);
    alterarDadosFormulario("telefone", numeros);
  };

  // muda data para formato dd/mm/yyyy no formulário
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value; // YYYY-MM-DD
    if (!valor) return;
    const [ano, mes, dia] = valor.split("-");
    const formatado = `${dia}/${mes}/${ano}`;
    alterarDadosFormulario("data_consulta", formatado);
  };

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <div className={Style.subContainer}>
      <h3 className={Global.tituloInformativo}>
        {campoCadastrarAgendamento ? "Agendar consulta" : "Alterar agendamento"} {/* Preciso pegar um campo só para exibir, pois se não é um é o outro */}
      </h3>
      <p className={Global.subtitulo}>
        {campoCadastrarAgendamento ? "Preencha os dados abaixo corretamente para cadastrar uma nova consulta." :
          "Preencha os dados abaixo corretamente para alterar os dados da consulta agendada."}
      </p>

      <form
        className={Style.formCadastro}
        onSubmit={(e) => {
          e.preventDefault();
          handleEnviarInformacoes();
        }}
      >
        <div className={Style.campos}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={formularioAgendamento.nome}
            onChange={(e) => alterarDadosFormulario("nome", e.target.value)}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={formularioAgendamento.email}
            onChange={(e) => alterarDadosFormulario("email", e.target.value)}
            required
          />
        </div>

        <div className={Style.camposMenores}>
          <div className={Style.campos}>
            <label htmlFor="celular">Celular:</label>
            <input
              type="text"
              id="celular"
              value={celularTratado}
              onChange={handleCelularChange}
              required
            />
          </div>

          <div className={Style.campos}>
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              value={telefoneTratado}
              onChange={handleTelefoneChange}
            />
          </div>

          <div className={Style.campos}>
            <label htmlFor="dataConsulta">Data da consulta</label>
            <input
              type="date"
              id="dataConsulta"
              value={
                formularioAgendamento.data_consulta
                  ? formularioAgendamento.data_consulta.split("/").reverse().join("-")
                  : ""
              }
              onChange={handleDataChange}
              required
              min={hoje}
            />
          </div>

          <div className={Style.campos}>
            <label htmlFor="horarioConsulta">Horário</label>
            <input
              type="time"
              id="horarioConsulta"
              value={formularioAgendamento.horario_consulta}
              onChange={(e) => alterarDadosFormulario("horario_consulta", e.target.value)}
              required
            />
          </div>
        </div>

        <div className={Style.campos}>
          <label htmlFor="tipoConsulta">Tipo da consulta:</label>
          <input
            type="text"
            id="tipoConsulta"
            value={formularioAgendamento.tipo_consulta}
            onChange={(e) => alterarDadosFormulario("tipo_consulta", e.target.value)}
            required
          />
        </div>

        {campoEditarAgendamento && (
          <div className={Style.cancelamentoConsulta}>
            <label htmlFor="cancelamentoConsulta">Status da consulta</label>
            <select
              id="cancelamentoConsulta"
              value={
                formularioAgendamento.cancelamento_cliente === undefined
                  ? ""
                  : formularioAgendamento.cancelamento_cliente.toString()
              }
              onChange={(e) =>
                alterarDadosFormulario("cancelamento_cliente", e.target.value === "true")
              }
              required
            >
              <option value="">Selecione</option>
              <option value="false">Ativo</option>
              <option value="true">Cancelado</option>
            </select>
          </div>
        )}

        <div className={Style.campos}>
          <label htmlFor="observacoes">Observações:</label>
          <input
            type="text"
            id="observacoes"
            value={formularioAgendamento.observacoes_consulta}
            onChange={(e) =>
              alterarDadosFormulario("observacoes_consulta", e.target.value)
            }
          />
        </div>

        <div className={Style.botaoCadastrarFechar}>
          <button
            type="submit"
            className={Style.btnCadastrar} // aplica o style do botão verde
          >
            {campoCadastrarAgendamento ? "Cadastrar" : "Atualizar"}
          </button>

          <button
            type="button"
            className={Style.btnFechar} // aplica o style do botão vermelho
            onClick={resetarUi}
          >
            Fechar
          </button>
        </div>
      </form>
    </div>
  );
}
