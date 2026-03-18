"use client";

import React, { useState } from "react";
import Modal from "@/app/components/modal/modal";
import Global from "@/app/globals.module.css";
import Style from "./tabelaUsuarioSemCadastroEmCliente.module.css";
import { Usuarios } from "@/service/admin/cliente/interface";
import { useClienteUiStore } from "@/hooks/admin/cliente/useClienteUiStore";
import { useClienteStore } from "@/hooks/admin/cliente/useClienteStore";

export default function SelecionarUsuarioModal() {

  // UI
  const setCampoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.setCampoSelecionarUsuarioParaNovoCadastroCliente);
  const setCampoCadastrarInformacoesCliente = useClienteUiStore((state) => state.setCampoCadastrarInformacoesCliente);
  const campoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.campoSelecionarUsuarioParaNovoCadastroCliente);

  // CRUD
  const setUsuarioSelecionado = useClienteStore((state) => state.setUsuarioSelecionado);
  const usuarioSelecionado = useClienteStore((state) => state.usuarioSelecionado);
  const setPesquisaNomeUsuario = useClienteStore((state) => state.setPesquisaNomeUsuario);  
  const dadosUsuarios = useClienteStore((state) => state.dadosUsuarios);
  const paginaAtualUsuarios = useClienteStore((state) => state.paginaAtualUsuarios);
  const totalPaginasUsuarios = useClienteStore((state) => state.totalPaginasUsuarios);
  const setPaginaAtualUsuarios = useClienteStore((state) => state.setPaginaAtualUsuarios);

  function handleSelecionarUsuario(usuario: Usuarios) {
    setUsuarioSelecionado(
      usuarioSelecionado?.usuario_id === usuario.usuario_id ? null : usuario
    );
  }

  const [pesquisaNomeLocal, setPesquisaNomeLocal] = useState("");

  function handlePesquisar() {
    setPesquisaNomeUsuario(pesquisaNomeLocal);
    setPaginaAtualUsuarios(0);
  }

  function handleFechar() {
    setCampoSelecionarUsuarioParaNovoCadastroCliente(false);
    setUsuarioSelecionado(null);
  }

  function handleSelecionarCliente() {
    if (usuarioSelecionado) {
      setCampoSelecionarUsuarioParaNovoCadastroCliente(false);
      setCampoCadastrarInformacoesCliente(true); // exibir o campo para cadastrar as informações do cliente após selecionar o usuário para cadastro de cliente
    }
  }

  return (
    <Modal
      isOpen={campoSelecionarUsuarioParaNovoCadastroCliente}
      onClose={handleFechar} title="Selecionar usuário existente"
      onConfirm={handleSelecionarCliente}>
      <div className={Style.containerCadastrarCliente}>
        <p className={Global.subtitulo}>
          Selecione o usuário que deseja transformar em cliente. Apenas usuários sem cadastro de cliente aparecem aq
        </p>
        <div className={Style.tabelaClientesContainer}>
          <div className={Global.campoPesquisaTabelas}>
            <input
              type="text"
              placeholder="Pesquisar usuário..."
              value={pesquisaNomeLocal}
              onChange={(e) => setPesquisaNomeLocal(e.target.value)}
              onBlur={() => {
                if (pesquisaNomeLocal === "") {
                  setPesquisaNomeUsuario("");
                }
              }}
            />
            <span className={Global.iconeLupa}>🔍</span>
            <button onClick={handlePesquisar}>Buscar</button>
          </div>
          <table className={Global.tabelaClientes}>
            <thead>
              <tr>
                <th className={Global.thNome}>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dadosUsuarios?.map((usuario) => (
                <tr
                  key={usuario.usuario_id}
                  onClick={() => handleSelecionarUsuario(usuario)}
                  className={usuarioSelecionado?.usuario_id === usuario.usuario_id ? Global.selecionado : ""}
                >
                  <td>{usuario.nome || "Cadastrar dados básicos"}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className={Style.pagination}>
            <button
              disabled={paginaAtualUsuarios === 0}
              onClick={() => setPaginaAtualUsuarios(paginaAtualUsuarios - 1)}
            >
              ◀ Anterior
            </button>

            <span>
              Página:{" "}
              <input
                type="number"
                min={1}
                max={totalPaginasUsuarios}
                value={paginaAtualUsuarios + 1}
                onChange={(e) =>
                  setPaginaAtualUsuarios(Number(e.target.value) - 1)
                }
                className={Style.inputPagina}
              />{" "}
              / {totalPaginasUsuarios ?? 1}
            </span>

            <button
              disabled={
                paginaAtualUsuarios + 1 >= (totalPaginasUsuarios ?? 1)
              }
              onClick={() => setPaginaAtualUsuarios(paginaAtualUsuarios + 1)}
            >
              Próxima ▶
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
