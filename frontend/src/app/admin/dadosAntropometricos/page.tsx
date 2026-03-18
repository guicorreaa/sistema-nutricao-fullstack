"use client";

import Nav from "@/app/components/navigationAdmin/nav";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Global from "../../globals.module.css";
import Style from "./page.module.css";
import VisualizarFormularioComponente from "@/app/components//adminComponentes/adminDadosAntropometricos/Visualizar/VisualizarDados";
import FormDadosFixosAntropometria from "@/app/components/adminComponentes/adminDadosAntropometricos/Formulario/formFixo/FormDadosFixosAntropometria";
import TabelaAntropometriaSimples from "@/app/components/adminComponentes/adminDadosAntropometricos/tabelaClientesComAntropometria/TabelaClientesComAntropometria";
import Botoes from "@/app/components/universal/botoesTabela/botoes";
import SelecionarClienteModal from "@/app/components/adminComponentes/adminDadosAntropometricos/tabelaClienteParaCadastroAntropometria/tabelaClienteSimples";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import FormPrimeiroCadastro from "@/app/components/adminComponentes/adminDadosAntropometricos/Formulario/formCadastrarPrimeiraVezAntropometria/FormPrimeiroCadastro";

import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";
import { useEffect } from "react";
import FormDadosVariaveisAntropometria from "@/app/components/adminComponentes/adminDadosAntropometricos/Formulario/formVariavel/FormDadosVariaveisAntropometria";


export default function PaginaDadosAntropometricos() {
  const { loading, userRole } = useAuthGuard("ROLE_ADMIN");
  const mensagem = useMessage();

  // UI GET
  const selecionarClienteCad = useAntropUiStore((state) => state.selecionarClienteCad);
  const editarDados = useAntropUiStore((state) => state.editarDados);
  const campoCadastrarDados = useAntropUiStore((state) => state.campoCadastrarDados);
  const novaAntropometria = useAntropUiStore((state) => state.novaAntropometria);

  // UI SET
  const resetUi = useAntropUiStore((state) => state.resetarUi);
  const setCampoCadastrarDados = useAntropUiStore((state) => state.setCampoCadastrarDados);
  const setSelecionarClienteCad = useAntropUiStore((state) => state.setSelecionarClienteCad);
  const setEditarDados = useAntropUiStore((state) => state.setEditarDados);
  const setNovaAntropometria = useAntropUiStore((state) => state.setNovaAntropometria);
  
  // CRUD
  const fetchTabelaPrincipal = useAntropStore((state) => state.fetchTabelaPrincipal);
  const fetchTabelaSemDados = useAntropStore((state) => state.fetchTabelaSemDados);
  const fetchFatorAtividade = useAntropStore((state) => state.fetchFatorAtividade);
  const fetchDadosEspecifico = useAntropStore((state) => state.fetchDadosEspecifico);
  const setAntropometriaSelecionada = useAntropStore((state) => state.setAntropometriaSelecionada);
  const antropometriaSelecionada = useAntropStore((state) => state.antropometriaSelecionada);
  const editarDadosPut = useAntropStore((state) => state.editarDados);
  const cadastrarDados = useAntropStore((state) => state.cadastrarDados);
  const cadastrarVariavel = useAntropStore((state) => state.cadastrarVariavel);

  // FORM
  const formulario = useAntropFormStore((state) => state.formulario);
  const limparFormulario = useAntropFormStore((state) => state.limparFormulario);
  const popularFormularioFixo = useAntropFormStore((state) => state.popularFormularioFixo);
  


  // Botões da interface
  async function handleCadastrar() {
    resetUi();
    if (!selecionarClienteCad) {
      setCampoCadastrarDados(false);
      setSelecionarClienteCad(true);
      setAntropometriaSelecionada();
      await fetchTabelaSemDados();
    } else {
      setSelecionarClienteCad(false);
    }
  }

  async function handleEditar() {
    resetUi();
    limparFormulario();

    if (!editarDados) {
      if (!antropometriaSelecionada) {
        mensagem.mostrarErro("Selecione o cliente na tabela para editar seus dados!");
        return;
      }
      const dados = await fetchDadosEspecifico(antropometriaSelecionada?.dadosID);

      if (dados) {

        popularFormularioFixo(dados);
        setEditarDados(true);
        setSelecionarClienteCad(false);
      } else {
        console.warn("Não foi possível pegar os dados do cliente");
      }
    } else {
      setEditarDados(false);
    }
  }

  // Usado para atualizar os dados antropométricos fixos já cadastrados pela primeira vez
  async function handleAtualizarDadosFixos() {
    if (!antropometriaSelecionada) {
      mensagem.mostrarErro("Selecione o cliente na tabela para editar seus dados!");
      return;
    }

    const resposta = await editarDadosPut(antropometriaSelecionada.dadosID, formulario);
    if (!resposta) {
      mensagem.mostrarErro("Não foi possível atualizar os dados do cliente!");
      return;
    }

    mensagem.mostrarSucesso("Dados antropométricos atualizados com sucesso!");
    limparFormulario();
    setEditarDados(false);
    await fetchTabelaPrincipal();
  }

  // Usado para cadastrar uma nova antropometria no sistema, sem substituir as anteriores, assim tendo um histórico
  async function handleNovaAvaliacao() {
    if (!antropometriaSelecionada) {
      mensagem.mostrarErro("Selecione o cliente na tabela para cadastrar seus dados!");
      return;
    }

    const resposta = await cadastrarVariavel(antropometriaSelecionada.dadosID, formulario);

    if (!resposta) {
      mensagem.mostrarErro("Erro ao cadastrar os dados antropométricos!");
      return;
    }

    mensagem.mostrarSucesso("Novos dados antropométricos cadastrados");
    setNovaAntropometria(false);
    limparFormulario();
    await fetchTabelaPrincipal();
  }

  // Botões da tabela
  const propsBotoes = {
    item: antropometriaSelecionada,
    campo: "antropometria" as const,
    cadastrar: () => {
      handleCadastrar();
    },
    editar: () => {
      handleEditar();
    },
    novaAvaliacao: () => {
      resetUi();
      setNovaAntropometria(true);
    }
  };

  useEffect(() => {
    fetchTabelaPrincipal();
    fetchFatorAtividade();
  }, [fetchTabelaPrincipal, fetchFatorAtividade]);


  return (
    <div className={Global.body}>
      <Nav></Nav>
      <div className={Global.container}>
        <h1 className={Style.titulo}>DADOS ANTROPOMÉTRICOS</h1>

        {/* Tabela principal */}
        <TabelaAntropometriaSimples />

        <Botoes {...propsBotoes} />

        {/* Selecionar cliente para cadastrar dados antropometricos (apenas clientes que não tem dados cadastrados) */}
        <SelecionarClienteModal />

        {/* Campo primeiro cadastro antropométrico*/}
        {campoCadastrarDados && (
          <FormPrimeiroCadastro />
        )}

        {/* Campo editar dados fixos antropométricos */}
        {editarDados && (
          <FormDadosFixosAntropometria botaoAtivo={true} onSubmit={handleAtualizarDadosFixos} />
        )}

        {/* Campo para cadastrar uma nova antropometria */}
        {novaAntropometria && (
          <FormDadosVariaveisAntropometria botaoAtivo={true} onSubmit={handleNovaAvaliacao} />
        )}

        {/* Vizualizar dados completos de uma pessoa especifica */}
        <VisualizarFormularioComponente />
      </div>
    </div>
  );
}
