"use client";

import { create } from 'zustand';

interface UsuarioUiState {
    modoEdicao: boolean;
    modoCadastro: boolean;
    setModoEdicao: (valor: boolean) => void;
    setModoCadastro: (valor: boolean) => void;
    habilitarModoEdicao: () => void;
    habilitarModoCadastrar: () => void;
    fecharTudo: () => void;
}

export const useUsuarioUiStore = create<UsuarioUiState>((set) => ({
    modoEdicao: false,
    modoCadastro: false,

    setModoEdicao: (valor) => set({ modoEdicao: valor }),
    setModoCadastro: (valor) => set({ modoCadastro: valor }),

    habilitarModoEdicao: () => set((state) => ({
        modoEdicao: !state.modoEdicao,
        modoCadastro: false
    })),

    habilitarModoCadastrar: () => set((state) => ({
        modoCadastro: !state.modoCadastro,
        modoEdicao: false
    })),

    fecharTudo: () => set({ modoEdicao: false, modoCadastro: false })
}));