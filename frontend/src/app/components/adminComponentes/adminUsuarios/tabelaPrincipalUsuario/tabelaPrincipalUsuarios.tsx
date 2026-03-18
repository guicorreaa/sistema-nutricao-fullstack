"use client";

import Global from "@/app/globals.module.css";
import Style from "./tabelaPrincipalUsuarios.module.css";
import { Usuarios } from "@/service/admin/usuario/interfaces";
import { useEffect, useState } from "react";
import useUsuarioUi from "@/hooks/admin/usuario/useUsuarioUi";
import { useUsuarioCrud } from "@/hooks/admin/usuario/useUsuarioCrud";
import useUsuarioData from "@/hooks/admin/usuario/useUsuarioData";
import { formatarData } from "@/service/admin/usuario/funcoes";
import { useUsuarioFormStore } from "@/hooks/admin/usuario/useUsuarioFormStore";
import { useUsuarioStore } from "@/hooks/admin/usuario/useUsuarioStore";
import { useUsuarioUiStore } from "@/hooks/admin/usuario/useUsuarioUiStore";

export default function TabelaUsuariosCompleta() {

  const [campoPesquisarLocal, setCampoPesquisarLocal] = useState("");

  const dadosUsuarios = useUsuarioStore((state) => state.dadosClientes);
  const setPesquisarUsuario = useUsuarioStore((state) => state.setPesquisarUsuario);
  const usuarioSelecionado = useUsuarioStore((state) => state.usuarioSelecionado);
  const handleSelecionarUsuario = useUsuarioStore((state) => state.handleSelecionarUsuario);
  
  const paginaAtual = useUsuarioStore((state) => state.paginaAtual);
  const setPaginaAtual = useUsuarioStore((state) => state.setPaginaAtual);
  const totalPaginas = useUsuarioStore((state) => state.totalPaginas);

  const setModoCadastro = useUsuarioUiStore((state) => state.setModoCadastro);
  const setModoEdicao = useUsuarioUiStore((state) => state.setModoEdicao);

  function handlePesquisar() {
    setPesquisarUsuario(campoPesquisarLocal);
  }

  useEffect(() => {
    if (usuarioSelecionado) {
      setModoCadastro(false);
      setModoEdicao(false);
    }
  }, [usuarioSelecionado])

  return (
    <div>
      <p className={Global.subtitulo}>
        Confira todos os usuários que já possuem cadastro em nosso sistema.
      </p>

      <div className={Global.campoPesquisaTabelas}>
        <input
          type="text"
          placeholder="Pesquisar usuário..."
          value={campoPesquisarLocal}
          onChange={(e) => setCampoPesquisarLocal(e.target.value)}
          onBlur={() => {
            if (campoPesquisarLocal === "") {
              setPesquisarUsuario("");
            }
          }}
        />
        <span className={Global.iconeLupa}>🔍</span>
        <button onClick={handlePesquisar}>
          Buscar
        </button>
      </div>

      <div className={Global.tabelaClientesContainer}>
        <table className={Global.tabelaClientes}>
          <thead>
            <tr>
              <th className={Global.thNome}>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {dadosUsuarios?.map((usuario) => (
              <tr
                key={usuario.usuario_id}
                onClick={() => handleSelecionarUsuario(usuario)}
                className={usuarioSelecionado?.usuario_id === usuario.usuario_id ? Global.selecionado : ""}
              >
                <td>{usuario.nome ? usuario.nome : "Cadastrar dados básicos"}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
                <td>{formatarData(usuario.data_criacao)}</td>
              </tr>
            ))}
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
