import { create } from "zustand";
import { FormularioCadastrarDieta } from "@/service/admin/dieta/interfaces";

const FORMULARIO_DIETA_VAZIO: FormularioCadastrarDieta = {
  dieta_nome: "",
  data_inicio: "",
  data_final: "",
};

interface DietaFormState {
  formulario: FormularioCadastrarDieta;

  // Actions
  setCampo: <T extends keyof FormularioCadastrarDieta>(
    campo: T,
    valor: FormularioCadastrarDieta[T]
  ) => void;
  
  setFormularioCompleto: (dados: FormularioCadastrarDieta) => void;
  limparFormulario: () => void;
}

export const useDietaFormStore = create<DietaFormState>((set) => ({
  formulario: FORMULARIO_DIETA_VAZIO,

  // Altera um campo por vez (ex: só o nome)
  setCampo: (campo, valor) =>
    set((state) => ({
      formulario: { ...state.formulario, [campo]: valor },
    })),

  // Altera tudo de uma vez (usado quando você clica em "Editar Dieta")
  setFormularioCompleto: (dados) => set({ formulario: dados }),

  // Reseta para o estado vazio
  limparFormulario: () => set({ formulario: FORMULARIO_DIETA_VAZIO }),
}));