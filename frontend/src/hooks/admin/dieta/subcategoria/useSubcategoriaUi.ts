import { create } from "zustand";

interface SubcategoriaUiState {
  isModalCadastrarAberto: boolean;
  isModalEditarAberto: boolean;

  setModalCadastrar: (aberto: boolean) => void;
  setModalEditar: (aberto: boolean) => void;
  resetUi: () => void;
}

export const useSubcategoriaUiStore = create<SubcategoriaUiState>((set) => ({
  isModalCadastrarAberto: false,
  isModalEditarAberto: false,

  setModalCadastrar: (aberto) => set({ isModalCadastrarAberto: aberto }),
  setModalEditar: (aberto) => set({ isModalEditarAberto: aberto }),

  resetUi: () => set({ 
    isModalCadastrarAberto: false, 
    isModalEditarAberto: false 
  }),
}));