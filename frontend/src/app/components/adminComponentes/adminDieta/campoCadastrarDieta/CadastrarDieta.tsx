import ModalGeral from "@/app/components/modalGeral/modal";
import Style from "./CadastrarDieta.module.css";
import Global from "@/app/globals.module.css";

import { formatarDataParaBackend } from "@/service/admin/dieta/funcoes";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import React from "react";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";
import { useDietaFormStore } from "@/hooks/admin/dieta/clienteDieta/useDietaFormStore";
import { useDietaUiStore } from "@/hooks/admin/dieta/clienteDieta/useDietaUiStore";

export default function CadastrarDieta() {
  const mensagem = useMessage();

  // UI GET
  const botaoCampoCadastrarDieta = useDietaUiStore((state) => state.botaoCampoCadastrarDieta);
  const clientePossuiDietas = useDietaUiStore((state) => state.clientePossuiDietas);

  // UI SET
  const setBotaoCampoCadastrarDieta = useDietaUiStore((state) => state.setBotaoCampoCadastrarDieta);
  const setClientePossuiDietas = useDietaUiStore((state) => state.setClientePossuiDietas);

  // CRUD
  const todasDietas = useDietaStore((state) => state.todasDietas);
  const cadastrarDieta = useDietaStore((state) => state.cadastrarDieta);
  const clienteSelecionado = useDietaStore((state) => state.clienteSelecionado);
  const loading = useDietaStore((state) => state.loading);

  // FORM
  const formulario = useDietaFormStore((state) => state.formulario);
  const setCampo = useDietaFormStore((state) => state.setCampo);
  const limparFormulario = useDietaFormStore((state) => state.limparFormulario);

  async function handleCadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const resposta = await cadastrarDieta(formulario);

    if (resposta) {
      mensagem.mostrarSucesso("Dieta cadastrada com sucesso!");
      setBotaoCampoCadastrarDieta(false);
      limparFormulario();
    } else {
      mensagem.mostrarErro("Não foi possível cadastrar a dieta!");
    }
  }

  return (
    <>
      <ModalGeral
        isOpen={botaoCampoCadastrarDieta}
        onClose={() => {
          setBotaoCampoCadastrarDieta(false);
          limparFormulario();
        }}
        title={`Cadastrar nova dieta`}
      >
        <div className={Style.containerCadastrarDieta}>
          {clientePossuiDietas && (
            <>
              <p className={Global.subtitulo}>
                O cliente já tem dietas cadastradas. <br />
                Escolha uma para editar ou crie uma nova.
              </p>
              <div className={Style.listaDietas}>
                {todasDietas?.map((dieta) => (
                  <button
                    key={dieta.dieta_id}
                    // onClick={() => {
                    //   console.log(dieta);
                    //   // console.log(dieta.dieta_id);
                    //   // colocar função
                    // }}
                    className={Style.botaoPossuiDietas}
                  >
                    {dieta.nome_dieta}
                  </button>
                ))}
              </div>
              <div className={Style.divContinuarCadastro}>
                <button
                  onClick={() => {
                    setClientePossuiDietas(false); // caso clique em continuar para cadastro, apenas vou mudar esse campo para falso onde vai abrir o campo de cadastro
                  }}
                  className={Style.botaoContinuarCadastro}
                >
                  Continuar para cadastro
                </button>
              </div>
            </>
          )}

          {!clientePossuiDietas && (
            <div className={Style.subContainer}>
              <p className={Global.subtitulo}>
                Preencha os dados abaixo corretamente para cadastrar uma nova
                dieta.
              </p>

              <form
                className={Style.formCadastro}
                onSubmit={handleCadastrar}
              >
                <div className={Style.camposCadastro}>
                  <label htmlFor="clienteSelecionado">Cliente:</label>
                  <input
                    type="text"
                    id="clienteSelecionado"
                    value={clienteSelecionado?.nome}
                    readOnly
                    disabled
                  />

                  <label htmlFor="nomeDieta">Nome da dieta:</label>
                  <input
                    type="text"
                    id="nomeDieta"
                    value={formulario.dieta_nome}
                    onChange={(e) =>
                      setCampo("dieta_nome", e.target.value)
                    }
                    required
                  />

                  <div className={Style.dataInicioFinal}>
                    <label htmlFor="dataInicio">Data de início:</label>
                    <input
                      type="datetime-local"
                      id="dataInicio"
                      onChange={(e) =>
                        setCampo(
                          "data_inicio",
                          formatarDataParaBackend(e.target.value)
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
                          formatarDataParaBackend(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                {formulario.dieta_nome &&
                  formulario.data_inicio &&
                  formulario.data_final && (
                    <div className={Style.botaoCadastrarFechar}>
                      <button
                        type="submit"
                        className={`${Style.btnPadrao} ${loading ? Style.btnCarregando : ""
                          }`}
                        disabled={loading}
                      >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                      </button>
                    </div>
                  )}
              </form>
            </div>
          )}
        </div>
      </ModalGeral>
    </>
  );
}
