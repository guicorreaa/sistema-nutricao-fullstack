import Style from "./BotaoEditarCategoria.module.css";

import { NotebookPen } from 'lucide-react';
import { Categoria, FormularioCategoria } from "@/service/admin/dieta/interfaces";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";
import { useCategoriaFormStore } from "@/hooks/admin/dieta/categoria/useCategoriaForm";
import { useCategoriaUiStore } from "@/hooks/admin/dieta/categoria/useCategoriaUiStore";

interface BotaoEditarCategoriaProps {
    categoriaId: number;
}

export default function BotaoEditarCategoria({ categoriaId }: BotaoEditarCategoriaProps) {
    const mensagem = useMessage();

    // UI GET
    const isModalEditarAberto = useCategoriaUiStore((state) => state.isModalEditarAberto);

    // UI SET
    const setModalEditar = useCategoriaUiStore((state) => state.setModalEditar);

    // CRUD
    // categoria
    const todasCategorias = useCategoriaStore((state) => state.todasCategorias);

    // FORM
    const preencherFormulario = useCategoriaFormStore((state) => state.preencherFormulario);

    function handleHabilitarCampoCadastro() {
        if (!categoriaId) {
            mensagem.mostrarErro("Categoria não selecionada!")
            return;
        }

        const categoriaParaEditar = todasCategorias?.find(
            (cat: Categoria) => cat.categoria_id === categoriaId
        )

        if (categoriaParaEditar) {
            preencherFormulario(categoriaParaEditar);
        }

        isModalEditarAberto ? setModalEditar(false) : setModalEditar(true);
    }

    return (
        <div className={Style.botao}>
            <button
                type="button"
                title="Editar categoria"
                onClick={handleHabilitarCampoCadastro}
            >
                <NotebookPen size={25} />
            </button>
        </div>
    );
}