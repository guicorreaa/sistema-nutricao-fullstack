import { FormularioRefeicao, FormularioTipoRefeicao, TipoRefeicao } from "@/service/admin/dieta/interfaces";
import { useEffect, useState } from "react";

import { cadastrarNovoTipoRefeicao, pegarTiposDeRefeicao, cadastrarRefeicaoNova } from "@/service/admin/dieta/requisicoes";

export function useTipoRefeicaoCrud(
  formularioTipoRefeicao: FormularioTipoRefeicao,
  formularioRefeicao: FormularioRefeicao,
  alterarFormularioTipoRefeicao: <T extends keyof FormularioTipoRefeicao>(
    campo: T,
    valor: FormularioTipoRefeicao[T]
  ) => void,
  limparCamposFormularioTipoRefeicao: () => void
) {

  // *************************** Dados ***************************
  const [dadosTipoRefeicao, setDadosTipoRefeicao] = useState<TipoRefeicao[] | null>(null);

  // *************************** Campos ***************************
  const [campoCadastrarTipoRefeicao, setCampoCadastrarTipoRefeicao] =
    useState(false);

  // *************************** Carregando ***************************
  const [carregando, setCarregando] = useState(false);

  // *************************** Funções ***************************
  // Função para cadastrar uma novo tipo de refeição
  async function cadastrarTipoRefeicao() {
    try {
      setCarregando(true);

      const resposta = await cadastrarNovoTipoRefeicao(formularioTipoRefeicao);

      if (resposta) {
        setCampoCadastrarTipoRefeicao(false);
        limparCamposFormularioTipoRefeicao();
      } else {
        console.log("Não foi ossível cadastrar novo tipo refeição");
      }
      return true;
    } catch (err) {
      // setMensagem("❌ Erro ao cadastrar cliente");
    } finally {
      setCarregando(false);
    }
  }

  // Função para cadastrar uma nova refeição
  async function cadastraroNovaRefeicao() {
    try {
      setCarregando(true);

      const resposta = await cadastrarRefeicaoNova(formularioRefeicao);

      if (resposta) {
        setCampoCadastrarTipoRefeicao(false);
        limparCamposFormularioTipoRefeicao();
        return resposta; // 🔥 RETORNA A REFEIÇÃO
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setCarregando(false);
    }
  }

  async function carregarTiposDeRefeicao() {
    try {
      setCarregando(true);

      const resposta = await pegarTiposDeRefeicao();

      if (resposta) {
        setDadosTipoRefeicao(resposta);
        setCampoCadastrarTipoRefeicao(false);
      } else {
        console.log("Não foi ossível cadastrar novo tipo refeição");
      }
      return true;
    } catch (err) {
      // setMensagem("❌ Erro ao cadastrar cliente");
    } finally {
      setCarregando(false);
    }
  }

  // *************************** UseEffects ***************************
  useEffect(() => {
    carregarTiposDeRefeicao();
  }, [])

  return {
    campoCadastrarTipoRefeicao,
    setCampoCadastrarTipoRefeicao,
    carregando,
    setCarregando,
    cadastrarTipoRefeicao,
    carregarTiposDeRefeicao,
    dadosTipoRefeicao,
    cadastraroNovaRefeicao
  };
}
