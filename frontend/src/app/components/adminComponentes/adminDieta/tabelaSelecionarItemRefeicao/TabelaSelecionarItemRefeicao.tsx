import Global from "@/app/globals.module.css";

import Modal from "@/app/components/modal/modal";

import { useMessage } from "@/app/context/mensagem/MensagemContext";

import TabelaAlimentosCadastradosRefeicao from "../TabelaAlimentosCadastradosRefeicao/TabelaAlimentosCadastradosRefeicao";
import { useItemRefeicaoUiStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoUiStore";
import { useItemRefeicaoStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useItemRefeicaoFormStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoFormStore";
import { useAlimentoStore } from "@/hooks/admin/dieta/alimentos/useAlimentoStore";

export default function TabelaSelecionarItemRefeicao() {
    const mensagem = useMessage();

    // UI GET
    const campoSelecionarAlimentoSubstituido = useItemRefeicaoUiStore((state) => state.campoSelecionarAlimentoSubstituido);

    // UI SET
    // item refeição
    const setCampoSelecionarAlimentoSubstituido = useItemRefeicaoUiStore((state) => state.setCampoSelecionarAlimentoSubstituido);

    // CRUD
    // item refeicao
    const alimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.alimentoCadastradoSelecionado);
    const setAlimentoCadastradoSelecionado = useItemRefeicaoStore((state) => state.setAlimentoCadastradoSelecionado);
    const cadastrarAlimentoOpcional = useItemRefeicaoStore((state) => state.cadastrarAlimentoOpcional);
    const preencherTabelaAlimentosRefeicao = useItemRefeicaoStore((state) => state.preencherTabelaAlimentosRefeicao);

    // refeicao
    const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);

    // alimento
    const alimentoSelecionado = useAlimentoStore((state) => state.alimentoSelecionado);
    const setAlimentoSelecionado = useAlimentoStore((state) => state.setAlimentoSelecionado);

    // FORM
    const formularioItemRefeicao = useItemRefeicaoFormStore((state) => state.formulario);
    const alterarFormularioItemRefeicao = useItemRefeicaoFormStore((state) => state.setCampo);


    function handleFecharCampo() {
        setCampoSelecionarAlimentoSubstituido(false);
        setAlimentoCadastradoSelecionado(null);
    }

    async function handleConfirmarAlimento() {
        if (!alimentoCadastradoSelecionado) return;
        if (!refeicaoSelecionada) return;

        if (alimentoCadastradoSelecionado.opcional) {
            mensagem.mostrarErro("Não é possível substituir um alimento que já é opcional!");
            return;
        }
        
        try {
            const resposta = await cadastrarAlimentoOpcional(formularioItemRefeicao);

            if (resposta) {
                mensagem.mostrarSucesso("Alimento cadastrado com sucesso!");
                setAlimentoSelecionado();
                setAlimentoCadastradoSelecionado(null);

                alterarFormularioItemRefeicao("alimento_id", 0);
                alterarFormularioItemRefeicao("quantidadeGramas", 0);
                alterarFormularioItemRefeicao("observacao", "");

                setCampoSelecionarAlimentoSubstituido(false);
                await preencherTabelaAlimentosRefeicao(refeicaoSelecionada);
            } else {
                mensagem.mostrarErro("Não foi possível cadastrar o alimento!");
            }
        } catch (erro) {
            console.error("Erro ao cadastrar alimento:", erro);
            mensagem.mostrarErro("Erro ao processar o cadastro do alimento!");
        }
    }

    return (
        <Modal
            isOpen={campoSelecionarAlimentoSubstituido}
            onClose={handleFecharCampo}
            title={`Selecionar o alimento`}
            onConfirm={handleConfirmarAlimento}
        >
            <div>
                <p className={Global.substituido}>O alimento {alimentoSelecionado?.nome_alimento}, vai ser opcional para o item selecionado abaixo.</p>

                <TabelaAlimentosCadastradosRefeicao campo="escolherItem" />
            </div>
        </Modal>
    );
}