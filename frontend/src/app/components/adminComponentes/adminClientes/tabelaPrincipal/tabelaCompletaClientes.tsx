"use client";

import React, { useState } from "react";
import Global from "@/app/globals.module.css";
import Style from "./tabelaCompletaClientes.module.css";

import { DadosTabelaCliente } from "@/service/admin/cliente/interface";
import useClienteData from "@/hooks/admin/cliente/useClienteData";
import { formatarData, mudarCharSexo } from "@/service/admin/cliente/funcoes";
import { useClienteUiStore } from "@/hooks/admin/cliente/useClienteUiStore";
import { useClienteStore } from "@/hooks/admin/cliente/useClienteStore";

export default function TabelaClientes() {

  // CRUD
  const clienteSelecionado = useClienteStore((state) => state.clienteSelecionado);
  const dadosTabelaClientes = useClienteStore((state) => state.dadosTabelaClientes);
  const setClienteSelecionado = useClienteStore((state) => state.setClienteSelecionado);
  const setPesquisaNomeCliente = useClienteStore((state) => state.setPesquisaNomeCliente);
  const setPaginaAtual = useClienteStore((state) => state.setPaginaAtualCliente);
  const paginaAtual = useClienteStore((state) => state.paginaAtualCliente);
  const totalPaginas = useClienteStore((state) => state.totalPaginasCliente);

  const [campoBusca, setCampoBusca] = useState("");

  function handleBuscar() {
    setPesquisaNomeCliente(campoBusca); // Falta fazer a parte da requisição ainda
    setPaginaAtual(0); // Volta para a primeira página ao buscar
  }

  function handleSelecionarCliente(cliente: DadosTabelaCliente) {
    setClienteSelecionado(
      clienteSelecionado?.clienteId === cliente.clienteId ? null : cliente
    );
  }

  return (
    <div className={Style.tabelaClientesContainer}>

      <div className={Global.campoPesquisaTabelas}>
        <input
          type="text"
          placeholder="Pesquisar Cliente..."
          value={campoBusca}
          onChange={(e) => setCampoBusca(e.target.value)}
          onBlur={() => {
            if (campoBusca === "") {
              setPesquisaNomeCliente(""); // Limpa a pesquisa ao perder o foco
            }
          }}
        />
        <span className={Global.iconeLupa}>🔍</span>
        <button onClick={() => handleBuscar()}>
          Buscar
        </button>
      </div>

      <div className={Style.wrapperTabela}>
        <table className={Style.tabelaClientes}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Sexo</th>
              <th>Nível de atividade física</th>
              <th>Objetivo nutricional</th>
              <th>Última alteração</th>
            </tr>
          </thead>

          <tbody>
            {dadosTabelaClientes?.length ? (
              dadosTabelaClientes.map((cliente) => (
                <tr
                  key={cliente.clienteId}
                  onClick={() => handleSelecionarCliente(cliente)}
                  className={
                    clienteSelecionado?.clienteId === cliente.clienteId
                      ? Style.selecionado
                      : ""
                  }
                >
                  <td>{cliente.nome}</td>
                  <td>{cliente.dataNascimento}</td>
                  <td>{mudarCharSexo(cliente.sexo)}</td>
                  <td>{cliente.nivelAtividadeFisica}</td>
                  <td>{cliente.objetivoNutricional}</td>
                  <td>{formatarData(cliente.ultimaAlteracao)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
      </div>
    </div>

  );
}
