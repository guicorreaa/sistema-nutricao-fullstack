"use client";

import Style from "./TabelaAlimentos.module.css";
import Global from "@/app/globals.module.css";
import React, { useState, useEffect } from "react";
import type { TabelaAlimentos } from "@/service/admin/dieta/interfaces";
import { useAlimentoStore } from "@/hooks/admin/dieta/alimentos/useAlimentoStore";
import { useItemRefeicaoStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoStore";
import { useItemRefeicaoFormStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoFormStore";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";
import { useSubcategoriaStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaStore";

interface TabelaAlimentosProps {
  modo: "selecionar" | "edicao";
}

const TabelaAlimentos = React.memo(({ modo }: TabelaAlimentosProps) => {

  // CRUD
  // alimento
  const dadosTabelaAlimentos = useAlimentoStore((state) => state.dadosTabelaAlimentos);
  const alimentoSelecionado = useAlimentoStore((state) => state.alimentoSelecionado);
  const fetchTabelaAlimentos = useAlimentoStore((state) => state.fetchTabelaAlimentos);
  const setAlimentoSelecionado = useAlimentoStore((state) => state.setAlimentoSelecionado);
  const filtros = useAlimentoStore((state) => state.filtros);
  const setFiltros = useAlimentoStore((state) => state.setFiltros);

  // item refeição
  const setAlimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.setAlimentoCadastradoSelecionado);

  // categoria
  const todasCategorias = useCategoriaStore((state) => state.todasCategorias);
  const categoriaSelecionadaId = useCategoriaStore((state) => state.categoriaSelecionadaId);
  const setCategoriaSelecionadaId = useCategoriaStore((state) => state.setCategoriaSelecionadaId);

  // subcategoria
  const subcategoriaSelecionadaId = useSubcategoriaStore((state) => state.subcategoriaSelecionadaId);
  const todasSubcategorias = useSubcategoriaStore((state) => state.todasSubcategorias);
  const setSubcategoriaSelecionadaId = useSubcategoriaStore((state) => state.setSubcategoriaSelecionadaId);
  const fetchSubcategorias = useSubcategoriaStore((state) => state.fetchSubcategorias);

  // FORM
  const formulario = useItemRefeicaoFormStore((state) => state.formulario);
  const alterarFormularioItemRefeicao = useItemRefeicaoFormStore((state) => state.setCampo);

  // Usando para evitar digitar diretamente no formulário e só atualizar o formulário quando sair do campo (onBlur), 
  // assim evita que a cada letra digitada seja feita uma alteração no formulário e possível re-renderizações desnecessárias
  const [quantidadeLocal, setQuantidadeLocal] = useState<string>("");
  const [pesquisaLocal, setPesquisaLocal] = useState(filtros.nome_alimento || "");

  function handleSelecionarAlimento(alimento: TabelaAlimentos) {
    setQuantidadeLocal("");

    // Se já tiver algum alimento selecionado
    if (alimentoSelecionado?.alimento_id === alimento.alimento_id) {
      // Se clicar no mesmo -> desmarcar
      setAlimentoSelecionado(null);
      setAlimentoCadastradoSelecionado(null);
      alterarFormularioItemRefeicao("alimento_id", 0);
      alterarFormularioItemRefeicao("quantidadeGramas", 0);
    } else {
      // Se clicar em outro -> zera e seleciona
      setAlimentoSelecionado(alimento);
      alterarFormularioItemRefeicao("alimento_id", alimento.alimento_id);
      alterarFormularioItemRefeicao("quantidadeGramas", 0); // Zera a quantidade
      setAlimentoCadastradoSelecionado(null);
    }
  }

  useEffect(() => {
    if (!categoriaSelecionadaId) {
      setSubcategoriaSelecionadaId(undefined);
      return;
    }
    fetchSubcategorias(categoriaSelecionadaId, true);
  }, [categoriaSelecionadaId]);

  // Carregar alimentos ao abrir ou quando filtros mudarem e limpar o alimento selecionado
  useEffect(() => {
    fetchTabelaAlimentos(
      categoriaSelecionadaId,
      subcategoriaSelecionadaId,
    );
    setAlimentoSelecionado(null);
  }, [filtros.page, filtros.size, filtros.nome_alimento, categoriaSelecionadaId, subcategoriaSelecionadaId]);

  // Buscar clicando no botão e limpar o alimento selecionado
  const handleBuscar = () => {
    setFiltros({
      nome_alimento: pesquisaLocal,
      page: 0
    });
    setAlimentoSelecionado(null);
  };

  useEffect(() => {
    setSubcategoriaSelecionadaId(undefined);
  }, [categoriaSelecionadaId])

  return (
    <div className={Style.containerTabela}>
      <p className={Global.subtitulo}>
        Selecione o alimento que deseja adicionar na refeição:
      </p>

      {/* 🔍 Barra de Filtros */}
      <div className={Style.filtrosLinha}>

        {/* Campo texto */}
        <div className={Style.campoPesquisaTabelas}>
          <input
            type="text"
            placeholder="Pesquisar alimento..."
            value={pesquisaLocal}
            onChange={(e) => setPesquisaLocal(e.target.value)}
          />
          <span className={Style.iconeLupa}>🔍</span>
          <button onClick={handleBuscar}>
            {(dadosTabelaAlimentos?.content?.length ?? 0) === 0 ? "Recarregar" : "Buscar"}
          </button>
        </div>

        {/* Combobox Categoria */}
        <select
          className={Style.selectFiltro}
          value={categoriaSelecionadaId ?? ""}
          onChange={(e) =>
            setCategoriaSelecionadaId(e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Categoria</option>
          {todasCategorias?.map((c) => (
            <option key={c.categoria_id} value={c.categoria_id}>
              {c.descricao}
            </option>
          ))}
        </select>

        {/* Combobox Subcategoria */}
        <select
          className={Style.selectFiltro}
          value={subcategoriaSelecionadaId ?? ""}
          onChange={(e) =>
            setSubcategoriaSelecionadaId(e.target.value ? Number(e.target.value) : undefined)
          }
          disabled={!categoriaSelecionadaId}
        >
          <option value="">Selecionar</option>
          {todasSubcategorias
            ?.filter((s) => !categoriaSelecionadaId || s.categoria_id === categoriaSelecionadaId)
            .map((s) => (
              <option key={s.subcategoria_id} value={s.subcategoria_id}>
                {s.descricao}
              </option>
            ))}
        </select>

        {/* Itens por página */}
        <select
          className={Style.selectItensPagina}
          value={filtros.size}
          onChange={(e) => {
            setFiltros({ size: Number(e.target.value), page: 0 });
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

      {/* Tabela */}
      <table className={Style.tabelaClientes}>
        <thead>
          <tr>
            <th>ID</th>
            <th className={Style.thNome}>Nome</th>
            {modo === "selecionar" && (
              <th>Quantidade</th>
            )}
            <th>Kcal</th>
            <th>Carboidrato</th>
            <th>Proteína</th>
            <th>Lipídios</th>
          </tr>
        </thead>
        <tbody>
          {dadosTabelaAlimentos?.content?.map((alimento: TabelaAlimentos) => (
            <tr
              key={alimento.alimento_id}
              onClick={() => handleSelecionarAlimento(alimento)}
              className={
                alimentoSelecionado?.alimento_id === alimento.alimento_id
                  ? Style.linhaSelecionada
                  : ""
              }>
              <td>{alimento.alimento_id}</td>
              <td>{alimento.nome_alimento}</td>
              {modo === "selecionar" && (
                <td>
                  {alimentoSelecionado?.alimento_id === alimento.alimento_id && (
                    <input
                      type="number"
                      placeholder="g"
                      className={Style.inputQuantidade}
                      value={quantidadeLocal}
                      min={1}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setQuantidadeLocal(e.target.value)}
                      onBlur={() => {
                        if (quantidadeLocal !== "") {
                          alterarFormularioItemRefeicao(
                            "quantidadeGramas",
                            Number(quantidadeLocal)
                          );
                        }
                      }}
                    />
                  )}
                </td>
              )}
              <td>{alimento.energia_kcal}</td>
              <td>{alimento.carboidrato}</td>
              <td>{alimento.proteina}</td>
              <td>{alimento.lipidios}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className={Style.pagination}>
        <button
          disabled={filtros.page === 0}
          onClick={() => setFiltros({ page: filtros.page - 1 })}
        >
          ◀ Anterior
        </button>

        <span>
          Página:{" "}
          <input
            type="number"
            min={1}
            max={dadosTabelaAlimentos?.totalPages}
            value={filtros.page + 1}
            onChange={(e) => setFiltros({ page: Number(e.target.value) - 1 })}
            className={Style.inputPagina}
          />{" "}
          / {dadosTabelaAlimentos?.totalPages ?? 1}
        </span>

        <button
          disabled={
            filtros.page + 1 >= (dadosTabelaAlimentos?.totalPages ?? 1)
          }
          onClick={() => setFiltros({ page: filtros.page + 1 })}
        >
          Próxima ▶
        </button>
      </div>
    </div>
  );
});

export default TabelaAlimentos;