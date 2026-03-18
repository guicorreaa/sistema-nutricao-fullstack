"use client";

import Style from "./TabelaAlimentosCadastradosRefeicao.module.css";
import { calcularTotaisMacros, calcularMacrosPorQuantidade } from "@/service/admin/dieta/funcoes";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { GraficoPizzaMacros } from "./GraficoPizza/GraficoTotalAlimentos";

import type { ItemRefeicaoTabela, TabelaAlimentos, TotaisMacros } from "@/service/admin/dieta/interfaces"; // ver se preciso criar uma nova interface para os itens do cliente
import React, { useEffect, useState } from "react";
import { useItemRefeicaoStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";

type Estilo = "visualizarExcluir" | "escolherItem";

type Props = {
    campo: Estilo;
};

function TabelaAlimentosCadastradosRefeicao( { campo }: Props ) {
    const mensagem = useMessage();
    const [mounted, setMounted] = useState(false);

    // CRUD
    // item refeição
    const alimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.alimentoCadastradoSelecionado);
    const setAlimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.setAlimentoCadastradoSelecionado);
    const todosItemRefeicao = useItemRefeicaoStore((state) => state.todosItemRefeicao);
    const excluirAlimentoSelecionado = useItemRefeicaoStore((state) => state.excluirAlimentoSelecionado);
    const preencherTabelaAlimentosRefeicao = useItemRefeicaoStore((state) => state.preencherTabelaAlimentosRefeicao);

    // refeição
    const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);

    // Para carregar o grifico apenas depois de montar a página
    useEffect(() => {
        setMounted(true);
    }, []);

    function handleSelecionarAlimento(alimento: ItemRefeicaoTabela) {
        // Se já tiver algum alimento selecionado
        if (alimentoCadastradoSelecionado?.alimento_id === alimento.alimento_id) {
            // Se clicar no mesmo -> desmarcar
            setAlimentoCadastradoSelecionado(null);
        } else {
            // Se clicar em outro -> zera e seleciona
            setAlimentoCadastradoSelecionado(alimento);
        }
    }

    const totaisMacros: TotaisMacros = todosItemRefeicao
        ? calcularTotaisMacros(todosItemRefeicao)
        : { kcal: 0, carboidrato: 0, proteina: 0, lipidios: 0 };


    async function handleDeletarAlimento() {
        const alimento = alimentoCadastradoSelecionado;

        if (!alimento) {
            mensagem.mostrarErro("Selecione um alimento para remover.");
            return;
        }

        try {
            await excluirAlimentoSelecionado(alimento);

            mensagem.mostrarSucesso("Alimento removido com sucesso.");

            if (refeicaoSelecionada) {
                await preencherTabelaAlimentosRefeicao(
                    refeicaoSelecionada
                );
                setAlimentoCadastradoSelecionado(null);
            }

        } catch (error) {
            console.error(error);
            mensagem.mostrarErro("Erro ao remover o alimento.");
        }
    }

    useEffect(() => {
        if (!refeicaoSelecionada) return;
        preencherTabelaAlimentosRefeicao(refeicaoSelecionada);
    }, [])

    return (
        <div className={Style.containerTabela}>
            <br className={Style.espacamento} />
            <p className={Style.subtitulo}>
                Alimentos cadastrados na refeição:
            </p>

            {campo === "visualizarExcluir" && (
                <div className={Style.containerGrafico}>
                    {mounted &&
                        todosItemRefeicao &&
                        todosItemRefeicao.length > 0 && (
                            <GraficoPizzaMacros
                                kcal={totaisMacros.kcal}
                                carboidrato={totaisMacros.carboidrato}
                                proteina={totaisMacros.proteina}
                                lipidios={totaisMacros.lipidios}
                            />
                        )}

                    {/* Tabela Total */}
                    <table className={Style.tabelaTotais}>
                        <thead>
                            <tr>
                                <th>Total Kcal</th>
                                <th>Total Carboidrato</th>
                                <th>Total Proteína</th>
                                <th>Total Lipídios</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totaisMacros.kcal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                                <td>{totaisMacros.carboidrato.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                                <td>{totaisMacros.proteina.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                                <td>{totaisMacros.lipidios.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Tabela */}
            <table className={Style.tabelaClientes}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className={Style.thNome}>Nome</th>
                        <th>Quantidade (g)</th>
                        <th>Caloria</th>
                        <th>Carboidrato</th>
                        <th>Proteína</th>
                        <th>Lipídios</th>
                        <th>Opcional</th>
                        <th>Opcional do alimento</th>
                    </tr>
                </thead>
                <tbody>
                    {todosItemRefeicao && todosItemRefeicao.length > 0 ? (
                        todosItemRefeicao.map((alimento: ItemRefeicaoTabela) => {
                            const macros = calcularMacrosPorQuantidade(alimento);

                            return (
                                <tr
                                    key={alimento.alimento_id}
                                    onClick={() => handleSelecionarAlimento(alimento)}
                                    className={                                        
                                        alimentoCadastradoSelecionado?.alimento_id === alimento.alimento_id
                                            ? Style.linhaSelecionada
                                            : alimento.opcional 
                                            ? Style.alimentoOpcional : ""
                                    }
                                >
                                    <td>{alimento.alimento_id}</td>
                                    <td>{alimento.nome_alimento}</td>
                                    <td>{alimento.quantidadeGramas}</td>
                                    <td>{macros.energia.toFixed(2)}</td>
                                    <td>{macros.carboidrato.toFixed(2)}</td>
                                    <td>{macros.proteina.toFixed(2)}</td>
                                    <td>{macros.lipidios.toFixed(2)}</td>
                                    <td>{alimento.opcional ? "Sim" : "Não"}</td>
                                    <td>{alimento.alimentoSubstituido ? `Subistituto de ${alimento.alimentoSubstituido}` : "Principal"}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={9} style={{ textAlign: "center", padding: "12px" }}>
                                Nenhum alimento cadastrado nesta refeição.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {alimentoCadastradoSelecionado &&
                campo === "visualizarExcluir" &&
                (
                    <button
                        className={Style.botaoRemover}
                        onClick={handleDeletarAlimento}
                        disabled={!alimentoCadastradoSelecionado}
                    >
                        🗑️ Remover
                    </button>

                )}
        </div>
    );
}

export default React.memo(TabelaAlimentosCadastradosRefeicao);