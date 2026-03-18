"use client";

import Nav from "@/app/components/navigationAdmin/nav";
import Global from "../../globals.module.css";
import Style from "./page.module.css";
import FormularioAgendamentoComponent from "../../components/adminComponentes/adminAgendamento/FormularioAgendamento";
import { useAuthGuard } from "@/hooks/useAuthGuard";

import TabelaAgendamentos from "@/app/components/adminComponentes/adminAgendamento/tabelaPrincipalAgendamentos/tabelaAgendamentos";
import Botoes from "@/app/components/universal/botoesTabela/botoes";

import { useMessage } from "@/app/context/mensagem/MensagemContext";

import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext"
import { useAgendamentoStore } from "@/hooks/admin/agenda/useAgendamentoStore";
import { useAgendamentoUiStore } from "@/hooks/admin/agenda/useAgendamentoUiStore";
import { useAgendamentoFormStore } from "@/hooks/admin/agenda/useAgendamentoFormStore";
import { useEffect } from "react";

export default function Agenda() {
  const mensagem = useMessage();
  const confirmar = useConfirmar();
  const { loading, userRole } = useAuthGuard("ROLE_ADMIN");

  // UI GET
  const campoCadastrarAgendamento = useAgendamentoUiStore((state) => state.campoCadastrarAgendamento);
  const campoEditarAgendamento = useAgendamentoUiStore((state) => state.campoEditarAgendamento);

  // UI GET
  const setCampoEditarAgendamento = useAgendamentoUiStore((state) => state.setCampoEditarAgendamento);
  const setCampoCadastrarAgendamento = useAgendamentoUiStore((state) => state.setCampoCadastrarAgendamento);
  const resetarUi = useAgendamentoUiStore((state) => state.resetarUi);

  // CRUD
  const fetchAgendamentos = useAgendamentoStore((state) => state.fetchAgendamentos);
  const setAgendamentoSelecionado = useAgendamentoStore((state) => state.setAgendamentoSelecionado);
  const agendamentoSelecionado = useAgendamentoStore((state) => state.agendamentoSelecionado);
  const buscarAgendamentoEspecifico = useAgendamentoStore((state) => state.buscarAgendamentoEspecifico);
  const excluirAgendamento = useAgendamentoStore((state) => state.excluirAgendamento);

  // FORM
  const preencherAgendamento = useAgendamentoFormStore((state) => state.preencherFormulario);
  const limparFormulario = useAgendamentoFormStore((state) => state.limparFormulario);

  // Botões
  function handleCadastrar() {
    if (!campoCadastrarAgendamento) {
      resetarUi();
      limparFormulario();
      setAgendamentoSelecionado();
      setCampoCadastrarAgendamento(true);
    } else {
      resetarUi();
    }
  }

  async function handleEditar() {
    if (!campoEditarAgendamento) {
      if (!agendamentoSelecionado) {
        mensagem.mostrarErro("Selecione o agendamento!");
        return;
      }
      const dadosAgendamento = await buscarAgendamentoEspecifico(agendamentoSelecionado?.consulta_id)

      if (!dadosAgendamento) {
        mensagem.mostrarErro("Não fi possível preencher os dados do agendamento!")
        return;
      }

      preencherAgendamento(dadosAgendamento);
      resetarUi();
      setCampoEditarAgendamento(true);
      await fetchAgendamentos();
    } else {
      resetarUi();
      setAgendamentoSelecionado();
    }
  }

  async function handleExcluir() {
    const resposta = await confirmar.perguntar("Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.");

    if (!resposta) {
      return;
    }

    if (!agendamentoSelecionado) {
      mensagem.mostrarErro("Nenhum agendamento selecionado para exclusão.");
      return;
    }
    const sucesso = await excluirAgendamento(agendamentoSelecionado.consulta_id);

    if (sucesso) {
      mensagem.mostrarSucesso("Agendamento excluído com sucesso!");
      await fetchAgendamentos();
    } else {
      mensagem.mostrarErro("Erro ao excluir o agendamento.");
    }
  }

  const propsBotoes = {
    item: agendamentoSelecionado,
    cadastrar: handleCadastrar,
    editar: handleEditar,
    excluir: handleExcluir,
    campo: "normal" as const
  };

  useEffect(() => {
    fetchAgendamentos();
  }, [fetchAgendamentos]);

  useEffect(() => {
    limparFormulario();
    resetarUi();
  }, [agendamentoSelecionado]);

  return (
    <div className={Global.body} >
      <Nav></Nav>
      <div className={Style.container}>
        <h1 className={Global.titulo}>AGENDAMENTOS</h1>

        <p className={Global.subtitulo}>
          Confira os clientes que possuem agendamentos cadastrados.
        </p>

        {/* Tabela principal dos agendamentos */}
        <TabelaAgendamentos />

        {/* Campo dos botões */}
        <Botoes {...propsBotoes} />

        {/* Campo para cadastrar ou editar eidtar um agendamento */}
        {(campoCadastrarAgendamento || campoEditarAgendamento) && (
          <FormularioAgendamentoComponent />
        )}
      </div>
    </div >
  );
}
