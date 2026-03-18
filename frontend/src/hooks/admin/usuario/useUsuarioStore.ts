"use client";

import { create } from 'zustand';

import {
    cadastrar,
    excluir,
    salvarAlteracoes,
    carragarUsuarios
} from "@/service/admin/usuario/requisicoes";

import { FormularioUsuario } from "@/service/admin/usuario/interfaces";
import { Usuarios } from "@/service/admin/cliente/interface";

interface UsuarioState {
    // Estados
    dadosClientes: Usuarios[] | null;
    paginaAtual: number;
    totalPaginas: number;
    usuarioSelecionado: Usuarios | null;
    pesquisarUsuario: string;
    loading: boolean;

    // Ações de Estado (Setters)
    setPaginaAtual: (pagina: number) => void;
    setPesquisarUsuario: (termo: string) => void;
    handleSelecionarUsuario: (usuario?: Usuarios) => void;

    // Requisições
    limparCampos: () => void;
    fetchUsuarios: () => Promise<void>;
    cadastrarUsuario: (form: FormularioUsuario) => Promise<boolean>;
    salvarAlteracoesEditadas: (id: string, dados: FormularioUsuario) => Promise<boolean>;
    excluirUsuario: (id: string) => Promise<boolean | number>;
}

const initialState = {
    dadosClientes: null,
    paginaAtual: 0,
    totalPaginas: 0,
    usuarioSelecionado: null,
    pesquisarUsuario: "",
    loading: false,
};

export const useUsuarioStore = create<UsuarioState>((set, get) => ({
    // --- ESTADO INICIAL ---
    ...initialState,

    // --- SETTERS SIMPLES ---
    setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),

    setPesquisarUsuario: (termo) => {
        set({ pesquisarUsuario: termo, paginaAtual: 0 });
        get().fetchUsuarios();
    },

    handleSelecionarUsuario: (usuario) => set((state) => ({
        usuarioSelecionado: !usuario || state.usuarioSelecionado?.usuario_id === usuario?.usuario_id ? null : usuario
    })),

    limparCampos: () => set(initialState),

    // --- AÇÕES ASSÍNCRONAS ---

    fetchUsuarios: async () => {
        set({ loading: true });
        try {
            const { pesquisarUsuario, paginaAtual } = get();
            const dados = await carragarUsuarios(pesquisarUsuario, paginaAtual);
            if (dados) {
                set({ dadosClientes: dados.content, totalPaginas: dados.totalPages });
            }
        } catch (error) {
            console.error("Erro ao buscar usuarios", error);
        } finally {
            set({ loading: false });
        }
    },

    cadastrarUsuario: async (formUsuario) => {
        try {
            set({ loading: true });
            const resposta = await cadastrar(formUsuario);
            if (resposta) {
                await get().fetchUsuarios();
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro ao cadastrar usuário:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    salvarAlteracoesEditadas: async (id, dadosUsuario) => {
        try {
            set({ loading: true });
            const resposta = await salvarAlteracoes(id, dadosUsuario);
            if (resposta) {
                await get().fetchUsuarios(); // Atualiza a lista
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro na conexão:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    excluirUsuario: async (id) => {
        try {
            set({ loading: true });
            const resultado = await excluir(id);
            if (resultado.sucesso) {
                await get().fetchUsuarios(); // Atualiza a lista
                return true;
            }
            return resultado.status === 409 ? 409 : false;
        } catch (error) {
            console.error("Erro ao excluir usuário", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },
}));