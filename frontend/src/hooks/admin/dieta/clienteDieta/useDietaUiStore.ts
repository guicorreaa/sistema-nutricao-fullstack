import { create } from "zustand";

interface DietaUiState {
    // Modais e Telas
    campoEscolherCliente: boolean;
    botaoCampoCadastrarDieta: boolean;
    campoGerenciarDieta: boolean;
    campoAlterarDieta: boolean;
    campoRefeicao: boolean;

    // Subcampos e Visibilidade
    clientePossuiDietas: boolean;
    verTabelaDieta: boolean;

    // Actions
    setCampoEscolherCliente: (status: boolean) => void;
    setBotaoCampoCadastrarDieta: (status: boolean) => void;
    setCampoGerenciarDieta: (status: boolean) => void;
    setCampoAlterarDieta: (status: boolean) => void;
    setCampoRefeicao: (status: boolean) => void;
    setClientePossuiDietas: (status: boolean) => void;
    setVerTabelaDieta: (status: boolean) => void;

    // Reset de UI (Fecha tudo)
    resetarUi: () => void;
}

const estadosIniciais = {
    campoEscolherCliente: false,
    botaoCampoCadastrarDieta: false,
    campoGerenciarDieta: false,
    campoAlterarDieta: false,
    campoRefeicao: false,
    clientePossuiDietas: false,
    verTabelaDieta: true,
}

export const useDietaUiStore = create<DietaUiState>((set) => ({
    ...estadosIniciais,

    setCampoEscolherCliente: (status) => set({ campoEscolherCliente: status }),
    setBotaoCampoCadastrarDieta: (status) => set({ botaoCampoCadastrarDieta: status }),
    setCampoGerenciarDieta: (status) => set({ campoGerenciarDieta: status }),
    setCampoAlterarDieta: (status) => set({ campoAlterarDieta: status }),
    setCampoRefeicao: (status) => set({ campoRefeicao: status }),
    setClientePossuiDietas: (status) => set({ clientePossuiDietas: status }),
    setVerTabelaDieta: (status) => set({ verTabelaDieta: status }),

    resetarUi: () => set(estadosIniciais)
}));