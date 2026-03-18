import Style from "./EditarTabelaAlimentos.module.css";
import TabelaAlimentos from "../tabelaAlimentos/TabelaAlimentos";
import { useEffect, useState } from "react";
import BotoesTabela from "./botoesAbaixoTabela/BotoesTabela";
import CadastrarAlimento from "./cadastrarAlimento/CadastrarAlimento";
import { useAlimentoUiStore } from "@/hooks/admin/dieta/alimentos/useAlimentoUiStore";
import { useAlimentoStore } from "@/hooks/admin/dieta/alimentos/useAlimentoStore";

export default function EditarTabelaAlimentos() {

    // UI GET
    const campoEditarAlimentos = useAlimentoUiStore((state) => state.campoEditarAlimentos);

    // UI SET
    const setCampoEditarAlimentos = useAlimentoUiStore((state) => state.setCampoEditarAlimentos);
    
    // CRUD
    // alimento
    const alimentoSelecionado = useAlimentoStore((state) => state.alimentoSelecionado);
    const setAlimentoSelecionado = useAlimentoStore((state) => state.setAlimentoSelecionado);
    
    // Campo abrir formulario para cadastro do alimento
    const [cadastrarAlimento, setCadastrarAlimento] = useState(false);

    function handleCampoCadastrar() {
        setAlimentoSelecionado();
        setCampoEditarAlimentos(false);
        cadastrarAlimento ? setCadastrarAlimento(false) : setCadastrarAlimento(true);
    }

    function handleCampoEditar() {
        setCadastrarAlimento(false);
        campoEditarAlimentos ? setCampoEditarAlimentos(false) : setCampoEditarAlimentos(true);
    }

    useEffect(() => {
        setCampoEditarAlimentos(false);
    }, [alimentoSelecionado]);

    return (
        <div className={Style.container}>

            {!cadastrarAlimento && (
                <TabelaAlimentos modo="edicao" />
            )}

            <BotoesTabela
                alimentoSelecionado={alimentoSelecionado}
                cadastrar={handleCampoCadastrar}
                editar={handleCampoEditar}
                // excluir={handleExcluir}
            />

            {(cadastrarAlimento || campoEditarAlimentos) && (
                <CadastrarAlimento modo={cadastrarAlimento ? "cadastrar" : "editar"} setCadastrar={setCadastrarAlimento}/>
            )}

        </div>
    );
}