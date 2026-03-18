import { create } from "zustand";
import { FormularioSubcategoria } from "@/service/admin/dieta/interfaces";

interface SubcategoriaFormState {
  formulario: FormularioSubcategoria;
  
  // Actions
  setCampo: <T extends keyof FormularioSubcategoria>(
    campo: T,
    valor: FormularioSubcategoria[T]
  ) => void;
  preencherFormulario: (dados: FormularioSubcategoria) => void;
  limparFormulario: () => void;
}

const FORMULARIO_VAZIO_SUBCATEGORIA: FormularioSubcategoria = {
  descricao: "",
  categoria_id: 0,
  ativo: true,
};

export const useSubcategoriaFormStore = create<SubcategoriaFormState>((set) => ({
  formulario: FORMULARIO_VAZIO_SUBCATEGORIA,

  setCampo: (campo, valor) =>
    set((state) => ({
      formulario: { ...state.formulario, [campo]: valor },
    })),

  preencherFormulario: (dados) => set({ formulario: dados }),

  limparFormulario: () => set({ formulario: FORMULARIO_VAZIO_SUBCATEGORIA }),
}));