import { create } from "zustand";

interface CategoriaUiState {
  isModalCadastrarAberto: boolean;
  isModalEditarAberto: boolean;
  
  // Actions
  setModalCadastrar: (aberto: boolean) => void;
  setModalEditar: (aberto: boolean) => void;
  resetUi: () => void;
}

export const useCategoriaUiStore = create<CategoriaUiState>((set) => ({
  isModalCadastrarAberto: false,
  isModalEditarAberto: false,

  setModalCadastrar: (aberto) => set({ isModalCadastrarAberto: aberto }),
  setModalEditar: (aberto) => set({ isModalEditarAberto: aberto }),
  
  resetUi: () => set({ isModalCadastrarAberto: false, isModalEditarAberto: false }),
}));