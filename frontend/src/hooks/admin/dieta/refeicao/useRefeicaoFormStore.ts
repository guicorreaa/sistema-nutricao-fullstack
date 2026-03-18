"use client";

import { create } from "zustand";
import { FormularioRefeicao } from "@/service/admin/dieta/interfaces";

const FORMULARIO_REFEICAO_VAZIO: FormularioRefeicao = {
    horario: "",
    dieta_id: "",
    tipo_refeicao: 0,
    observacoes: ""
};

interface RefeicaoFormState {
    formulario: FormularioRefeicao;

    // Actions
    setCampo: <T extends keyof FormularioRefeicao>(
        campo: T,
        valor: FormularioRefeicao[T]
    ) => void;

    setFormularioCompleto: (dados: FormularioRefeicao) => void;
    limparFormulario: () => void;
}

export const useRefeicaoFormStore = create<RefeicaoFormState>((set) => ({
    formulario: FORMULARIO_REFEICAO_VAZIO,

    // Altera um campo específico do formulário
    setCampo: (campo, valor) =>
        set((state) => ({
            formulario: { ...state.formulario, [campo]: valor },
        })),

    // Preenche o formulário todo (útil para edição)
    setFormularioCompleto: (dados) => set({ formulario: dados }),

    // Reseta para o estado inicial
    limparFormulario: () => set({ formulario: FORMULARIO_REFEICAO_VAZIO }),
}));