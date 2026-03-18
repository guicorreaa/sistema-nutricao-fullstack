import { TabelaAlimentos } from "@/service/admin/dieta/interfaces";
import Style from "./BotoesTabela.module.css";

interface BotoesTabelaProps {
    alimentoSelecionado: TabelaAlimentos | null;
    cadastrar: () => void;
    editar: () => void;
    // excluir: () => void;
}

export default function BotoesTabela({ alimentoSelecionado, cadastrar, editar }: BotoesTabelaProps) {

    // Lógica de verificação
    const temAlimentoSelecionado = !!alimentoSelecionado;

    return (
        <div className={Style.listaBotoes}>
            {/* BOTÃO CADASTRAR */}
            {!alimentoSelecionado && (
                <button
                    className={Style.btnCadastrar}
                    onClick={cadastrar}
                    title="Cadastrar novo Alimento"
                >
                    Cadastrar
                </button>
            )}

            {alimentoSelecionado && (
                <div className={Style.botoesAoSelecionar}>
                    {/* BOTÃO EDITAR */}
                    <button
                        className={`${Style.btnEditar} ${!temAlimentoSelecionado ? Style.desativado : ""}`}
                        onClick={editar}
                        disabled={!temAlimentoSelecionado}
                        title={temAlimentoSelecionado ? "Editar alimento" : "Selecione um alimento na tabela"}
                    >
                        Editar
                    </button>

                    {/* BOTÃO EXCLUIR */}
                    {/* <button
                        className={`${Style.btnExcluir} ${!temAlimentoSelecionado ? Style.desativado : ""}`}
                        onClick={excluir}
                        disabled={!temAlimentoSelecionado}
                        title={temAlimentoSelecionado ? "Excluir alimento" : "Selecione um alimento na tabela"}
                    >
                        Excluir
                    </button> */}
                </div>
            )}
        </div>
    );
}