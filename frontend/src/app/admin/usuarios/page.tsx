"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Global from "../../globals.module.css";
import Nav from "../../components/navigationAdmin/nav";
import Style from "./page.module.css";

import FormularioUsuarioComponent from "../../components/adminComponentes/adminUsuarios/Formulario/FormularioUsuarios";
import TabelaUsuariosCompleta from "@/app/components/adminComponentes/adminUsuarios/tabelaPrincipalUsuario/tabelaPrincipalUsuarios";
import Botoes from "@/app/components/universal/botoesTabela/botoes";

import { toast } from "react-toastify";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUsuarioStore } from "@/hooks/admin/usuario/useUsuarioStore";
import { useUsuarioUiStore } from "@/hooks/admin/usuario/useUsuarioUiStore";
import { limparCampos } from "@/service/admin/agenda/funcoes";
import { useUsuarioFormStore } from "@/hooks/admin/usuario/useUsuarioFormStore";

export default function PainelAdmin() {
  const { loading, userRole } = useAuthGuard("ROLE_ADMIN");

  const searchParams = useSearchParams();

  const exibirMensagem = useMessage();
  const exibirConfirmar = useConfirmar();

  const carregarUsuarios = useUsuarioStore((state) => state.fetchUsuarios);
  const usuarioSelecionado = useUsuarioStore(state => state.usuarioSelecionado);
  const setUsuarioSelecionado = useUsuarioStore(state => state.handleSelecionarUsuario);
  const excluirUsuario = useUsuarioStore(state => state.excluirUsuario);

  const habilitarModoCadastrar = useUsuarioUiStore(state => state.habilitarModoCadastrar);
  const habilitarModoEdicao = useUsuarioUiStore(state => state.habilitarModoEdicao);
  const setModoCadastro = useUsuarioUiStore(state => state.setModoCadastro);

  const modoCadastro = useUsuarioUiStore(state => state.modoCadastro);
  const modoEdicao = useUsuarioUiStore(state => state.modoEdicao);

  const limparFormularioUsuario = useUsuarioFormStore((state) => state.limparFormulario);
  const preencherFormulario = useUsuarioFormStore((state) => state.preencherFormulario);

  async function handleExcluirUsuario() {
    try {
      const respostaUsuario = await exibirConfirmar.perguntar(
        "Tem certeza que deseja excluir este usuário?"
      );
      if (!respostaUsuario) {
        exibirMensagem.mostrarErro("Exclusão cancelada.");
        return;
      }

      if (!usuarioSelecionado) {
        exibirMensagem.mostrarErro("Selecione o usuário!");
        return;
      }

      const respostaRequisicao = await excluirUsuario(usuarioSelecionado.usuario_id);
      if (respostaRequisicao === true) {
        await carregarUsuarios();
        exibirMensagem.mostrarSucesso("Usuário excluído com sucesso.");
        setUsuarioSelecionado();
      } else if (respostaRequisicao === 409) {
        exibirMensagem.mostrarErro("Ocorreu um erro ao tentar excluir o usuário.\n O usuário pode estar associado a outros registros.");
      } else {
        exibirMensagem.mostrarErro("Ocorreu um erro ao tentar excluir o usuário.");
      }
    } catch (erro) {
      console.error("Erro ao excluir usuário:", erro);
      toast.error("Ocorreu um erro ao tentar excluir o usuário.");
    }
  }

  const propsBotoes = {
    item: usuarioSelecionado,
    campo: "normal" as const,
    cadastrar: () => {
      limparFormularioUsuario();
      habilitarModoCadastrar();
      setUsuarioSelecionado();
    },
    editar: () => {
      if (!usuarioSelecionado) {
        exibirMensagem.mostrarErro("Selecione o usuário!");
        return;
      }
      preencherFormulario(usuarioSelecionado);
      habilitarModoEdicao();
    },
    excluir: () => {
      handleExcluirUsuario();
    },
  };

  /**
   * useEffect para verificar se a URL contém o parâmetro "modoCadastro=true" e, se sim, ativar o modo de cadastro. 
   * Isso permite que a página seja aberta diretamente no modo de cadastro quando o link apropriado for acessado. 
   * O useEffect é usado aqui para garantir que essa verificação ocorra apenas uma vez, quando o componente for montado, evitando verificações desnecessárias em 
   * renderizações subsequentes.
   */
  useEffect(() => {
    if (searchParams.get("modoCadastro") === "true") {
      setModoCadastro(true);
    }
  }, [searchParams]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={Global.body}>
      <Nav></Nav>

      <div className={Style.container}>
        <h1 className={Global.titulo}>USUÁRIOS</h1>

        {/* Tabela com todos usuarios cadastrados */}
        <TabelaUsuariosCompleta />

        <Botoes {...propsBotoes} />

        {/* Campo cadastrar e editar usuarios */}
        {(modoCadastro || modoEdicao) && (
          <FormularioUsuarioComponent />
        )}

      </div>
    </div>
  );
}
