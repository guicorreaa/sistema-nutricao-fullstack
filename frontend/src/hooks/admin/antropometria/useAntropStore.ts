"use client";

import { create } from "zustand";
import {
    DadosAntropometricos,
    DadosAntropTabelaPrincipal,
    DadosAntropometricosFixos,
    DadosAntropometricosVariaveis,
    TabelaClientes,
    FatorAtividadeFisica,
} from "@/service/admin/dadosAntropometricos/interfaces";

import {
    carregarClientesComDados,
    carregarClientesSemDadosCadastrados,
    carregarFatorAtividade,
    pegarDadosClienteEspecifico,
    cadastrarDados,
    atualizarDados,
    cadastrarDadoAntropometricoVariavel,
    excluirDados,
} from "@/service/admin/dadosAntropometricos/requisicoes";

interface AntropometriaState {
    // --- ESTADOS TABELA PRINCIPAL (COM DADOS) ---
    dadosTabelaPrincipal: DadosAntropTabelaPrincipal[] | null;
    antropometriaSelecionada: DadosAntropTabelaPrincipal | null;
    campoPesquisaPrincipal: string;
    paginaPrincipal: number;
    totalPaginasPrincipal: number;

    // --- ESTADOS TABELA CLIENTES (SEM DADOS) ---
    dadosTabelaSemDados: TabelaClientes[] | null;
    clienteSelecionadoSemDados: TabelaClientes | null;
    campoPesquisaSemDados: string;
    paginaSemDados: number;
    totalPaginasSemDados: number;

    // --- COMPLEMENTOS ---
    fatorAtividade: FatorAtividadeFisica[];
    loading: boolean;

    // --- SETTERS ---
    setAntropometriaSelecionada: (cliente?: DadosAntropTabelaPrincipal | null) => void;
    setClienteSelecionadoSemDados: (cliente?: TabelaClientes | null) => void;
    setCampoPesquisaPrincipal: (valor: string) => void;
    setCampoPesquisaSemDados: (valor: string) => void;
    setPaginaPrincipal: (pagina: number) => void;
    setPaginaSemDados: (pagina: number) => void;

    // --- AÇÕES DE BUSCA ---
    fetchTabelaPrincipal: () => Promise<void>;
    fetchTabelaSemDados: () => Promise<void>;
    fetchFatorAtividade: () => Promise<void>;
    fetchDadosEspecifico: (id: string) => Promise<DadosAntropometricos | undefined>;

    // --- AÇÕES CRUD ---
    cadastrarDados: (id: string, form: DadosAntropometricos) => Promise<boolean>;
    editarDados: (id: string, form: DadosAntropometricosFixos) => Promise<boolean>;
    cadastrarVariavel: (id: string, form: DadosAntropometricosVariaveis) => Promise<boolean>;
    excluirDados: (id: string) => Promise<boolean>;
}

const estadosIniciais = {
    // Iniciais
    dadosTabelaPrincipal: null,
    antropometriaSelecionada: null,
    campoPesquisaPrincipal: "",
    paginaPrincipal: 0,
    totalPaginasPrincipal: 0,

    dadosTabelaSemDados: null,
    clienteSelecionadoSemDados: null,
    campoPesquisaSemDados: "",
    paginaSemDados: 0,
    totalPaginasSemDados: 0,

    fatorAtividade: [],
    loading: false,
}

export const useAntropStore = create<AntropometriaState>((set, get) => ({
    ...estadosIniciais,

    // Setters Simples com lógica de Toggle
    setAntropometriaSelecionada: (dado) => set((state) => ({
        antropometriaSelecionada: !dado || state.antropometriaSelecionada?.dadosID === dado?.dadosID ? null : dado
    })),

    setClienteSelecionadoSemDados: (cliente) => set((state) => ({
        clienteSelecionadoSemDados: !cliente || state.clienteSelecionadoSemDados?.clienteId === cliente?.clienteId ? null : cliente
    })),

    setCampoPesquisaPrincipal: (valor) => set({ campoPesquisaPrincipal: valor }),
    setCampoPesquisaSemDados: (valor) => set({ campoPesquisaSemDados: valor }),
    setPaginaPrincipal: (pagina) => set({ paginaPrincipal: pagina }),
    setPaginaSemDados: (pagina) => set({ paginaSemDados: pagina }),

    // --- BUSCAS ---
    fetchTabelaPrincipal: async () => {
        try {
            const { campoPesquisaPrincipal, paginaPrincipal } = get();
            const res = await carregarClientesComDados(campoPesquisaPrincipal, paginaPrincipal);
            if (res) set({ dadosTabelaPrincipal: res.content, totalPaginasPrincipal: res.totalPages });
        } catch (e) { console.error(e); }
    },

    fetchTabelaSemDados: async () => {
        try {
            const { campoPesquisaSemDados, paginaSemDados } = get();
            const res = await carregarClientesSemDadosCadastrados(campoPesquisaSemDados, paginaSemDados);
            if (res) set({ dadosTabelaSemDados: res.content, totalPaginasSemDados: res.totalPages });
        } catch (e) { console.error(e); }
    },

    fetchFatorAtividade: async () => {
        const res = await carregarFatorAtividade();
        if (res) set({ fatorAtividade: res });
    },

    fetchDadosEspecifico: async (id) => {
        try {
            return await pegarDadosClienteEspecifico(id);
        } catch (e) { console.error(e); }
    },

    // --- CRUD (Com Auto-refresh inteligente) ---
    cadastrarDados: async (id, form) => {
        set({ loading: true });
        try {
            const ok = await cadastrarDados(id, form);
            if (ok) {
                await get().fetchTabelaPrincipal();
                // await get().fetchTabelaSemDados(); // Remove da lista de "sem dados"
                return true;
            }
            return false;
        } finally {
            set({ loading: false });
        }
    },

    editarDados: async (id, form) => {
        set({ loading: true });
        try {
            const ok = await atualizarDados(id, form);
            if (ok) {
                await get().fetchTabelaPrincipal();
                return true;
            }
            return false;
        } finally { set({ loading: false }); }
    },

    cadastrarVariavel: async (id, form) => {
        set({ loading: true });
        try {
            const ok = await cadastrarDadoAntropometricoVariavel(id, form);
            if (ok) {
                await get().fetchTabelaPrincipal();
                return true;
            }
            return false;
        } finally { set({ loading: false }); }
    },

    excluirDados: async (id) => {
        set({ loading: true });
        try {
            const ok = await excluirDados(id);
            if (ok) {
                await get().fetchTabelaPrincipal();
                await get().fetchTabelaSemDados(); // Volta para a lista de "sem dados"
                return true;
            }
            return false;
        } finally { set({ loading: false }); }
    },
}));