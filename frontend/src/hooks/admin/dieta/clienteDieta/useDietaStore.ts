import { create } from "zustand";
import {
    DadosTabelaCliente,
    DadosDietas,
    FormularioCadastrarDieta
} from "@/service/admin/dieta/interfaces";
import {
    preencherTabelaClientesPrincipal,
    pegarDietasPeloClienteNomeId,
    cadastrarNovaDieta,
    pegarDietasPeloClienteTabelaCompleta,
    atualizarDieta,
    excluirDietaSelecionada
} from "@/service/admin/dieta/requisicoes";

interface DietaState {
    // Dados do Banco
    dadosClientes: DadosTabelaCliente[] | null;
    todasDietas: DadosDietas[] | null;
    clienteSelecionado: DadosTabelaCliente | null;
    dietaSelecionada: DadosDietas | null;
    loading: boolean;

    // Filtros e Paginação
    pesquisaNomeCliente: string;
    paginaAtualClientes: number;
    totalPaginasClientes: number;

    // Actions de Estado
    setClienteSelecionado: (cliente?: DadosTabelaCliente | null) => void;
    setDietaSelecionada: (dieta?: DadosDietas | null) => void;
    setPesquisaNomeCliente: (nome: string) => void;
    setPaginaAtualClientes: (pagina: number) => void;

    // Operações de API
    fetchTabelaClientes: () => Promise<void>;
    fetchDietasDoCliente: (completo?: boolean) => Promise<boolean>;
    cadastrarDieta: (form: FormularioCadastrarDieta) => Promise<boolean>;
    excluirDieta: (dieta: DadosDietas) => Promise<boolean>;
    salvarAlteracoesDieta: (form: FormularioCadastrarDieta) => Promise<boolean>;
}

const estadosIniciais = {
    dadosClientes: null,
    todasDietas: null,
    clienteSelecionado: null,
    dietaSelecionada: null,
    pesquisaNomeCliente: "",
    paginaAtualClientes: 0,
    totalPaginasClientes: 0,
    loading: false,
}

export const useDietaStore = create<DietaState>((set, get) => ({
    ...estadosIniciais,

    setClienteSelecionado: (cliente) => set((state) => ({
        clienteSelecionado: !cliente || state.clienteSelecionado?.clienteId === cliente.clienteId ? null : cliente
    })),

    setDietaSelecionada: (dieta) => set((state) => ({
        dietaSelecionada: !dieta || state.dietaSelecionada?.dieta_id === dieta.dieta_id ? null : dieta
    })),
    
    setPesquisaNomeCliente: (nome) => set({ pesquisaNomeCliente: nome }),
    setPaginaAtualClientes: (pagina) => set({ paginaAtualClientes: pagina }),

    fetchTabelaClientes: async () => {
        const { pesquisaNomeCliente, paginaAtualClientes } = get();
        set({ loading: true });
        try {
            const clientes = await preencherTabelaClientesPrincipal(pesquisaNomeCliente, paginaAtualClientes);
            if (clientes) {
                set({
                    dadosClientes: clientes.content,
                    totalPaginasClientes: clientes.totalPages
                });
            }
        } catch (error) {
            console.error("Erro ao buscar clientes", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchDietasDoCliente: async (completo = false) => {
        const { clienteSelecionado } = get();
        // const ui = useDietaUiStore.getState();
        if (!clienteSelecionado) return false;

        set({ loading: true });
        try {
            const fetchFn = completo ? pegarDietasPeloClienteTabelaCompleta : pegarDietasPeloClienteNomeId;
            const dietas = await fetchFn(clienteSelecionado);

            if (dietas && dietas.length > 0) {
                set({ todasDietas: dietas });
                // ui.setClientePossuiDietas(true);
                return true;
            }
            set({ todasDietas: null });
            // ui.setClientePossuiDietas(false);
            return false;
        } catch (error) {
            return false;
        } finally {
            set({ loading: false });
        }
    },

    cadastrarDieta: async (form) => {
        const { clienteSelecionado } = get();
        if (!clienteSelecionado) return false;

        set({ loading: true });
        try {
            const resposta = await cadastrarNovaDieta(form, clienteSelecionado);
            if (resposta) {
                return true;
            }
            return false;
        } finally {
            set({ loading: false });
        }
    },

    excluirDieta: async (dieta) => {
        // const ui = useDietaUiStore.getState();
        set({ loading: true });
        try {
            const resposta = await excluirDietaSelecionada(dieta);
            if (resposta) {
                // ui.setMensagem("Dieta excluída com sucesso!");
                // Opcional: Atualizar lista local aqui
                return true;
            }
            return false;
        } catch (err) {
            // ui.setMensagem("❌ Erro ao deletar");
            return false;
        } finally {
            set({ loading: false });
        }
    },

    salvarAlteracoesDieta: async (form) => {
        const { dietaSelecionada } = get();
        if (!dietaSelecionada) return false;
        
        set({ loading: true });
        try {
            const resposta = await atualizarDieta(form, dietaSelecionada);
            if (resposta) {
                get().fetchDietasDoCliente(true);
                return true;
            }
            return false;
        } catch (err) {
            return false;
        } finally {
            set({ loading: false });
        }
    }
}));