"use client";

import { create } from "zustand";

interface TipoRefeicaoUiState {
  campoCadastrarTipoRefeicao: boolean;
  setCampoCadastrarTipoRefeicao: (status: boolean) => void;
}

export const useTipoRefeicaoUiStore = create<TipoRefeicaoUiState>((set) => ({
  campoCadastrarTipoRefeicao: false,
  setCampoCadastrarTipoRefeicao: (status) => set({ campoCadastrarTipoRefeicao: status }),
}));