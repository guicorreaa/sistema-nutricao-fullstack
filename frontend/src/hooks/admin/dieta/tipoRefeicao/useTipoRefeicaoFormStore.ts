"use client";

import { create } from "zustand";
import { FormularioTipoRefeicao } from "@/service/admin/dieta/interfaces";

const FORMULARIO_TIPO_REFEICAO_VAZIO: FormularioTipoRefeicao = {
    ativo: true,
    descricao: "",
};

interface TipoRefeicaoFormState {
    formulario: FormularioTipoRefeicao;

    // Actions
    setCampo: <T extends keyof FormularioTipoRefeicao>(
        campo: T,
        valor: FormularioTipoRefeicao[T]
    ) => void;

    setFormularioCompleto: (dados: FormularioTipoRefeicao) => void;
    limparFormulario: () => void;
}

export const useTipoRefeicaoFormStore = create<TipoRefeicaoFormState>((set) => ({
    formulario: FORMULARIO_TIPO_REFEICAO_VAZIO,

    // Atualiza um campo específico (ex: descricao ou ativo)
    setCampo: (campo, valor) =>
        set((state) => ({
            formulario: { ...state.formulario, [campo]: valor },
        })),

    // Útil se você for implementar uma edição de "Tipo de Refeição" no futuro
    setFormularioCompleto: (dados) => set({ formulario: dados }),

    // Reseta para o padrão (Ativo: true, Descrição: "")
    limparFormulario: () => set({ formulario: FORMULARIO_TIPO_REFEICAO_VAZIO }),
}));