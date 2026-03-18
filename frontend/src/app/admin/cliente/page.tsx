"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Global from "../../globals.module.css";
import Style from "./page.module.css";
import Nav from "../../components/navigationAdmin/nav";
import FormularioClienteComponent from "../../components/adminComponentes/adminClientes/Formulario/FormularioCliente";
import TabelaClientes from "@/app/components/adminComponentes/adminClientes/tabelaPrincipal/tabelaCompletaClientes";
import OpcoesCadastro from "@/app/components/adminComponentes/adminClientes/selecionarClieneNovoOuExistente/selecionarOpcaoCadastro";
import SelecionarUsuarioModal from "@/app/components/adminComponentes/adminClientes/tabelaUsuariosSemCadastroEmCliente/tabelaUsuarioSemCadastroEmCliente";
import Botoes from "@/app/components/universal/botoesTabela/botoes";

import { useRouter, useSearchParams } from "next/navigation";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import { useEffect } from "react";
import { useClienteUiStore } from "@/hooks/admin/cliente/useClienteUiStore";
import { useClienteStore } from "@/hooks/admin/cliente/useClienteStore";
import { useFormClienteStore } from "@/hooks/admin/cliente/useClienteFormStore";

export default function PainelAdmin() {
  const { loading, userRole } = useAuthGuard("ROLE_ADMIN");
  const campoMensagem = useMessage();
  const campoConfirmar = useConfirmar();

  // UI GET
  const campoOpcoesParaCadastrarCliente = useClienteUiStore((state) => state.campoOpcoesParaCadastrarCliente);
  const editarCliente = useClienteUiStore((state) => state.editarCliente);
  const campoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.campoSelecionarUsuarioParaNovoCadastroCliente);
  const campoCadastrarInformacoesCliente = useClienteUiStore((state) => state.campoCadastrarInformacoesCliente);

  // UI SET
  const resetarUi = useClienteUiStore((state) => state.resetarUi);
  const setCampoOpcoesParaCadastrarCliente = useClienteUiStore((state) => state.setCampoOpcoesParaCadastrarCliente);
  const setEditarCliente = useClienteUiStore((state) => state.setEditarCliente);
  const setCampoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.setCampoSelecionarUsuarioParaNovoCadastroCliente);
  const setCampoCadastrarInformacoesCliente = useClienteUiStore((state) => state.setCampoCadastrarInformacoesCliente);

  // CRUD
  const clienteSelecionado = useClienteStore((state) => state.clienteSelecionado);
  const usuarioSelecionado = useClienteStore((state) => state.usuarioSelecionado);
  const setClienteSelecionado = useClienteStore((state) => state.setClienteSelecionado);
  const excluirCliente = useClienteStore((state) => state.excluirCliente);
  const fetchClientes = useClienteStore((state) => state.fetchClientes);
  const fetchUsuarios = useClienteStore((state) => state.fetchTabelaUsuarios);

  const limparFormulario = useFormClienteStore((state) => state.limparFormulario);

  // Para redirecionar e manipular a URL (para abrir o campo selecionar usuario ao clicar no botão cadastrar cliente em usuario)
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCadastrar() {
    if (!campoOpcoesParaCadastrarCliente) {
      resetarUi();
      setCampoOpcoesParaCadastrarCliente(true);
      setClienteSelecionado();
      limparFormulario();
    } else {
      resetarUi();
    }
  }

  function handleEditar() {
    if (!editarCliente) {
      resetarUi();
      setEditarCliente(true);
    } else {
      resetarUi();
    }
  }

  async function handleExcluir() {
    if (clienteSelecionado) {
      const resposta = await campoConfirmar.perguntar(
        "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
      );

      if (!resposta) { return; }

      const respostaRequisicao = await excluirCliente(clienteSelecionado.clienteId);

      if (respostaRequisicao) {
        campoMensagem.mostrarSucesso("Cliente excluído com sucesso!");
        await fetchClientes();
      } else {
        campoMensagem.mostrarErro(
          "Não foi possível excluir o cliente. O cliente pode estar associado a outros registros."
        );
      } 
    }
  }

  // Botões da tabela 
  const propsBotoes = {
    item: clienteSelecionado,
    campo: "normal" as const,
    cadastrar: handleCadastrar,
    editar: handleEditar,
    excluir: handleExcluir
  }

  useEffect(() => {
    if (searchParams.get("cadastrarCliente") === "true") {
      setCampoSelecionarUsuarioParaNovoCadastroCliente(true);
      fetchUsuarios();
    }
    // remover o parâmetro da URL
    const url = new URL(window.location.href);
    url.searchParams.delete("cadastrarCliente");
    router.replace(url.toString());
  }, [searchParams, router]);

  // Ao abrir o campo de selecionar usuário para cadastrar cliente, carregar os usuários para preencher a tabela de seleção
  useEffect(() => {
    if (campoSelecionarUsuarioParaNovoCadastroCliente) {
      fetchUsuarios();
    }
  }, [
    campoSelecionarUsuarioParaNovoCadastroCliente,
    fetchUsuarios
  ]);

  // Ao selecionar outro usuario na tabela usuario, fecha os dados de cadastro abaixo
  useEffect(() => {
    setCampoCadastrarInformacoesCliente(false);
  }, [usuarioSelecionado]);

  // Ao selecionar outro cliente na tabela principal, fecha os campos
  useEffect(() => {
    resetarUi();
  }, [clienteSelecionado])

  // Carregar ao iniciar página
  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={Global.body}>
      <Nav></Nav>

      <div className={Style.container}>
        <h1 className={Global.titulo}>CLIENTES</h1>

        <p className={Global.subtitulo}>Gerencie clientes, cadastre novos usuários e edite informações de forma prática e rápida.</p>

        {/* Tabela principal de clientes */}
        <TabelaClientes />

        <Botoes {...propsBotoes} />

        {/* Campo onde pergunta se o usuario existe ou precisa ser criado */}
        {campoOpcoesParaCadastrarCliente && (
          <OpcoesCadastro />
        )}

        {/* Selecionar o usuario para cadastrar como cliente */}
        <SelecionarUsuarioModal />

        {/* Fromulario de cadastro e para editar os dados */}
        {((campoCadastrarInformacoesCliente && usuarioSelecionado) || 
        editarCliente) && <FormularioClienteComponent />}

      </div>
    </div>
  );
}
