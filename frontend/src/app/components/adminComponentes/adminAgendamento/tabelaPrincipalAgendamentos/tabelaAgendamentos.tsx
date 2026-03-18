"use client"

import React from "react";
import Global from "@/app/globals.module.css";
import Style from "./tabelaAgendamentos.module.css"; // crie esse CSS se quiser estilos específicos

import { InformacoesTabelaAgendamento } from "@/service/admin/agenda/interfaces";

import {
  formatarCelular,
  formatarTelefone,
  mudarDataConsultaBACKEND,
  exibirDataConsultaTabela,
} from "@/service/admin/agenda/funcoes";
import { useAgendamentoStore } from "@/hooks/admin/agenda/useAgendamentoStore";

export default function TabelaAgendamentos() {

  // CRUD
  const dadosTabelaAgendamento = useAgendamentoStore((state) => state.dadosTabelaAgendamento);
  const agendamentoSelecionado = useAgendamentoStore((state) => state.agendamentoSelecionado);
  const setAgendamentoSelecionado = useAgendamentoStore((state) => state.setAgendamentoSelecionado);
  const setPesquisaNome = useAgendamentoStore((state) => state.setPesquisaNome);
  const setPaginaAtual = useAgendamentoStore((state) => state.setPaginaAtual);
  const paginaAtual = useAgendamentoStore((state) => state.paginaAtual);
  const totalPaginas = useAgendamentoStore((state) => state.totalPaginas);


  const [campoPesquisarLocal, setCampoPesquisarLocal] = React.useState("");

  function handleBuscar() {
    setPesquisaNome(campoPesquisarLocal);
    setPaginaAtual(0); 
  }

  return (
    <>
      <div className={Style.tabelaClientesContainer}>

        <div className={Global.campoPesquisaTabelas}>
          <input
            type="text"
            placeholder="Pesquisar pelo nome ou e-mail"
            value={campoPesquisarLocal}
            onChange={(e) => setCampoPesquisarLocal(e.target.value)}
            onBlur={() => {
              if (campoPesquisarLocal === "") {
                handleBuscar();
              }
            }}
          />
          <span className={Global.iconeLupa}>🔍</span>
          <button onClick={() => handleBuscar()}    
          >
            Buscar
          </button>
        </div>

        <table className={Style.tabelaClientes}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Celular</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Data Consulta</th>
              <th>Horário</th>
              <th>Tipo</th>
              <th>Criado em</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>

          <tbody>
            {dadosTabelaAgendamento?.length ? (
              dadosTabelaAgendamento.map((agendamento) => (
                <tr
                  key={agendamento.consulta_id}
                  onClick={() => setAgendamentoSelecionado(agendamento)}
                  className={
                    agendamentoSelecionado?.consulta_id ===
                      agendamento.consulta_id
                      ? Style.selecionado
                      : ""
                  }
                >
                  <td>{agendamento.nome}</td>
                  <td>{formatarCelular(agendamento.celular)}</td>
                  <td>{formatarTelefone(agendamento.telefone)}</td>
                  <td>{agendamento.email}</td>
                  <td>{mudarDataConsultaBACKEND(agendamento.data_consulta)}</td>
                  <td>{agendamento.horario_consulta}</td>
                  <td>{agendamento.tipo_consulta}</td>
                  <td>{exibirDataConsultaTabela(agendamento.data_agendamento)}</td>
                  <td>
                    {agendamento.cancelamento_cliente ? "Cancelado" : "Ativo"}
                  </td>
                  <td>{agendamento.observacoes_consulta}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      {/* Paginação */}
      <div className={Style.pagination}>
        <button
          disabled={paginaAtual === 0}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          ◀ Anterior
        </button>

        <span>
          Página:{" "}
          <input
            type="number"
            min={1}
            max={totalPaginas}
            value={paginaAtual + 1}
            onChange={(e) =>
              setPaginaAtual(Number(e.target.value) - 1)
            }
            className={Style.inputPagina}
          />{" "}
          / {totalPaginas ?? 1}
        </span>

        <button
          disabled={
            paginaAtual + 1 >= (totalPaginas ?? 1)
          }
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima ▶
        </button>
      </div>
    </>
  );
}
