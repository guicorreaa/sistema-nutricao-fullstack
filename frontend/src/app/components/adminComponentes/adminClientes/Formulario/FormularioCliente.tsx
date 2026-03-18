"use client";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import Style from "./FormularioCliente.module.css";
import Global from "@/app/globals.module.css";
import { useEffect } from "react";
import { converterParaFormatoInput, formatarData, formatarDataEnviarFormulario } from "@/service/admin/cliente/funcoes";
import { useClienteUiStore } from "@/hooks/admin/cliente/useClienteUiStore";
import { useClienteStore } from "@/hooks/admin/cliente/useClienteStore";
import { useFormClienteStore } from "@/hooks/admin/cliente/useClienteFormStore";

export default function FormularioClienteComponent() {

  const mensagem = useMessage();

  // UI
  const resetarUi = useClienteUiStore((state) => state.resetarUi);
  const editarCliente = useClienteUiStore((state) => state.editarCliente);
  const campoCadastrarInformacoesCliente = useClienteUiStore((state) => state.campoCadastrarInformacoesCliente);
  const setCampoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.setCampoSelecionarUsuarioParaNovoCadastroCliente);
  const setCampoCadastrarInformacoesCliente = useClienteUiStore((state) => state.setCampoCadastrarInformacoesCliente);
  const setCampoOpcoesParaCadastrarCliente = useClienteUiStore((state) => state.setCampoOpcoesParaCadastrarCliente);
  const setEditarCliente = useClienteUiStore((state) => state.setEditarCliente);

  // CRUD
  const clienteSelecionado = useClienteStore((state) => state.clienteSelecionado);
  const usuarioSelecionado = useClienteStore((state) => state.usuarioSelecionado);
  const fetchClientes = useClienteStore((state) => state.fetchClientes);
  const setClienteSelecionado = useClienteStore((state) => state.setClienteSelecionado);
  const setUsuarioSelecionado = useClienteStore((state) => state.setUsuarioSelecionado);
  const cadastrarCliente = useClienteStore((state) => state.cadastrarCliente);
  const editarClienteCadastrado = useClienteStore((state) => state.editarClienteCadastrado);
  const loading = useClienteStore((state) => state.loading);

  // FORM
  const formularioCliente = useFormClienteStore((state) => state.formulario);
  const limparFormulario = useFormClienteStore((state) => state.limparFormulario);
  const preencherFormulario = useFormClienteStore((state) => state.preencherFormulario);
  const alterarFormulario = useFormClienteStore((state) => state.setCampo);

  async function handleEnviarInformacoes() {
    let resposta;

    if (campoCadastrarInformacoesCliente) {

      if (!usuarioSelecionado) {
        mensagem.mostrarErro("usuário não selecionado!");
        return;
      }
      resposta = await cadastrarCliente(usuarioSelecionado?.usuario_id, formularioCliente);

    } else if (editarCliente) {

      if (!clienteSelecionado) {
        mensagem.mostrarErro("Cliente não selecionado!");
        return;
      }
      resposta = await editarClienteCadastrado(clienteSelecionado?.clienteId, formularioCliente);
    }

    if (resposta) {
      mensagem.mostrarSucesso(campoCadastrarInformacoesCliente ? "Cliente cadastrado com sucesso!" : "Cliente editado com sucesso!");
      resetarUi();
      limparFormulario();
      setClienteSelecionado();
      await fetchClientes();
    } else {
      mensagem.mostrarErro(campoCadastrarInformacoesCliente ? "Não foi possível cadastrar o cliente" : "Não foi possível editar o cliente");
    }
  }

  function handleFechar() {
    resetarUi();
    limparFormulario();
    setUsuarioSelecionado(null);
    setClienteSelecionado(null);
  }

  useEffect(() => {
    // Se o modo editar estiver ativo E existir um cliente selecionado
    if (editarCliente && clienteSelecionado) {

      const dataOriginal = clienteSelecionado.dataNascimento;
      const dataConvertida = converterParaFormatoInput(dataOriginal);

      const clienteCorrigido = {
        ...clienteSelecionado,
        dataNascimento: dataConvertida
      }

      preencherFormulario(clienteCorrigido);

    }
  }, [editarCliente, clienteSelecionado]); // Observe os dois!

  return (
    <div className={Style.containerCadastrarCliente}>
      <p className={Global.subtitulo}>
        Preencha os dados detalhados do cliente, incluindo idade, sexo, nível de
        atividade física e objetivo nutricional.
      </p>
      <form
        className={Style.formCadastro}
        onSubmit={(e) => {
          e.preventDefault();
          handleEnviarInformacoes();
        }}
      >
        <div className={Style.nome}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={formularioCliente.nome}
            onChange={(e) => alterarFormulario("nome", e.target.value)}
            required
          />
        </div>

        <div className={Style.cadastrarUuidSexoIdade}>
          {campoCadastrarInformacoesCliente && (
            <div className={Style.uuid}>
              <label htmlFor="uuidUsuario">UUID</label>
              <input
                type="text"
                id="uuidUsuario"
                value={usuarioSelecionado?.usuario_id ?? ""}
                disabled
              />
            </div>
          )}

          <div className={Style.faixaEtaria}>
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              value={formularioCliente.dataNascimento}
              onChange={(e) =>
                alterarFormulario("dataNascimento", (e.target.value))
              }
              required
            />
          </div>

          <div className={Style.sexo}>
            <label htmlFor="sexo">Sexo</label>
            <select
              id="sexo"
              value={formularioCliente.sexo}
              onChange={(e) => alterarFormulario("sexo", e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
        </div>

        <div className={Style.nivelAtividadeFisica}>
          <label htmlFor="nivelAtividadeFisica">
            Nivel de Atividade Física
          </label>
          <input
            type="text"
            id="nivelAtividadeFisica"
            value={formularioCliente.nivelAtividadeFisica}
            onChange={(e) =>
              alterarFormulario("nivelAtividadeFisica", e.target.value)
            }
            required
          />
        </div>

        <div className={Style.objetivoNutricional}>
          <label htmlFor="objetivoNutricional">Objetivo Nutricional</label>
          <input
            type="text"
            id="objetivoNutricional"
            value={formularioCliente.objetivoNutricional}
            onChange={(e) =>
              alterarFormulario("objetivoNutricional", e.target.value)
            }
            required
          />
        </div>

        <div className={Style.botaoCadastrarFechar}>
          <button
            type="submit"
            className={`${Style.btnCadastrar} ${loading ? Style.btnCarregando : ""
              }`}
            disabled={loading}
          >
            {loading ? `${campoCadastrarInformacoesCliente ? "Cadastrando" : "Atualizando"}`
              : `${campoCadastrarInformacoesCliente ? "Cadastrar" : "Atualizar"}`}
          </button>

          <button
            type="button"
            className={Global.botaoFechar}
            onClick={handleFechar}
          >
            Fechar
          </button>
        </div>
      </form>
    </div>
  );
}
