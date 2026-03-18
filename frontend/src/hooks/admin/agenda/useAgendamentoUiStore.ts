"use client";

import { create } from "zustand";

interface AgendamentoUiState {
  // --- ESTADOS ---
  campoCadastrarAgendamento: boolean;
  campoEditarAgendamento: boolean;

  // --- AÇÕES ---
  setCampoCadastrarAgendamento: (valor: boolean) => void;
  setCampoEditarAgendamento: (valor: boolean) => void;
  resetarUi: () => void;
}

export const useAgendamentoUiStore = create<AgendamentoUiState>((set) => ({
  // Estado Inicial
  campoCadastrarAgendamento: false,
  campoEditarAgendamento: false,

  // Setters
  setCampoCadastrarAgendamento: (valor) => set({ campoCadastrarAgendamento: valor }),
  
  setCampoEditarAgendamento: (valor) => set({ campoEditarAgendamento: valor }),

  resetarUi: () => set({
    campoCadastrarAgendamento: false,
    campoEditarAgendamento: false,
  }),
}));