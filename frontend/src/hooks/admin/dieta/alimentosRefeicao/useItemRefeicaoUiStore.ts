import { create } from "zustand";

interface ItemRefeicaoUiState {
  // Controle de exibição de telas/campos
  campoItemRefeicaoSendoUsado: boolean;
  campoSelecionarAlimentoSubstituido: boolean;
  carregando: boolean;

  // Actions
  setCampoItemRefeicaoSendoUsado: (status: boolean) => void;
  setCampoSelecionarAlimentoSubstituido: (status: boolean) => void;
  setCarregando: (status: boolean) => void;
  resetUi: () => void;
}

const estadosIniciais = {
  campoItemRefeicaoSendoUsado: false,
  campoSelecionarAlimentoSubstituido: false,
  carregando: false,
}

export const useItemRefeicaoUiStore = create<ItemRefeicaoUiState>((set) => ({
  ...estadosIniciais,

  setCampoItemRefeicaoSendoUsado: (status) => set({ campoItemRefeicaoSendoUsado: status }),
  setCampoSelecionarAlimentoSubstituido: (status) => set({ campoSelecionarAlimentoSubstituido: status }),
  setCarregando: (status) => set({ carregando: status }),

  resetUi: () => set({
    campoItemRefeicaoSendoUsado: false,
    campoSelecionarAlimentoSubstituido: false,
    carregando: false
  }),
}));