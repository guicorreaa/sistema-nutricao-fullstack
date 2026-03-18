import { create } from "zustand";
import {
    PageableAlimentos,
    TabelaAlimentos,
    FormularioAlimento,
    AlimentoCompleto
} from "@/service/admin/dieta/interfaces";
import { 
    preencherTabelaAlimentos, 
    cadastrarNovoAlimento, 
    pegarAlimento, 
    atualizarAlimento 
} from "@/service/admin/dieta/requisicoes";

interface AlimentoState {
    // Dados
    dadosTabelaAlimentos: PageableAlimentos | null;
    alimentoSelecionado: TabelaAlimentos | null;
    loading: boolean;

    // Filtros de Busca (Estado persistente para a tabela)
    filtros: {
        page: number;
        size: number;
        ativo?: boolean;
        categoria_id?: number;
        subcategoria_id?: number;
        nome_alimento?: string;
    };

    // Actions de Estado
    setAlimentoSelecionado: (alimento?: TabelaAlimentos | null) => void;
    setFiltros: (novosFiltros: Partial<AlimentoState["filtros"]>) => void;

    // API
    fetchTabelaAlimentos: (categoriaId?: number, subcategoriaId?: number) => Promise<void>;
    cadastrarAlimento: (formulario: FormularioAlimento) => Promise<boolean>;
    pegarAlimentoEspecifico: (alimentoId: number) => Promise<AlimentoCompleto | null>;
    salvarAlteracoesAlimento: (formulario: AlimentoCompleto) => Promise<boolean>;
}

const estadosIniciais = {
    dadosTabelaAlimentos: null,
    alimentoSelecionado: null,
    loading: false,
    filtros: {
        page: 0,
        size: 20,
        ativo: undefined,
        categoria_id: undefined,
        subcategoria_id: undefined,
        nome_alimento: "",
    }
};

export const useAlimentoStore = create<AlimentoState>((set, get) => ({
    ...estadosIniciais,

    setAlimentoSelecionado: (alimento) => set((state) => ({
        alimentoSelecionado: !alimento || state.alimentoSelecionado?.alimento_id === alimento?.alimento_id ? null : alimento
    })),
    
    setFiltros: (novosFiltros) => set((state) => ({
        filtros: { ...state.filtros, ...novosFiltros }
    })),

    fetchTabelaAlimentos: async (categoriaId, subcategoriaId) => {
        const { filtros } = get();
        set({ loading: true });
        try {
            const resposta = await preencherTabelaAlimentos(
                filtros.page,
                filtros.size,
                filtros.ativo,
                categoriaId,
                subcategoriaId,
                filtros.nome_alimento
            );
            if (resposta) set({ dadosTabelaAlimentos: resposta });
        } catch (error) {
            console.error("Erro ao buscar alimentos", error);
        } finally {
            set({ loading: false });
        }
    },

    cadastrarAlimento: async (formulario) => {
        set({ loading: true });
        try {
            const resposta = await cadastrarNovoAlimento(formulario);
            return !!resposta;
        } catch (err) {
            return false;
        } finally {
            set({ loading: false });
        }
    },

    pegarAlimentoEspecifico: async (alimentoId) => {
        if (!alimentoId) return null;
        set({ loading: true });
        try {
            return await pegarAlimento(alimentoId);
        } finally {
            set({ loading: false });
        }
    },

    salvarAlteracoesAlimento: async (formulario) => {
        set({ loading: true });
        try {
            const resposta = await atualizarAlimento(formulario);
            if (resposta) {
                get().fetchTabelaAlimentos();
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