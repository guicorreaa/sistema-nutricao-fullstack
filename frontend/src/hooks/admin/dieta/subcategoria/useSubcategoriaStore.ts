import { create } from "zustand";
import { Subcategoria, FormularioSubcategoria } from "@/service/admin/dieta/interfaces";
import { 
  pegarTodasSubCategorias, 
  cadastrarSubcategoriaNova, 
  atualizarDadosSubCategoria 
} from "@/service/admin/dieta/requisicoes";

interface SubcategoriaState {
  // Dados
  todasSubcategorias: Subcategoria[] | null;
  subcategoriaSelecionadaId: number | undefined; // ID para filtro/pesquisa
  loading: boolean;

  // Actions
  setSubcategoriaSelecionadaId: (id: number | undefined) => void;
  setTodasSubcategorias: (dados: Subcategoria[] | null) => void;

  // API
  fetchSubcategorias: (categoriaId: number | undefined, ativo?: boolean) => Promise<void>;
  cadastrarSubcategoria: (form: FormularioSubcategoria) => Promise<any>;
  atualizarSubcategoria: (form: FormularioSubcategoria) => Promise<any>;
}

export const useSubcategoriaStore = create<SubcategoriaState>((set) => ({
  todasSubcategorias: null,
  subcategoriaSelecionadaId: undefined,
  loading: false,

  setSubcategoriaSelecionadaId: (id) => set({ subcategoriaSelecionadaId: id }),
  
  setTodasSubcategorias: (dados) => set({ todasSubcategorias: dados }),

  fetchSubcategorias: async (categoriaId, ativo) => {
    if (!categoriaId) {
      set({ todasSubcategorias: null });
      return;
    }

    set({ loading: true });
    try {
      const res = await pegarTodasSubCategorias(ativo, categoriaId);
      set({ todasSubcategorias: res || null });
    } catch (error) {
      console.error("Erro ao buscar subcategorias:", error);
    } finally {
      set({ loading: false });
    }
  },

  cadastrarSubcategoria: async (form) => {
    set({ loading: true });
    try {
      return await cadastrarSubcategoriaNova(form);
    } finally {
      set({ loading: false });
    }
  },

  atualizarSubcategoria: async (form) => {
    set({ loading: true });
    try {
      return await atualizarDadosSubCategoria(form);
    } finally {
      set({ loading: false });
    }
  },
}));