"use client"

import { create } from "zustand";

import {
    FormularioCadastrarCliente,
    DadosTabelaCliente,
    Usuarios
} from "@/service/admin/cliente/interface";

import {
    cadastrar,
    editar,
    excluir,
    carregarClientes,
    carregarUsuarios
} from "@/service/admin/cliente/requisicoes";

interface ClienteState {
    // Estados
    dadosTabelaClientes: DadosTabelaCliente[] | null;
    dadosUsuarios: Usuarios[] | null;
    clienteSelecionado: DadosTabelaCliente | null;
    usuarioSelecionado: Usuarios | null;
    paginaAtualCliente: number;
    totalPaginasCliente: number;
    paginaAtualUsuarios: number;
    totalPaginasUsuarios: number;
    pesquisaNomeCliente: string;
    pesquisaNomeUsuario: string;
    loading: boolean;

    // Ações de Estado (Setters)
    setClienteSelecionado: (cliente?: DadosTabelaCliente | null) => void;
    setUsuarioSelecionado: (usuario?: Usuarios | null) => void;
    setPaginaAtualCliente: (pagina: number) => void;
    setPaginaAtualUsuarios: (pagina: number) => void;
    setPesquisaNomeCliente: (termo: string) => void;
    setPesquisaNomeUsuario: (termo: string) => void;

    // Requisições
    fetchClientes: () => Promise<void>;
    fetchTabelaUsuarios: () => Promise<void>;
    cadastrarCliente: (usuarioSelecionadoId: string, formularioCliente: FormularioCadastrarCliente) => Promise<boolean>;
    excluirCliente: (clienteSelecionadoId: string) => Promise<boolean>;
    editarClienteCadastrado: (clienteSelecionadoId: string, formulario: FormularioCadastrarCliente) => Promise<boolean>;

    limparCampos: () => void;
}

const estadosIniciais = {
    dadosTabelaClientes: null,
    dadosUsuarios: null,
    clienteSelecionado: null,
    usuarioSelecionado: null,
    paginaAtualCliente: 0,
    totalPaginasCliente: 0,
    paginaAtualUsuarios: 0,
    totalPaginasUsuarios: 0,
    pesquisaNomeCliente: "",
    pesquisaNomeUsuario: "",
    loading: false
}

export const useClienteStore = create<ClienteState>((set, get) => ({
    // --- ESTADO INICIAL ---
    ...estadosIniciais,

    // --- SETTERS SIMPLES ---
    setClienteSelecionado: (cliente) => set((state) => ({
        clienteSelecionado: !cliente || state.clienteSelecionado?.clienteId === cliente?.clienteId ? null : cliente
    })),

    setUsuarioSelecionado: (usuario) => set((state) => ({
        usuarioSelecionado: !usuario || state.usuarioSelecionado?.usuario_id === usuario?.usuario_id ? null : usuario
    })),

    setPaginaAtualCliente: (pagina) => set({ paginaAtualCliente: pagina }),
    setPaginaAtualUsuarios: (pagina) => set({ paginaAtualUsuarios: pagina }),

    setPesquisaNomeCliente: (termo) => set({ pesquisaNomeCliente: termo }),
    setPesquisaNomeUsuario: (termo) => set({ pesquisaNomeUsuario: termo }),

    // REQUISIÇÕES
    fetchClientes: async () => {
        set({ loading: true })
        try {
            const { pesquisaNomeCliente, paginaAtualCliente } = get();
            const dados = await carregarClientes(pesquisaNomeCliente, paginaAtualCliente);
            if (dados) {
                set({ dadosTabelaClientes: dados.content, totalPaginasCliente: dados.totalPages });
            }
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchTabelaUsuarios: async () => {
        set({ loading: true })
        try {
            const { pesquisaNomeUsuario, paginaAtualUsuarios } = get();
            const dados = await carregarUsuarios(pesquisaNomeUsuario, paginaAtualUsuarios);
            if (dados) {
                set({ dadosUsuarios: dados.content, totalPaginasUsuarios: dados.totalPages });
            }
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        } finally {
            set({ loading: false });
        }
    },

    cadastrarCliente: async (usuarioSelecionadoId, formularioCliente) => {
        try {
            set({ loading: true });
            const resposta = await cadastrar(usuarioSelecionadoId, formularioCliente);
            if (resposta) {
                await get().fetchClientes();
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    excluirCliente: async (clienteSelecionadoId) => {
        try {
            set({ loading: true });
            const resposta = await excluir(clienteSelecionadoId);
            if (resposta.sucesso) {
                await get().fetchClientes();
                set({ clienteSelecionado: null });
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    editarClienteCadastrado: async (clienteSelecionadoId, formulario) => {
        try {
            set({ loading: true });
            const resposta = await editar(clienteSelecionadoId, formulario);
            if (resposta) {
                await get().fetchClientes();
                set({ clienteSelecionado: null });
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    limparCampos: () => set(estadosIniciais)

}));