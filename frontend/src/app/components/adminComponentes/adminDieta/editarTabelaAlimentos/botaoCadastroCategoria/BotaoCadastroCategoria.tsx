import { useCategoriaCrud } from "@/hooks/admin/dieta/categoria/useCategoriaCrud";
import Style from "./BotaoCadastroCategoria.module.css";

import { Plus } from 'lucide-react';
import { useCategoriaUiStore } from "@/hooks/admin/dieta/categoria/useCategoriaUiStore";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";

export default function BotaoCadastroCategoria() {

    // UI SET
    const isModalCadastrarAberto = useCategoriaUiStore((state) => state.isModalCadastrarAberto);
    const setModalCadastrar = useCategoriaUiStore((state) => state.setModalCadastrar);

    function handleHabilitarCampoCadastro() {
        isModalCadastrarAberto ? setModalCadastrar(false) : setModalCadastrar(true);
    }

    return (
        <div className={Style.botao}>
            <button
            type="button"
            title="Cadastrar categoria"
            onClick={handleHabilitarCampoCadastro}
            >
                <Plus size={25} />
            </button>
        </div>
    );
}