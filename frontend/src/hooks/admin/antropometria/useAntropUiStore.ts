"use client";

import { create } from "zustand";

interface AntropometriaUiState {
  // Estados de visibilidade (Modais e Campos)
  selecionarClienteCad: boolean; // Tabela de clientes sem dados
  campoCadastrarDados: boolean;  // Formulário de novo cadastro
  editarDados: boolean;          // Modal/Campo de edição
  novaAntropometria: boolean;    // Campo para adicionar dados variáveis
  visualizarDados: boolean;      // Modal de visualização (leitura)
  
  // Ações (Setters)
  setSelecionarClienteCad: (valor: boolean) => void;
  setCampoCadastrarDados: (valor: boolean) => void;
  setEditarDados: (valor: boolean) => void;
  setNovaAntropometria: (valor: boolean) => void;
  setVisualizarDados: (valor: boolean) => void;
  
  // Reset geral
  resetarUi: () => void;
}

export const useAntropUiStore = create<AntropometriaUiState>((set) => ({
  selecionarClienteCad: false,
  campoCadastrarDados: false,
  editarDados: false,
  novaAntropometria: false,
  visualizarDados: false,

  setSelecionarClienteCad: (valor) => set({ selecionarClienteCad: valor }),
  
  setCampoCadastrarDados: (valor) => set({ 
    campoCadastrarDados: valor,
    // Se abrir o cadastro, garantimos que a seleção de cliente feche
    selecionarClienteCad: valor ? false : true 
  }),

  setEditarDados: (valor) => set({ editarDados: valor }),
  
  setNovaAntropometria: (valor) => set({ novaAntropometria: valor }),
  
  setVisualizarDados: (valor) => set({ visualizarDados: valor }),

  // Função para fechar tudo e voltar ao estado inicial da tela
  resetarUi: () => set({
    selecionarClienteCad: false,
    campoCadastrarDados: false,
    editarDados: false,
    novaAntropometria: false,
    visualizarDados: false,
  }),
}));