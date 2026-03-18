"use client"

import { create } from "zustand";
import {
  FormularioRefeicao,
  Refeicao,
  DadosDietas,
  RefeicaoCompleta,
} from "@/service/admin/dieta/interfaces";
import {
  cadastrarRefeicaoNova,
  pegarDadosCompletoDaRefeicao,
  pegarRefeicoesPeloCliente,
  atualizarRefeicao,
  excluirRefeicao
} from "@/service/admin/dieta/requisicoes";

interface RefeicaoState {
  // Dados
  todasRefeicoes: Refeicao[] | null;
  refeicaoSelecionada: Refeicao | null;
  refeicaoCompleta: RefeicaoCompleta | null;
  loading: boolean;

  // Actions de Estado
  setRefeicaoSelecionada: (refeicao?: Refeicao | null) => void;

  // API Actions
  fetchRefeicoesPorDieta: (dieta: DadosDietas) => Promise<boolean>;
  fetchDadosCompletosRefeicao: (id: string) => Promise<boolean>;
  setTodasRefeicoes: (refeicao?: Refeicao[] | null) => void;
  cadastrarRefeicao: (form: FormularioRefeicao) => Promise<Refeicao>;
  atualizarRefeicao: (form: FormularioRefeicao) => Promise<boolean>;
  excluirRefeicao: (refeicao: Refeicao) => Promise<boolean>;
}

export const useRefeicaoStore = create<RefeicaoState>((set, get) => ({
  todasRefeicoes: null,
  refeicaoSelecionada: null,
  refeicaoCompleta: null,
  loading: false,

  setRefeicaoSelecionada: (refeicao) => set({
    refeicaoSelecionada: !refeicao || get().refeicaoSelecionada?.refeicao_id === refeicao.refeicao_id ? null : refeicao
  }),

  setTodasRefeicoes: (refeicao) => set({ todasRefeicoes: refeicao }),

  fetchRefeicoesPorDieta: async (dieta) => {
    set({ loading: true });
    try {
      const res = await pegarRefeicoesPeloCliente(dieta);
      set({ todasRefeicoes: res || null });
      return !!res;
    } finally {
      set({ loading: false });
    }
  },

  fetchDadosCompletosRefeicao: async (id) => {
    set({ loading: true });
    try {
      const dados = await pegarDadosCompletoDaRefeicao(id);
      if (dados) {
        set({ refeicaoCompleta: dados });
        return true;
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  cadastrarRefeicao: async (form: FormularioRefeicao) => {
    set({ loading: true });
    try {
      const resposta = await cadastrarRefeicaoNova(form);
      if (resposta) {
        return resposta;
      }
      return null;
    } finally {
      set({ loading: false });
    }
  },

  atualizarRefeicao: async (form) => {
    const { refeicaoSelecionada } = get();
    if (!refeicaoSelecionada) return false;

    set({ loading: true });
    try {
      const res = await atualizarRefeicao(form, refeicaoSelecionada);
      return !!res;
    } finally {
      set({ loading: false });
    }
  },

  excluirRefeicao: async (refeicao) => {
    set({ loading: true });
    try {
      const res = await excluirRefeicao(refeicao);
      return !!res;
    } finally {
      set({ loading: false });
    }
  },
}));