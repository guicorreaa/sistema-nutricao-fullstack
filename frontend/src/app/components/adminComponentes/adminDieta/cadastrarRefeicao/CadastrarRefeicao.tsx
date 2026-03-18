import Style from "./CadastrarRefeicao.module.css";
import Global from "@/app/globals.module.css";
import Modal from "@/app/components/modal/modal";
import CadastrarTipoRefeicao from "@/app/components/adminComponentes/adminDieta/tipoRefeicao/cadastrar/CadastrarTipoRefeicao";
import { useMessage } from "@/app/context/mensagem/MensagemContext";

import CampoSelecionarDieta from "@/app/components/adminComponentes/adminDieta/campoSelecionarDieta/CampoSelecionarDieta";
import ModalMensagem from "@/app/components/mensagem/mensagem";

import React from "react";
import { useRefeicaoFormStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoFormStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useTipoRefeicaoStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoStore";
import { useTipoRefeicaoFormStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoFormStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useItemRefeicaoFormStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoFormStore";
import { useItemRefeicaoUiStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoUiStore";
import { useTipoRefeicaoUiStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function CadastrarRefeicao() {

  const mensagem = useMessage();

  // ---------- UI GET ---------- 
  // refeição
  const campoCadastrarRefeicao = useRefeicaoUiStore((state) => state.campoCadastrarRefeicao);
  const tabelaSelecaoDietas = useRefeicaoUiStore((state) => state.tabelaSelecaoDietas);
  const abrirFormularioRefeicao = useRefeicaoUiStore((state) => state.abrirFormularioRefeicao);
  
  // ---------- UI SET ---------- 
  // refeicao
  const setCampoCadastrarRefeicao = useRefeicaoUiStore((state) => state.setCampoCadastrarRefeicao);
  const irParaSelecaoDietas = useRefeicaoUiStore((state) => state.irParaSelecaoDietas);
  const irParaFormularioRefeicao = useRefeicaoUiStore((state) => state.irParaFormularioRefeicao);
  const setTabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.setTabelaRefeicoesDaDieta);

  // tipo refeicao
  const setCampoCadastrarTipoRefeicao = useTipoRefeicaoUiStore((state) => state.setCampoCadastrarTipoRefeicao);
  
  // item refeição
  const setCampoItemRefeicaoSendoUsado = useItemRefeicaoUiStore((state) => state.setCampoItemRefeicaoSendoUsado);

  // ---------- CRUD ---------- 
  // dieta
  const fetchDietasDoCliente = useDietaStore((state) => state.fetchDietasDoCliente);
  const todasDietas = useDietaStore((state) => state.todasDietas);
  
  // refeição
  const cadastraroNovaRefeicao = useRefeicaoStore((state) => state.cadastrarRefeicao);
  const setRefeicaoSelecionada = useRefeicaoStore((state) => state.setRefeicaoSelecionada);
  const loading = useRefeicaoStore((state) => state.loading);
  
  // tipo refeicao
  const dadosTipoRefeicao = useTipoRefeicaoStore((state) => state.dadosTipoRefeicao);

  // ---------- FORM ---------- 
  // tipo refeição
  const formularioTipoRefeicao = useTipoRefeicaoFormStore((state) => state.formulario);
  
  // refeição
  const limparFormularioRefeicao = useRefeicaoFormStore((state) => state.limparFormulario);
  const formularioRefeicao = useRefeicaoFormStore((state) => state.formulario);
  const alterarFormularioRefeicao = useRefeicaoFormStore((state) => state.setCampo);
  
  // item refeicao
  const setCampoItemRefeicao = useItemRefeicaoFormStore((state) => state.setCampo);



  function handleFecharModalCadastrarRefeicao() {
    limparFormularioRefeicao();
    setCampoCadastrarRefeicao(false);
    irParaSelecaoDietas();
  }

  async function handleEnviarFormularioRefeicao(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const resposta = await cadastraroNovaRefeicao(formularioRefeicao);
    setCampoCadastrarRefeicao(false);
    // irParaFormularioRefeicao();

    if (resposta) {
      setRefeicaoSelecionada(resposta);
      setCampoItemRefeicao("refeicao_id", resposta.refeicao_id);

      setCampoItemRefeicaoSendoUsado(true);
      mensagem.mostrarSucesso("Refeição cadastrada com sucesso!");
    } else {
      mensagem.mostrarErro("Não foi possível cadastrar a refeição!");
    }
  }

  async function handleBotaoNovoTipo() {
    setCampoCadastrarRefeicao(false);
    setCampoCadastrarTipoRefeicao(true);
    irParaSelecaoDietas();
  }

  async function handleBotaoVoltar() {
    irParaSelecaoDietas();
    limparFormularioRefeicao();
    setTabelaRefeicoesDaDieta(true);
    await fetchDietasDoCliente(false);
  }

  return (
    <>
      <ModalMensagem />

      <Modal
        isOpen={campoCadastrarRefeicao}
        onClose={handleFecharModalCadastrarRefeicao}
        title="Cadastrar Refeição"
      >
        <>
          {!todasDietas && (
            <p className={`${Global.subtitulo} ${Style.subtituloMensagem}`}>
              Esse cliente não possui dietas cadastradas.
            </p>
          )}

          {/* Se tiver dietas cadastradas nesse cliente, vão ser exibidas e ao clicar nela vai preencher o formulario com o dieta_id, assim ao enviar o cadastro vai 
        já estar tudo certinho*/}
          {todasDietas && tabelaSelecaoDietas && (
            <CampoSelecionarDieta
              onClick={(dieta) => {
                alterarFormularioRefeicao(
                  "dieta_id",
                  dieta.dieta_id
                );
                irParaFormularioRefeicao();
              }}
              title="Selecione a dieta que deseja criar uma refeição."
            />
          )}

          {abrirFormularioRefeicao && (
            <div>
              <form
                className={Style.formulario}
                onSubmit={handleEnviarFormularioRefeicao}
              >
                <p className={Global.subtitulo}>Preencha o formulario abaixo</p>
                <div className={Style.horarioTipo}>
                  {/* Horário da Refeição */}
                  <div className={Style.campo}>
                    <label>Horário da Refeição</label>
                    <input
                      type="time"
                      name="horario"
                      onChange={(e) =>
                        alterarFormularioRefeicao(
                          "horario",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  {/* Tipo Refeição */}
                  <div className={`${Style.campo}`}>
                    <label>Tipo de Refeição</label>

                    <div className={Style.tipoCadastrar}>
                      <select
                        name="tipoRefeicao"
                        required
                        className={Style.campoTipo}
                        onChange={(e) =>
                          alterarFormularioRefeicao(
                            "tipo_refeicao",
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value="" hidden>
                          Selecione...
                        </option>

                        {dadosTipoRefeicao?.map((tipo) => (
                          <option key={tipo.tipo_id} value={tipo.tipo_id}>
                            {tipo.descricao}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        className={Style.cadastrarRefeicao}
                        onClick={handleBotaoNovoTipo}
                        title="Cadastrar novo tipo de refeição"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Observação */}
                <div className={Style.campoFull}>
                  <label>Observação</label>
                  <textarea
                    name="observacao"
                    placeholder="Digite uma observação..."
                    onChange={(e) =>
                      alterarFormularioRefeicao(
                        "observacoes",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>

                <div className={Style.acoes}>
                  <button
                    type="button"
                    className={Style.btnSecundario}
                    onClick={handleBotaoVoltar}
                  >
                    Voltar
                  </button>
                  <button 
                  type="submit" 
                  className={Style.btnPrincipal}
                  disabled={loading}
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      </Modal>

      <CadastrarTipoRefeicao />
    </>
  );
}
