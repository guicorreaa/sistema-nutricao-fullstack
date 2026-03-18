import Style from "./BotaoEditarSubcategoria.module.css";

import { NotebookPen } from 'lucide-react';
import { Subcategoria } from "@/service/admin/dieta/interfaces";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useSubcategoriaStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaStore";
import { useSubcategoriaUiStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaUi";

interface BotaoEditarSubcategoriaProps {
    subcategoriaId: number;
}

export default function BotaoEditarSubcategoria({ subcategoriaId } : BotaoEditarSubcategoriaProps) {

    const mensagem = useMessage();

    // UI GET
    const isModalEditarAberto = useSubcategoriaUiStore((state) => state.isModalEditarAberto);

    // UI SET
    const setModalEditar = useSubcategoriaUiStore((state) => state.setModalEditar);


    // CRUD
    const todasSubcategorias = useSubcategoriaStore((state) => state.todasSubcategorias);

    function handleHabilitarCampoEdicao() {       
        if (!subcategoriaId) {
            mensagem.mostrarErro("Subcategoria não selecionada!")
            return;
        }

        const categoriaParaEditar = todasSubcategorias?.find(
            (sub: Subcategoria) => sub.subcategoria_id === subcategoriaId
        )

        isModalEditarAberto ? setModalEditar(false) : setModalEditar(true);
    }

    return (
        <div className={Style.botao}>
            <button
                type="button"
                title="Editar categoria"
                onClick={handleHabilitarCampoEdicao}
            >
                <NotebookPen size={25} />
            </button>
        </div>
    );
}