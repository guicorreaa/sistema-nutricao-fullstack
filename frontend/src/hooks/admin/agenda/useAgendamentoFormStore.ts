"use client";

import { create } from "zustand";
import { FormularioAgendamento } from "@/service/admin/agenda/interfaces";

interface AgendamentoFormState {
  // --- ESTADO ---
  formulario: FormularioAgendamento;

  // --- AÇÕES ---
  setCampo: <T extends keyof FormularioAgendamento>(
    campo: T,
    valor: FormularioAgendamento[T]
  ) => void;
  
  preencherFormulario: (agendamento: FormularioAgendamento) => void;
  limparFormulario: () => void;
}

const FORMULARIO_VAZIO: FormularioAgendamento = {
  nome: "",
  email: "",
  celular: "",
  telefone: "",
  data_consulta: "",
  horario_consulta: "",
  tipo_consulta: "",
  cancelamento_cliente: false,
  observacoes_consulta: "",
};

export const useAgendamentoFormStore = create<AgendamentoFormState>((set) => ({
  formulario: FORMULARIO_VAZIO,

  // Altera um campo específico mantendo o resto do objeto
  setCampo: (campo, valor) =>
    set((state) => ({
      formulario: {
        ...state.formulario,
        [campo]: valor,
      },
    })),

  // Preenche o formulário todo de uma vez (útil para Edição)
  preencherFormulario: (agendamento) => set({ formulario: agendamento }),

  // Reseta para o estado inicial
  limparFormulario: () => set({ formulario: FORMULARIO_VAZIO }),
}));