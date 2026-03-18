import Global from "@/app/globals.module.css";
import Style from "./TabelaCliente.module.css";

import Modal from "@/app/components/modal/modal";

import { useEffect, useState } from "react";
import { useDietaUiStore } from "@/hooks/admin/dieta/clienteDieta/useDietaUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function TabelaCliente() {

  // UI GET
  const campoEscolherCliente = useDietaUiStore((state) => state.campoEscolherCliente);

  // UI SET
  const setCampoEscolherCliente = useDietaUiStore((state) => state.setCampoEscolherCliente);

  // CRUD
  const fetchTabelaClientes = useDietaStore((state) => state.fetchTabelaClientes);
  const dadosClientes = useDietaStore((state) => state.dadosClientes);
  const clienteSelecionado = useDietaStore((state) => state.clienteSelecionado);
  const setClienteSelecionado = useDietaStore((state) => state.setClienteSelecionado);

  // CRUD PESQUISA
  const pesquisaNomeCliente = useDietaStore((state) => state.pesquisaNomeCliente);
  const setPesquisaNomeCliente = useDietaStore((state) => state.setPesquisaNomeCliente);

  // CRUD PAGINA
  const paginaAtualClientes = useDietaStore((state) => state.paginaAtualClientes);
  const totalPaginasClientes = useDietaStore((state) => state.totalPaginasClientes);
  const setPaginaAtualClientes = useDietaStore((state) => state.setPaginaAtualClientes);

  // LOCAL
  const [pesquisaLocal, setPesquisaLocal] = useState("");

  function handlePesquisar() {
    setPesquisaNomeCliente(pesquisaLocal);
    setPaginaAtualClientes(0); // Volta para a primeira página ao pesquisar
  }

  useEffect(() => {
    fetchTabelaClientes();
  }, [fetchTabelaClientes, pesquisaNomeCliente, paginaAtualClientes]);

  return (
    <Modal
      isOpen={campoEscolherCliente}
      onClose={() => {
        setCampoEscolherCliente(false);
        setClienteSelecionado(null);
      }}
      title="Selecione o cliente"
      onConfirm={() => {
        if (clienteSelecionado) {
          setCampoEscolherCliente(false);
        }
      }}
    >
      <div>
        <p className={Global.subtitulo}>
          Nesta tabela são exibidos apenas os clientes que possuem..
        </p>
        <div className={Global.campoPesquisaTabelas}>
          <input
            type="text"
            placeholder="Pesquisar cliente..."
            value={pesquisaLocal}
            onChange={(e) => setPesquisaLocal(e.target.value)}
            onBlur={() => {
              if (pesquisaLocal === "") {
                setPesquisaNomeCliente("");
              }
            }}
          />
          <span className={Global.iconeLupa}>🔍</span>
          <button
            onClick={handlePesquisar}
          >
            Buscar
          </button>
        </div>

        <table className={Global.tabelaClientes}>
          <thead>
            <tr>
              <th className={Global.thNome}>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {dadosClientes?.map((cliente) => (
              <tr
                key={cliente.clienteId}
                onClick={() => {setClienteSelecionado(cliente);}}
                className={
                  clienteSelecionado?.clienteId === cliente.clienteId
                    ? Global.selecionado
                    : ""
                }
              >
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className={Style.pagination}>
          <button
            disabled={paginaAtualClientes === 0}
            onClick={() => setPaginaAtualClientes(paginaAtualClientes - 1)}
          >
            ◀ Anterior
          </button>

          <span>
            Página:{" "}
            <input
              type="number"
              min={1}
              max={totalPaginasClientes}
              value={paginaAtualClientes + 1}
              onChange={(e) =>
                setPaginaAtualClientes(Number(e.target.value) - 1)
              }
              className={Style.inputPagina}
            />{" "}
            / {totalPaginasClientes ?? 1}
          </span>

          <button
            disabled={
              paginaAtualClientes + 1 >= (totalPaginasClientes ?? 1)
            }
            onClick={() => setPaginaAtualClientes(paginaAtualClientes + 1)}
          >
            Próxima ▶
          </button>
        </div>
      </div>
    </Modal>
  );
}
