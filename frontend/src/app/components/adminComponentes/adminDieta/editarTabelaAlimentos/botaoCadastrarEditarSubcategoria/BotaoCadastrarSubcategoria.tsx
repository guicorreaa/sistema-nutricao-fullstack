import { Plus } from "lucide-react";
import Style from "./BotaoCadastrarSubcategoria.module.css";
import { useSubcategoriaUiStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaUi";

export default function BotaoCadastrarSubcategoria() {

    // UI SET
    const isModalCadastrarAberto = useSubcategoriaUiStore((state) => state.isModalCadastrarAberto);
    const setModalCadastrar = useSubcategoriaUiStore((state) => state.setModalCadastrar);

    function handleHabilitarCampoSubcategoria() {
        isModalCadastrarAberto ? setModalCadastrar(false) : setModalCadastrar(true);
    }

    return (
        <div className={Style.botao}>
            <button
                type="button"
                onClick={handleHabilitarCampoSubcategoria}
            >
                <Plus size={25} />
            </button>
        </div>
    );
}