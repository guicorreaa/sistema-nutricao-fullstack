"use client";

// Externos
import React, { useEffect } from "react";

// Componentes
import Nav from "../../components/navigationAdmin/nav";
import SelecionarCliente from "@/app/components/adminComponentes/adminDieta/selecionarClienteBotao/selecionarClienteBotao";
import TabelaCliente from "@/app/components/adminComponentes/adminDieta/tabelaSelecionarCliente/TabelaCliente";
import BotoesMenus from "@/app/components/adminComponentes/adminDieta/botoesMenu/BotoesMenus";
import CadastrarDietas from "@/app/components/adminComponentes/adminDieta/campoCadastrarDieta/CadastrarDieta";
import GerenciarDieta from "@/app/components/adminComponentes/adminDieta/gerenciarDieta/GerenciarDieta";
import CadastrarRefeicao from "@/app/components/adminComponentes/adminDieta/cadastrarRefeicao/CadastrarRefeicao";
import GerenciarRefeicao from "@/app/components/adminComponentes/adminDieta/gerenciarRefeicao/GerenciarRefeicao";
import AlimentosDaRefeicao from "@/app/components/adminComponentes/adminDieta/cadastrarAlimentosRefeicao/AlimentosDaRefeicao";

// CSS
import Global from "../../globals.module.css";
import Style from "./page.module.css";

import EditarTabelaAlimentos from "@/app/components/adminComponentes/adminDieta/editarTabelaAlimentos/EditarTabelaAlimentos";
import BotaoGerenciarAlimentos from "@/app/components/adminComponentes/adminDieta/botaoGerenciaAlimentos/BotaoGerenciarAlimentos";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useItemRefeicaoUiStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";
import { useTipoRefeicaoStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoStore";
import { useAlimentoUiStore } from "@/hooks/admin/dieta/alimentos/useAlimentoUiStore";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";


export default function Dieta() {
  const { loading, userRole } = useAuthGuard("ROLE_ADMIN");

  // UI GET
  const campoItemRefeicaoSendoUsado = useItemRefeicaoUiStore((state) => state.campoItemRefeicaoSendoUsado);
  
  // alimento
  const campoEditarCadastrarAlimentos = useAlimentoUiStore((state) => state.campoEditarCadastrarAlimentos);

  // CRUD
  // cliente
  const clienteSelecionado = useDietaStore((state) => state.clienteSelecionado);

  // tipo refeicao
  const fetchTiposDeRefeicao = useTipoRefeicaoStore((state) => state.fetchTiposDeRefeicao);
  
  // categoria
  const fetchCategorias = useCategoriaStore((state) => state.fetchCategorias);

  useEffect(() => {
    fetchTiposDeRefeicao();
    fetchCategorias();
  }, [fetchTiposDeRefeicao, fetchCategorias]);

  return (
    <div className={Global.body}>
      <Nav />
      <div className={Style.container}>
        <h1 className={Global.titulo}>Dietas</h1>

        {/* Exibir campo onde vou cadastrar/alterar os itens de dentro da refeição*/}
        {!campoItemRefeicaoSendoUsado && (
          <>
            <p className={Global.subtitulo}>
              Selecione a opção desejada.
            </p>

            {/* Botão para selecionar o cliente ou alterar tabela alimentos */}
            <div className={Style.botoesPrincipais}>
              <SelecionarCliente />
              <BotaoGerenciarAlimentos />
            </div>

            {/* Exibir a tabela com todos os clientes */}
            <TabelaCliente />

            {/* Ao selecionar o cliente e confirmar ele exibe os botões*/}
            {clienteSelecionado && <BotoesMenus />}

            {/* Opções */}
            <CadastrarDietas />
            <GerenciarDieta />
            <CadastrarRefeicao />
            <GerenciarRefeicao />

          </>
        )}

        {/* Exibir campo onde vou cadastrar/alterar os itens de dentro da refeição*/}
        {campoItemRefeicaoSendoUsado && (
          <AlimentosDaRefeicao />
        )}

        {/* Campo onde posso cadastrar ou editar os alimentos */}
        {campoEditarCadastrarAlimentos && (
          <EditarTabelaAlimentos />
        )}
      </div>
    </div>
  );
}
