"use client";

import { create } from "zustand";

interface ClienteUiState {
    // Estados (Boleanos)
    campoOpcoesParaCadastrarCliente: boolean;
    campoSelecionarUsuarioParaNovoCadastroCliente: boolean;
    campoCadastrarInformacoesCliente: boolean;
    editarCliente: boolean;
    enviandoDados: boolean;

    // Ações (Setters)
    setCampoOpcoesParaCadastrarCliente: (valor: boolean) => void;
    setCampoSelecionarUsuarioParaNovoCadastroCliente: (valor: boolean) => void;
    setCampoCadastrarInformacoesCliente: (valor: boolean) => void;
    setEditarCliente: (valor: boolean) => void;
    setEnviandoDados: (valor: boolean) => void;
    
    // Função para resetar toda a UI
    resetarUi: () => void;
}

const estadosIniciaisUi = {
    campoOpcoesParaCadastrarCliente: false,
    campoSelecionarUsuarioParaNovoCadastroCliente: false,
    campoCadastrarInformacoesCliente: false,
    editarCliente: false,
    enviandoDados: false,
};

export const useClienteUiStore = create<ClienteUiState>((set) => ({
    // --- ESTADO INICIAL ---
    ...estadosIniciaisUi,

    // --- SETTERS ---
    setCampoOpcoesParaCadastrarCliente: (valor) => set({ campoOpcoesParaCadastrarCliente: valor }),

    setCampoSelecionarUsuarioParaNovoCadastroCliente: (valor) => set({ campoSelecionarUsuarioParaNovoCadastroCliente: valor }),

    setCampoCadastrarInformacoesCliente: (valor) => set({ campoCadastrarInformacoesCliente: valor }),

    setEditarCliente: (valor) => set({ editarCliente: valor }),

    setEnviandoDados: (valor) => set({ enviandoDados: valor }),

    // Reseta todos os campos de visualização para false
    resetarUi: () => set(estadosIniciaisUi)
}));