"use client";

import Image from "next/image";
import Global from "@/app/globals.module.css";
import Style from "./TabelaClientesComAntropometria.module.css";
import React, { useState } from "react";

import Vizualizar from "@/app/images/visualizar.png";
import GerarRelatorioImg from "@/app/images/gerarRelatorio.png";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useMessage } from "@/app/context/mensagem/MensagemContext";

export default function TabelaAntropometriaSimples() {
  const mensagem = useMessage();

  // UI SET
  const setCampoCadastrarDados = useAntropUiStore((state) => state.setCampoCadastrarDados);
  const setEditarDados = useAntropUiStore((state) => state.setEditarDados);
  const setVisualizarDados = useAntropUiStore((state) => state.setVisualizarDados);

  // CRUD
  const setCampoPesquisa = useAntropStore((state) => state.setCampoPesquisaPrincipal);
  const fetchDadosEspecifico = useAntropStore((state) => state.fetchDadosEspecifico);
  const dadosTabelaPrincipal = useAntropStore((state) => state.dadosTabelaPrincipal);
  const antropometriaSelecionada = useAntropStore((state) => state.antropometriaSelecionada);
  const setAntropometriaSelecionada = useAntropStore((state) => state.setAntropometriaSelecionada);

  const paginaPrincipal = useAntropStore((state) => state.paginaPrincipal);
  const setPaginaPrincipal = useAntropStore((state) => state.setPaginaPrincipal);
  const totalPaginasPrincipal = useAntropStore((state) => state.totalPaginasPrincipal);
  
  // Form
  const limparFormulario = useAntropFormStore((state) => state.limparFormulario);
  const popularFormularioCompleto = useAntropFormStore((state) => state.popularFormularioCompleto);


  const [buscarPessoaLocal, setBuscarPessoaLocal] = useState("");

  function handlePesquisar() {
    setCampoPesquisa(buscarPessoaLocal);
    setPaginaPrincipal(0);
  }

  function handleGerarRelatorio() {
    if (!antropometriaSelecionada) {
      mensagem.mostrarErro("Selecione um cliente na tabela para gerar o relatório!");
      return;
    }
    const idDado = antropometriaSelecionada.dadosID
    window.open(`/admin/relatorio/${idDado}`, "_blank");
  }

  async function handleVisualizarDados(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!antropometriaSelecionada) {
      mensagem.mostrarErro("Selecione o cliente antes de visualizar os dados!");
      return;
    }
    const dados = await fetchDadosEspecifico(antropometriaSelecionada?.dadosID);

    if (!dados) {
      mensagem.mostrarErro("Não foi possível exibir os dados antropométricos do cliente!");
      return;
    }

    popularFormularioCompleto(dados);
    setVisualizarDados(true);
  }


  return (
    <div>
      <p className={Global.subtitulo}>
        Confira os clientes que possuem dados antropométricos cadastrados.
      </p>
      <div className={Global.campoPesquisaTabelas}>
        <input type="text" placeholder="Pesquisar usuário..."
          value={buscarPessoaLocal}
          onChange={(e) => setBuscarPessoaLocal(e.target.value)}
          onBlur={() => {
            if (buscarPessoaLocal === "") {
              setCampoPesquisa("");
            }
          }} />
        <span className={Global.iconeLupa}>🔍</span>
        <button onClick={handlePesquisar}>Buscar</button>
      </div>

      <div className={Global.tabelaClientesContainer}>
        <table className={Global.tabelaClientes}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th className={Style.campoBotaoVisualizarTitulo}></th>
            </tr>
          </thead>

          <tbody>
            {dadosTabelaPrincipal?.map((dado) => (
              <tr
                key={dado.dadosID}
                onClick={() => setAntropometriaSelecionada(dado)}
                className={
                  antropometriaSelecionada?.dadosID === dado.dadosID
                    ? Global.selecionado
                    : ""
                }
              >
                <td>{dado.nomeCliente}</td>
                <td>{dado.email}</td>
                <td className={Style.campoBotaoVisualizar}>
                  {antropometriaSelecionada?.dadosID === dado.dadosID && (
                    <div className={Style.campoBotoes}>

                      <button
                        className={Style.btnGerarRelatorio}
                        title="Gerar Relatório"
                        onClick={(e) => handleGerarRelatorio()}
                      >
                        <Image
                          className={Style.imagemGerarRelatorio}
                          src={GerarRelatorioImg}
                          alt="Gerar Relatório"
                        />
                      </button>

                      <button
                        className={Style.btnVisualizar}
                        title="Visualizar"
                        onClick={(e) => handleVisualizarDados(e)}
                      >
                        <Image
                          className={Style.imagemVisualizar}
                          src={Vizualizar}
                          alt="visualizar"
                        />
                      </button>

                    </div>
                  )}
                </td>
              </tr>
            )) ?? (
                <tr>
                  <td colSpan={3} className={Style.semDados}>
                    Nenhum dado encontrado
                  </td>
                </tr>
              )}
          </tbody>
        </table>


        {/* Paginação */}
        <div className={Style.pagination}>
          <button
            disabled={paginaPrincipal === 0}
            onClick={() => setPaginaPrincipal(paginaPrincipal - 1)}
          >
            ◀ Anterior
          </button>

          <span>
            Página:{" "}
            <input
              type="number"
              min={1}
              max={totalPaginasPrincipal}
              value={paginaPrincipal + 1}
              onChange={(e) =>
                setPaginaPrincipal(Number(e.target.value) - 1)
              }
              className={Style.inputPagina}
            />{" "}
            / {totalPaginasPrincipal ?? 1}
          </span>

          <button
            disabled={
              paginaPrincipal + 1 >= (totalPaginasPrincipal ?? 1)
            }
            onClick={() => setPaginaPrincipal(paginaPrincipal + 1)}
          >
            Próxima ▶
          </button>
        </div>
      </div>
    </div>
  );
}
