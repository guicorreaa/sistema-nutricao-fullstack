"use client";

import React, { useState } from "react";
import Modal from "@/app/components/modal/modal";
import Global from "@/app/globals.module.css";
import Style from "./tabelaClienteSimples.module.css";
import { TabelaClientes } from "@/service/admin/dadosAntropometricos/interfaces";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";

export default function SelecionarClienteModal() {

  // UI SET
  const setCampoCadastrarDados = useAntropUiStore((state) => state.setCampoCadastrarDados);
  const selecionarClienteCad = useAntropUiStore((state) => state.selecionarClienteCad);
  const setSelecionarClienteCad = useAntropUiStore((state) => state.setSelecionarClienteCad);

  // CRUD
  const setClienteSelecionadoTabelaCliente = useAntropStore((state) => state.setClienteSelecionadoSemDados);
  const setCampoPesquisaSemDados = useAntropStore((state) => state.setCampoPesquisaSemDados);
  const dadosTabelaCliente = useAntropStore((state) => state.dadosTabelaSemDados);

  const totalPaginas = useAntropStore((state) => state.totalPaginasSemDados);
  const setPaginaAtual = useAntropStore((state) => state.setPaginaSemDados);
  const paginaAtual = useAntropStore((state) => state.paginaSemDados);

  // Form
  const limparFormulario = useAntropFormStore((state) => state.limparFormulario);

  const [clienteSelecionado, setClienteSelecionado] =
    useState<TabelaClientes | null>(null);

  const [pesquisa, setPesquisa] = useState("");

  const handleConfirm = () => {
    if (clienteSelecionado) {
      setClienteSelecionadoTabelaCliente(clienteSelecionado); // atualiza o state do pai
      limparFormulario();
      setSelecionarClienteCad(false);
      setCampoCadastrarDados(true);
      setClienteSelecionado(null);
      setPesquisa("");
    };
  }

  const handleSelectCliente = (cliente: TabelaClientes) => {
    if (!clienteSelecionado || clienteSelecionado.clienteId !== cliente.clienteId) {
      setClienteSelecionado(cliente);
    } else {
      setClienteSelecionado(null);
    }
  };

  const dadosFiltrados =
    dadosTabelaCliente?.filter((c) =>
      c.nome.toLowerCase().includes(pesquisa.toLowerCase())
    ) || [];

  const [campoPesquisaLocal, setCampoPesquisaLocal] = useState("");

  function handlePesquisa() {
    setCampoPesquisaSemDados(campoPesquisaLocal);
    setPaginaAtual(0); // resetar para a primeira página ao pesquisar
  }

  return (
    <Modal
      isOpen={selecionarClienteCad}
      onClose={() => {
        setSelecionarClienteCad(false);
        setClienteSelecionadoTabelaCliente();
      }}
      title="Selecionar cliente"
      onConfirm={handleConfirm}
    >
      <div className={Style.containerCadastrarEditarCliente}>
        <p className={Global.subtitulo}>
          Escolha o cliente para cadastrar os dados antropométricos. Apenas clientes sem cadastro aparecem na lista.
        </p>

        <div className={Global.campoPesquisaTabelas}>
          <input
            type="text"
            placeholder="Pesquisar cliente..."
            value={campoPesquisaLocal}
            onChange={(e) => setCampoPesquisaLocal(e.target.value)}
            onBlur={() => {
              if (campoPesquisaLocal === "") {
                setCampoPesquisaSemDados("");
              }
            }}
          />
          <span className={Global.iconeLupa}>🔍</span>
          <button onClick={handlePesquisa}>
            Buscar
          </button>
        </div>

        <table className={Global.tabelaClientes}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.length ? (
              dadosFiltrados.map((cliente) => (
                <tr
                  key={cliente.clienteId}
                  onClick={() => handleSelectCliente(cliente)}
                  className={
                    clienteSelecionado?.clienteId === cliente.clienteId
                      ? Global.selecionado
                      : ""
                  }
                >
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: "center", padding: "1rem" }}>
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
    </Modal>
  );
}
