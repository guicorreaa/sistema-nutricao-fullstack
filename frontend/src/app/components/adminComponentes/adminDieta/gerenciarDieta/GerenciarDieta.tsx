import ModalGeral from "@/app/components/modalGeral/modal";
import Global from "@/app/globals.module.css";
import Style from "./GerenciarDieta.module.css";

import { DadosDietas } from "@/service/admin/dieta/interfaces";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";

import React from "react";
import { useDietaUiStore } from "@/hooks/admin/dieta/clienteDieta/useDietaUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";
import { useDietaFormStore } from "@/hooks/admin/dieta/clienteDieta/useDietaFormStore";

export default function GerenciarDieta() {
  const mensagem = useMessage();
  const confirmar = useConfirmar();

  // UI GET
  const campoGerenciarDieta = useDietaUiStore((state) => state.campoGerenciarDieta);
  const verTabelaDieta = useDietaUiStore((state) => state.verTabelaDieta);
  const campoAlterarDieta = useDietaUiStore((state) => state.campoAlterarDieta);

  // UI SET
  const setCampoGerenciarDieta = useDietaUiStore((state) => state.setCampoGerenciarDieta);
  const setVerTabelaDieta = useDietaUiStore((state) => state.setVerTabelaDieta);
  const setCampoAlterarDieta = useDietaUiStore((state) => state.setCampoAlterarDieta);

  // CRUD
  const dietaSelecionada = useDietaStore((state) => state.dietaSelecionada);
  const setDietaSelecionada = useDietaStore((state) => state.setDietaSelecionada);
  const excluirDieta = useDietaStore((state) => state.excluirDieta);
  const salvarAlteracoesDieta = useDietaStore((state) => state.salvarAlteracoesDieta);
  const clienteSelecionado = useDietaStore((state) => state.clienteSelecionado);
  const todasDietas = useDietaStore((state) => state.todasDietas);
  const loading = useDietaStore((state) => state.loading);

  // FORM
  const formulario = useDietaFormStore((state) => state.formulario);
  const setCampo = useDietaFormStore((state) => state.setCampo);
  const limparFormulario = useDietaFormStore((state) => state.limparFormulario);

  async function handleExcluirDieta() {
    if (!dietaSelecionada) return;

    const resposta = await confirmar.perguntar("Desejá excluir a dieta selecionada?");
    if (!resposta) return;

    const deletado = await excluirDieta(dietaSelecionada);
    if (!deletado) {
      mensagem.mostrarErro("Não foi possível deletar a dieta!");
    }
    setCampoGerenciarDieta(false);
    setDietaSelecionada(null);
    mensagem.mostrarSucesso("Dieta excluída com sucesso!");
    return;
  }

  function handleBotaoAlterarDieta() {
    setVerTabelaDieta(false);
    setCampoAlterarDieta(true);
  }

  async function handleAlterarDieta(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const resposta = await salvarAlteracoesDieta(formulario);

    if (resposta) {
      mensagem.mostrarSucesso("Dieta alterada com sucesso!");
      setCampoGerenciarDieta(false);
    } else {
      mensagem.mostrarErro("Não foi possível alterar a dieta");
    }
  }

  return (
    <ModalGeral
      isOpen={campoGerenciarDieta}
      onClose={() => {
        setCampoGerenciarDieta(false);
        limparFormulario();
      }}
      title="Gerenciar dietas"
    >
      {verTabelaDieta && (
        <div>
          <p className={Global.subtitulo}>
            Aqui podemos alterar e excluir as dietas de:{" "}
            {clienteSelecionado?.nome}
          </p>

          {!todasDietas && (
            <p className={`${Global.subtitulo} ${Style.subtituloMensagem}`}>
              Esse cliente não possui dietas cadastradas.
            </p>
          )}

          {todasDietas && (
            <table className={Style.tabelaDietas}>
              <thead>
                <tr>
                  <th className={Global.thNome}>Nome</th>
                  <th>Data Início</th>
                  <th>Data Final</th>
                </tr>
              </thead>
              <tbody>
                {todasDietas?.map((dieta) => (
                  <tr
                    key={dieta.dieta_id}
                    onClick={() => {
                      setDietaSelecionada(dieta);
                    }}
                    className={
                      dietaSelecionada?.dieta_id === dieta.dieta_id
                        ? Global.selecionado
                        : ""
                    }
                  >
                    <td>{dieta.nome_dieta}</td>
                    <td>{dieta.data_inicio}</td>
                    <td>{dieta.data_final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {dietaSelecionada && (
            <div className={Style.botaoTabelaDietas}>
              <button
                className={`${Style.btnPadrao} ${loading ? Style.btnCarregando : ""
                  }`}
                disabled={loading}
                onClick={handleBotaoAlterarDieta}
              >
                Alterar
              </button>

              <button
                className={`${Style.btnPadrao} ${loading ? Style.btnCarregando : ""
                  }`}
                disabled={loading}
                onClick={handleExcluirDieta}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      )}

      {campoAlterarDieta && (
        <div className={Style.subContainer}>
          <p className={Global.subtitulo}>
            Edite as informações abaixo e confirme as alterações.
          </p>

          <p className={Global.subtitulo}>
            Dieta selecionada: {dietaSelecionada?.nome_dieta}
            <br />
            Cliente: {clienteSelecionado?.nome}
            <br />
            Data Inicío: {dietaSelecionada?.data_inicio}
            <br />
            Data Final: {dietaSelecionada?.data_final}
          </p>

          <form
            className={Style.formCadastro}
            onSubmit={handleAlterarDieta}
          >
            <div className={Style.camposCadastro}>
              <label htmlFor="nomeDieta">Nome da dieta:</label>
              <input
                type="text"
                id="nomeDieta"
                value={formulario?.dieta_nome}
                onChange={(e) =>
                  setCampo(
                    "dieta_nome",
                    e.target.value
                  )
                }
                placeholder={formulario?.dieta_nome}
              />

              <div className={Style.dataInicioFinal}>
                <label htmlFor="dataInicio">Data de início:</label>
                <input
                  type="datetime-local"
                  id="dataInicio"
                  onChange={(e) =>
                    setCampo(
                      "data_inicio",
                      e.target.value
                    )
                  }
                />

                <label htmlFor="dataFinal">Data final:</label>
                <input
                  type="datetime-local"
                  id="dataFinal"
                  onChange={(e) =>
                    setCampo(
                      "data_final",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {formulario?.dieta_nome &&
              formulario?.data_inicio &&
              formulario?.data_final && (
                <div className={Style.botaoCadastrarFechar}>
                  <button
                    type="submit"
                    className={`${Style.btnPadrao} ${loading ? Style.btnCarregando : ""
                      }`}
                    disabled={loading}
                  >
                    {loading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              )}
          </form>
        </div>
      )}
    </ModalGeral>
  );
}
