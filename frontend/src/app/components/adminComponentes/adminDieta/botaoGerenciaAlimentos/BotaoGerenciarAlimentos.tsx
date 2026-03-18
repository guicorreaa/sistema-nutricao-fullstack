import { useAlimentoUiStore } from "@/hooks/admin/dieta/alimentos/useAlimentoUiStore";
import Style from "./BotaoGerenciarAlimentos.module.css";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function BotaoGerenciarAlimentos() {

    // UI GET
    const campoEditarCadastrarAlimentos = useAlimentoUiStore((state) => state.campoEditarCadastrarAlimentos);
    
    // UI SET
    const setCampoEditarCadastrarAlimentos = useAlimentoUiStore((state) => state.setCampoEditarCadastrarAlimentos);
    
    // CRUD
    const setClienteSelecionado = useDietaStore((state) => state.setClienteSelecionado);

    return (
        <>
            <div className={Style.div}>
                <div
                    className={`${Style.card} ${Style.selecionarCliente}`}
                    onClick={() => {
                        campoEditarCadastrarAlimentos ? setCampoEditarCadastrarAlimentos(false) : setCampoEditarCadastrarAlimentos(true);
                        setClienteSelecionado();
                    }}
                >
                    <h2>Tabela Alimentos</h2>
                    <p>Cadastrar ou editar os alimentos</p>
                </div>
            </div>
        </>
    );
}