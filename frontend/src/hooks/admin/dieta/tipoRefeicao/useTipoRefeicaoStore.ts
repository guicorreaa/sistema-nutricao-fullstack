"use client";

import { create } from "zustand";
import { TipoRefeicao, FormularioTipoRefeicao } from "@/service/admin/dieta/interfaces";
import { pegarTiposDeRefeicao, cadastrarNovoTipoRefeicao } from "@/service/admin/dieta/requisicoes";

interface TipoRefeicaoState {
    dadosTipoRefeicao: TipoRefeicao[] | null;
    loading: boolean;

    // API Actions
    fetchTiposDeRefeicao: () => Promise<void>;
    cadastrarTipo: (form: FormularioTipoRefeicao) => Promise<boolean>;
}

const estadosIniciais = {
    dadosTipoRefeicao: null,
    loading: false,
}

export const useTipoRefeicaoStore = create<TipoRefeicaoState>((set) => ({
    ...estadosIniciais,

    fetchTiposDeRefeicao: async () => {
        set({ loading: true });
        try {
            const resposta = await pegarTiposDeRefeicao();
            set({ dadosTipoRefeicao: resposta || null });
        } finally {
            set({ loading: false });
        }
    },

    cadastrarTipo: async (form) => {
        set({ loading: true });
        try {
            const resposta = await cadastrarNovoTipoRefeicao(form);
            if (resposta) {
                // Atualiza a lista local sem precisar de outro GET
                await useTipoRefeicaoStore.getState().fetchTiposDeRefeicao();
                return true;
            }
            return false;
        } finally {
            set({ loading: false });
        }
    },
}));