import { create } from "zustand";
import { Categoria, FormularioCategoria } from "@/service/admin/dieta/interfaces";
import { 
  pegarTodasCategorias, 
  cadastrarCategoriaNova, 
  atualizarDadosCategoria 
} from "@/service/admin/dieta/requisicoes";

interface CategoriaState {
  // Dados
  todasCategorias: Categoria[] | null;
  categoriaSelecionadaId: number | undefined; // O filtro de pesquisa
  loading: boolean;

  // Actions de Estado
  setCategoriaSelecionadaId: (id: number | undefined) => void;
  setTodasCategorias: (categorias: Categoria[] | null) => void;

  // API Actions
  fetchCategorias: (ativo?: boolean) => Promise<void>;
  cadastrarCategoria: (form: FormularioCategoria) => Promise<any>;
  atualizarCategoria: (form: FormularioCategoria) => Promise<any>;
}

export const useCategoriaStore = create<CategoriaState>((set) => ({
  todasCategorias: null,
  categoriaSelecionadaId: undefined,
  loading: false,

  setCategoriaSelecionadaId: (id) => set({ categoriaSelecionadaId: id }),
  
  setTodasCategorias: (categorias) => set({ todasCategorias: categorias }),

  fetchCategorias: async (ativo) => {
    set({ loading: true });
    try {
      const categorias = await pegarTodasCategorias(ativo);
      set({ todasCategorias: categorias || null });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      set({ loading: false });
    }
  },

  cadastrarCategoria: async (form) => {
    set({ loading: true });
    try {
      return await cadastrarCategoriaNova(form);
    } finally {
      set({ loading: false });
    }
  },

  atualizarCategoria: async (form) => {
    set({ loading: true });
    try {
      return await atualizarDadosCategoria(form);
    } finally {
      set({ loading: false });
    }
  },
}));