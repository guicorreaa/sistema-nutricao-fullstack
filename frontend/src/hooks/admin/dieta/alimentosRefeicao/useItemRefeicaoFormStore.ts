import { create } from "zustand";
import { FormularioItemRefeicao } from "@/service/admin/dieta/interfaces";

const FORMULARIO_ITEM_REFEICAO_VAZIO: FormularioItemRefeicao = {
    refeicao_id: "",
    alimento_id: 0,
    observacao: "",
    quantidadeGramas: 0
};

interface ItemRefeicaoFormState {
    formulario: FormularioItemRefeicao;
    
    setCampo: <T extends keyof FormularioItemRefeicao>(
        campo: T,
        valor: FormularioItemRefeicao[T]
    ) => void;
    
    limparFormulario: () => void;
    
    setFormularioCompleto: (dados: FormularioItemRefeicao) => void;
}

export const useItemRefeicaoFormStore = create<ItemRefeicaoFormState>((set) => ({
    formulario: FORMULARIO_ITEM_REFEICAO_VAZIO,

    setCampo: (campo, valor) =>
        set((state) => ({
            formulario: { ...state.formulario, [campo]: valor },
        })),

    limparFormulario: () => set({ formulario: FORMULARIO_ITEM_REFEICAO_VAZIO }),

    setFormularioCompleto: (dados) => set({ formulario: dados }),
}));