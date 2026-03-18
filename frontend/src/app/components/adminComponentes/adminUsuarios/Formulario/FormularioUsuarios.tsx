"use client";

import Style from "./FormularioUsuarios.module.css";
import Global from "@/app/globals.module.css";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useUsuarioStore } from "@/hooks/admin/usuario/useUsuarioStore";
import { useUsuarioUiStore } from "@/hooks/admin/usuario/useUsuarioUiStore";
import { useUsuarioFormStore } from "@/hooks/admin/usuario/useUsuarioFormStore";

export default function FormularioUsuarioComponent() {

  const exibirMensagem = useMessage();

  const usuarioSelecionado = useUsuarioStore((state) => state.usuarioSelecionado);
  const setUsuarioSelecionado = useUsuarioStore((state) => state.handleSelecionarUsuario);
  const obterUsuarios = useUsuarioStore((state) => state.fetchUsuarios);
  
  const cadastrarUsuario = useUsuarioStore((state) => state.cadastrarUsuario);
  const salvarAlteracoesEditadas = useUsuarioStore((state) => state.salvarAlteracoesEditadas);

  const setModoCadastro = useUsuarioUiStore((state) => state.setModoCadastro);
  const setModoEdicao = useUsuarioUiStore((state) => state.setModoEdicao);

  const modoCadastro = useUsuarioUiStore(state => state.modoCadastro);
  const modoEdicao = useUsuarioUiStore(state => state.modoEdicao);

  const formularioUsuario = useUsuarioFormStore((state) => state.formulario);
  const limparFormularioUsuario = useUsuarioFormStore((state) => state.limparFormulario);
  const alterarFormulario = useUsuarioFormStore((state) => state.setCampo);
  
  const loading = useUsuarioStore((state) => state.loading);

  // Usado para cadastrar ou editar os dados
  async function handleEnviarInformacoes() {
    let resposta;

    try {
      if (modoCadastro) {
        resposta = await cadastrarUsuario(formularioUsuario);

      } else if (modoEdicao) {
        if (!usuarioSelecionado) {
          exibirMensagem.mostrarErro("Selecione o usuário!");
          return;
        }
        resposta = await salvarAlteracoesEditadas(usuarioSelecionado?.usuario_id, formularioUsuario);
      }

      if (!resposta) {
        exibirMensagem.mostrarErro("Não foi possível realizar essa operação!")
      }

      await obterUsuarios();
      limparFormularioUsuario();
      setModoCadastro(false);
      setModoEdicao(false);
      setUsuarioSelecionado();
      exibirMensagem.mostrarSucesso(`Usuário ${modoCadastro ? "cadastrado" : "atualizado"} com sucesso.`);

    } catch {
      exibirMensagem.mostrarErro("Erro ao realizar está operação!");
    }
  }

  return (
    <form
      className={Style.containerEditar}
      onSubmit={(e) => {
        e.preventDefault(); // impede reload da página
        handleEnviarInformacoes();        // só chama se o form for válido
      }}
    >
      <h3 className={`${Global.tituloInformativo} ${Style.tituloInformativo}`}>
        {modoCadastro ? "Cadastrar" : "Editar"} usuário
      </h3>

      <p className={Global.subtitulo}>
        Modifique os dados do usuário conforme necessário.
      </p>

      <div className={Style.email}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          value={formularioUsuario.email}
          onChange={(e) =>
            alterarFormulario("email", e.target.value)
          }
        />
      </div>

      <div className={Style.telefone}>
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="tel"
          id="telefone"
          value={formularioUsuario.telefone}
          onChange={(e) => {
            const somenteNumeros = e.target.value.replace(/\D/g, "");
            alterarFormulario("telefone", somenteNumeros);
          }}
        />
      </div>

      {modoEdicao && (
        <div className={Style.status}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={formularioUsuario.ativo ? "Ativo" : "Inativo"}
            onChange={(e) =>
              alterarFormulario("ativo", e.target.value === "Ativo")
            }
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      )}

      <div className={Style.salvar}>
        <button
          type="submit"
          disabled={loading}
          className={`${Style.editarBotaoSalvar} ${loading ? Style.botaoDesativado : ""}`}
        >
          {loading ? "Aguarde..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
