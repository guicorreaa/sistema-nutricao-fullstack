import Style from "./FormPrimeiroCadastro.module.css";

import FormDadosFixosAntropometria from "../formFixo/FormDadosFixosAntropometria";
import FormDadosVariaveisAntropometria from "../formVariavel/FormDadosVariaveisAntropometria";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";

export default function FormPrimeiroCadastro() {

    // UI
    const setCampoCadastrarDados = useAntropUiStore((state) => state.setCampoCadastrarDados);
    const resetarUi = useAntropUiStore((state) => state.resetarUi);

    // CRUD
    const fetchTabelaPrincipal = useAntropStore((state) => state.fetchTabelaPrincipal);
    const cadastrarDados = useAntropStore((state) => state.cadastrarDados);
    const clienteSelecionadoTabelaCliente = useAntropStore((state) => state.clienteSelecionadoSemDados);

    // FORM
    const formulario = useAntropFormStore((state) => state.formulario);
    const limparFormulario = useAntropFormStore((state) => state.limparFormulario);

    const mensagem = useMessage();

    async function cadastrarAntropometria() {
        if (!clienteSelecionadoTabelaCliente) {
            mensagem.mostrarErro("Cliente não selecionado!")
            return;
        }

        if (formulario.fator_atividade_fisica.valor === 0) {
            mensagem.mostrarErro("Selecione a atividade fisíca!");
            return;
        }

        const resposta = await cadastrarDados(clienteSelecionadoTabelaCliente.clienteId, formulario);
        if (!resposta) {
            mensagem.mostrarErro("Não foi possível cadastrar os dados antropométricos");
            return;
        }        

        mensagem.mostrarSucesso("Dados antropométricos cadastrados com sucesso!")
        limparFormulario();
        resetarUi();
        await fetchTabelaPrincipal();
    }

    return (
        <div className={Style.containerFormCadastro}>
            <FormDadosFixosAntropometria botaoAtivo={false}/>
            <FormDadosVariaveisAntropometria botaoAtivo={false} />

            <div className={Style.botoesCadastro}>
                <button type="button" onClick={cadastrarAntropometria}>
                    Cadastrar Antropometria
                </button>
            </div>

        </div>
    )
}