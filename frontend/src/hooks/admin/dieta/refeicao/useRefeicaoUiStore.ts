"use client"

import { create } from "zustand";

interface RefeicaoUiState {
    // Modais Principais
    campoCadastrarRefeicao: boolean;
    campoGerenciarRefeicao: boolean;

    // Sub-campos (Navegação interna)
    tabelaSelecaoDietas: boolean;
    abrirFormularioRefeicao: boolean;
    tabelaRefeicoesDaDieta: boolean;
    editarRefeicao: boolean;

    // Actions
    setCampoCadastrarRefeicao: (status: boolean) => void;
    setCampoGerenciarRefeicao: (status: boolean) => void;

    // Função para navegar entre as etapas do cadastro
    irParaFormularioRefeicao: () => void;
    irParaSelecaoDietas: () => void;

    setTabelaRefeicoesDaDieta: (status: boolean) => void;
    setEditarRefeicao: (status: boolean) => void;

    resetUi: () => void;
}

const estadosIniciais = {
    campoCadastrarRefeicao: false,
    campoGerenciarRefeicao: false,

    tabelaSelecaoDietas: true,
    abrirFormularioRefeicao: false,
    tabelaRefeicoesDaDieta: false,
    editarRefeicao: false,
}

export const useRefeicaoUiStore = create<RefeicaoUiState>((set) => ({
    ...estadosIniciais,

    setCampoCadastrarRefeicao: (status) => set({ campoCadastrarRefeicao: status }),
    setCampoGerenciarRefeicao: (status) => set({ campoGerenciarRefeicao: status }),

    irParaFormularioRefeicao: () => set({
        tabelaSelecaoDietas: false,
        abrirFormularioRefeicao: true
    }),

    irParaSelecaoDietas: () => set({
        tabelaSelecaoDietas: true,
        abrirFormularioRefeicao: false
    }),

    setTabelaRefeicoesDaDieta: (status) => set({ tabelaRefeicoesDaDieta: status }),
    setEditarRefeicao: (status) => set({ editarRefeicao: status }),

    resetUi: () => set(estadosIniciais)
}));