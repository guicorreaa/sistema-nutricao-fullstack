import Style from "./AlimentosDaRefeicao.module.css";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import TabelaAlimentos from "@/app/components/adminComponentes/adminDieta/tabelaAlimentos/TabelaAlimentos";
import TabelaAlimentosCadastradosRefeicao from "../TabelaAlimentosCadastradosRefeicao/TabelaAlimentosCadastradosRefeicao";
import TabelaSelecionarItemRefeicao from "../tabelaSelecionarItemRefeicao/TabelaSelecionarItemRefeicao";
import { useState } from "react";
import { useAlimentoStore } from "@/hooks/admin/dieta/alimentos/useAlimentoStore";
import { useItemRefeicaoStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoStore";
import { useItemRefeicaoFormStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoFormStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useItemRefeicaoUiStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoUiStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function AlimentosDaRefeicao() {
    const mensagem = useMessage();

    // UI SET
    // item refeição
    const setCampoSelecionarAlimentoSubstituido = useItemRefeicaoUiStore((state) => state.setCampoSelecionarAlimentoSubstituido);
    const setCampoItemRefeicaoSendoUsado = useItemRefeicaoUiStore((state) => state.setCampoItemRefeicaoSendoUsado);

    // refeição
    const setEditarRefeicao = useRefeicaoUiStore((state) => state.setEditarRefeicao);
    const setCampoGerenciarRefeicao = useRefeicaoUiStore((state) => state.setCampoGerenciarRefeicao);
    const setTabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.setTabelaRefeicoesDaDieta);

    // CRUD
    // alimento
    const alimentoSelecionado = useAlimentoStore((state) => state.alimentoSelecionado);
    const setAlimentoSelecionado = useAlimentoStore((state) => state.setAlimentoSelecionado);

    // item refeição
    const setAlimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.setAlimentoCadastradoSelecionado);
    const cadastrarNovoItemNaRefeicao = useItemRefeicaoStore((state) => state.cadastrarNovoItemNaRefeicao);
    const preencherTabelaAlimentosRefeicao = useItemRefeicaoStore((state) => state.preencherTabelaAlimentosRefeicao);

    // refeição
    const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);
    const setTodasRefeicoes = useRefeicaoStore((state) => state.setTodasRefeicoes);
    const setRefeicaoSelecionada = useRefeicaoStore((state) => state.setRefeicaoSelecionada);
    const fetchRefeicoesPorDieta = useRefeicaoStore((state) => state.fetchRefeicoesPorDieta);

    // dieta
    const dietaSelecionada = useDietaStore((state) => state.dietaSelecionada);

    // FORM
    const formularioItemRefeicao = useItemRefeicaoFormStore((state) => state.formulario);
    const alterarFormularioItemRefeicao = useItemRefeicaoFormStore((state) => state.setCampo);

    const [observacaoLocal, setObservacaoLocal] = useState(
        formularioItemRefeicao.observacao || ""
    );

    // Cadastrar alimento selecionado dentro da refeição selecionada
    async function handleAdicionarAlimentoSelecionado(opcional: boolean) {
        if (!refeicaoSelecionada) return;

        setObservacaoLocal(""); // Limpa o campo de observação local

        if (!opcional) {
            const resposta = await cadastrarNovoItemNaRefeicao(formularioItemRefeicao);

            if (resposta) {
                // 🔹 Limpa seleção
                setAlimentoSelecionado(null);

                // 🔹 Limpa valores do formulário
                alterarFormularioItemRefeicao("quantidadeGramas", 0);
                alterarFormularioItemRefeicao("observacao", "");

                // 🔹 Atualiza tabela
                await preencherTabelaAlimentosRefeicao(refeicaoSelecionada);

                mensagem.mostrarSucesso("O alimento foi adicionado com sucesso!");
            } else {
                mensagem.mostrarErro("Houve um erro ao adicionar o alimento. Tente novamente.");
            }

        } else {
            // Caso seja "opcional"
            setAlimentoCadastradoSelecionado(null);
            setCampoSelecionarAlimentoSubstituido(true);
        }
    }


    async function handleVoltar() {
        // fecha tela de itens da refeição
        setCampoItemRefeicaoSendoUsado(false);
        setTodasRefeicoes();

        // limpa formulário
        alterarFormularioItemRefeicao("observacao", "");

        // RESET DO FLUXO DA REFEIÇÃO
        setRefeicaoSelecionada(null);
        setEditarRefeicao(false);
        await fetchRefeicoesPorDieta(dietaSelecionada!)
        setCampoGerenciarRefeicao(true);
        setTabelaRefeicoesDaDieta(true);
    }

    return (
        <>
            <div>
                <button
                    className={Style.botaoVoltar}
                    onClick={handleVoltar}
                >
                    ⬅️ Voltar
                </button>

                {/* Componente para visualizar a tabela alimentos */}
                <TabelaAlimentos modo="selecionar" />

                {/* Botão para quando o alimento estiver selecionado */}
                {alimentoSelecionado && (
                    <div className={Style.areaAdicionar}>

                        <p className={Style.alimentoSelecionado}>
                            🍽️ Alimento selecionado:
                            <strong> {alimentoSelecionado.nome_alimento}</strong>
                        </p>

                        {/* Campo de observação */}
                        <div className={Style.campoObservacao}>
                            <label>Observação (opcional)</label>

                            <textarea
                                placeholder="Ex: sem sal, grelhado, porção reduzida..."
                                maxLength={500}   // ✅ limite real
                                value={observacaoLocal}
                                onChange={(e) => setObservacaoLocal(e.target.value)}
                                onBlur={() =>
                                    alterarFormularioItemRefeicao(
                                        "observacao",
                                        observacaoLocal
                                    )
                                }
                            />

                            <div className={Style.linhaInferiorObservacao}>
                                <span className={Style.dicaObservacao}>
                                    Máx. 500 caracteres
                                </span>

                                <small
                                    className={
                                        formularioItemRefeicao.observacao?.length > 480
                                            ? Style.contadorCaracteresMax
                                            : Style.contadorCaracteres
                                    }
                                >
                                    {observacaoLocal.length}/500
                                </small>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className={Style.botaoCadastrar}>
                            <button
                                className={Style.botaoAdicionarAlimento}
                                onClick={() => handleAdicionarAlimentoSelecionado(false)}
                            >
                                Adicionar
                            </button>

                            <button
                                className={`${Style.botaoAdicionarAlimento} ${Style.botaoAdicionarAlimentoOpcional}`}
                                onClick={() => handleAdicionarAlimentoSelecionado(true)}
                            >
                                Adicionar Opcional
                            </button>
                        </div>

                    </div>
                )}

                {/* Uma tabela com os alimentos adicionados */}
                <TabelaAlimentosCadastradosRefeicao campo="visualizarExcluir" />

                {/* Campo para que quando o admin clicar em opcional vai abrir um modal onde posso escolher o alimento a ser substituido */}
                <TabelaSelecionarItemRefeicao />
            </div>
        </>
    );
}