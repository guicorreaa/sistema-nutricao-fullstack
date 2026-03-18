import { create } from "zustand";

interface AlimentoUiState {
    campoEditarCadastrarAlimentos: boolean;
    campoEditarAlimentos: boolean;
    
    setCampoEditarCadastrarAlimentos: (status: boolean) => void;
    setCampoEditarAlimentos: (status: boolean) => void;
    resetUi: () => void;
}

export const useAlimentoUiStore = create<AlimentoUiState>((set) => ({
    campoEditarCadastrarAlimentos: false,
    campoEditarAlimentos: false,

    setCampoEditarCadastrarAlimentos: (status) => set({ campoEditarCadastrarAlimentos: status }),
    setCampoEditarAlimentos: (status) => set({ campoEditarAlimentos: status }),
    
    resetUi: () => set({ 
        campoEditarCadastrarAlimentos: false, 
        campoEditarAlimentos: false 
    })
}));