"use client";

import { create } from "zustand";
import {
    FormularioAgendamento,
    InformacoesTabelaAgendamento,
} from "@/service/admin/agenda/interfaces";

import {
    cadastrarAgendamentoService,
    editarAgendamentoService,
    excluirAgendamentoService,
    obterAgendamentoEspecifico,
    preencherTabelaAgendamentos,
} from "@/service/admin/agenda/requisicoes";

interface AgendamentoState {
    // --- ESTADOS ---
    dadosTabelaAgendamento: InformacoesTabelaAgendamento[] | null;
    agendamentoSelecionado: InformacoesTabelaAgendamento | null;
    paginaAtual: number;
    totalPaginas: number;
    pesquisaNome: string;
    loading: boolean;

    // Estados de dados tratados
    celularTratado: string;
    telefoneTratado: string;

    // --- SETTERS ---
    setAgendamentoSelecionado: (agendamento?: InformacoesTabelaAgendamento | null) => void;
    setPaginaAtual: (pagina: number) => void;
    setPesquisaNome: (nome: string) => void;
    setCelularTratado: (valor: string) => void;
    setTelefoneTratado: (valor: string) => void;

    // --- REQUISIÇÕES
    fetchAgendamentos: () => Promise<void>;
    buscarAgendamentoEspecifico: (id: string) => Promise<any>;
    cadastrarAgendamento: (formulario: FormularioAgendamento) => Promise<boolean>;
    editarAgendamento: (id: string, formulario: FormularioAgendamento) => Promise<boolean>;
    excluirAgendamento: (id: string) => Promise<boolean>;

    limparCampos: () => void;
}

const estadosIniciais = {
    dadosTabelaAgendamento: null,
    agendamentoSelecionado: null,
    paginaAtual: 0,
    totalPaginas: 0,
    pesquisaNome: "",
    loading: false,
    celularTratado: "",
    telefoneTratado: "",
};

export const useAgendamentoStore = create<AgendamentoState>((set, get) => ({
    ...estadosIniciais,

    // --- SETTERS SIMPLES ---
    setAgendamentoSelecionado: (agendamento) => set((state) => ({
        agendamentoSelecionado: !agendamento || state.agendamentoSelecionado?.consulta_id === agendamento?.consulta_id ? null : agendamento
    })),

    setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),

    setPesquisaNome: (nome) => set({ pesquisaNome: nome }),

    setCelularTratado: (valor) => set({ celularTratado: valor }),

    setTelefoneTratado: (valor) => set({ telefoneTratado: valor }),

    // --- REQUISIÇÕES ---
    fetchAgendamentos: async () => {
        set({ loading: true });
        try {
            const { pesquisaNome, paginaAtual } = get();
            const dados = await preencherTabelaAgendamentos(pesquisaNome, paginaAtual);

            if (dados) {
                set({
                    dadosTabelaAgendamento: dados.content,
                    totalPaginas: dados.totalPages
                });
            }
        } catch (error) {
            console.error("Erro ao carregar agenda:", error);
        } finally {
            set({ loading: false });
        }
    },

    buscarAgendamentoEspecifico: async (id) => {
        if (!id) return null;
        try {
            return await obterAgendamentoEspecifico(id);
        } catch (error) {
            console.error("Erro ao buscar agendamento específico:", error);
            return null;
        }
    },

    cadastrarAgendamento: async (formulario) => {
        set({ loading: true });
        try {
            const resposta = await cadastrarAgendamentoService(formulario);
            if (resposta) {
                await get().fetchAgendamentos(); // Auto-refresh
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    editarAgendamento: async (id, formulario) => {
        if (!id) return false;
        set({ loading: true });
        try {
            const resposta = await editarAgendamentoService(id, formulario);
            if (resposta) {
                await get().fetchAgendamentos();
                set({ agendamentoSelecionado: null });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao editar:", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    excluirAgendamento: async (id) => {
        if (!id) return false;
        set({ loading: true });
        try {
            const resposta = await excluirAgendamentoService(id);
            if (resposta) {
                await get().fetchAgendamentos();
                set({ agendamentoSelecionado: null });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao excluir:", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    limparCampos: () => set(estadosIniciais),
}));