"use client";

import { create } from "zustand";
import { 
  DadosAntropometricos, 
  DadosAntropometricosFixos, 
  DadosAntropometricosVariaveis 
} from "@/service/admin/dadosAntropometricos/interfaces";

interface AntropometriaFormState {
  // O estado "mestre" que contém tudo
  formulario: DadosAntropometricos;

  // Ações
  setCampo: <T extends keyof DadosAntropometricos>(campo: T, valor: DadosAntropometricos[T]) => void;
  popularFormularioCompleto: (dados: DadosAntropometricos) => void;
  popularFormularioFixo: (dados: DadosAntropometricosFixos) => void;
  popularFormularioVariavel: (dados: DadosAntropometricosVariaveis) => void;
  limparFormulario: () => void;
}

const ESTADO_INICIAL: DadosAntropometricos = {
  dieta_atual: "",
  observacoes: "",
  altura: 0,
  peso: 0,
  fuma: false,
  frequencia_fuma: "",
  consumo_agua_dia: 0,
  antecedentes_familiar: "",
  precisa_acompanhamento_especial: false,
  tem_restricoes_alimentares: false,
  toma_medicamentos: false,
  circ_braco: 0,
  circ_panturrilha: 0,
  circ_cintura: 0,
  circ_quadril: 0,
  dobra_cutanea_triceps: 0,
  dobra_cutanea_biceps: 0,
  dobra_cutanea_escapular: 0,
  dobra_cutanea_iliaca: 0,
  fator_atividade_fisica: { valor: 0, descricao: "", chave: "" },
};

export const useAntropFormStore = create<AntropometriaFormState>((set) => ({
  formulario: ESTADO_INICIAL,

  setCampo: (campo, valor) =>
    set((state) => ({
      formulario: { ...state.formulario, [campo]: valor },
    })),

  popularFormularioCompleto: (dados) => set({ formulario: dados }),

  popularFormularioFixo: (dados) => 
    set((state) => ({
      formulario: { ...state.formulario, ...dados }
    })),

  popularFormularioVariavel: (dados) => 
    set((state) => ({
      formulario: { ...state.formulario, ...dados }
    })),

  limparFormulario: () => set({ formulario: ESTADO_INICIAL }),
}));