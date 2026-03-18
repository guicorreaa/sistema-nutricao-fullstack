import { create } from "zustand";
import { FormularioCategoria } from "@/service/admin/dieta/interfaces";

interface CategoriaFormState {
  formulario: FormularioCategoria;
  
  // Actions
  setCampo: <T extends keyof FormularioCategoria>(
    campo: T,
    valor: FormularioCategoria[T]
  ) => void;
  preencherFormulario: (dados: FormularioCategoria) => void;
  limparFormulario: () => void;
}

const FORMULARIO_CATEGORIA_VAZIO: FormularioCategoria = {
  descricao: "",
  ativo: true,
};

export const useCategoriaFormStore = create<CategoriaFormState>((set) => ({
  formulario: FORMULARIO_CATEGORIA_VAZIO,

  setCampo: (campo, valor) =>
    set((state) => ({
      formulario: { ...state.formulario, [campo]: valor },
    })),

  preencherFormulario: (dados) => set({ formulario: dados }),

  limparFormulario: () => set({ formulario: FORMULARIO_CATEGORIA_VAZIO }),
}));