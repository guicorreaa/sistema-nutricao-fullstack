"use client";

import { create } from 'zustand';
import { FormularioUsuario } from "@/service/admin/usuario/interfaces";

interface UsuarioFormState {
    formulario: FormularioUsuario;
    setCampo: <T extends keyof FormularioUsuario>(
        campo: T, 
        valor: FormularioUsuario[T]
    ) => void;
    preencherFormulario: (usuario: FormularioUsuario) => void;
    limparFormulario: () => void;
}

const FORMULARIO_INICIAL: FormularioUsuario = {
    email: "",
    ativo: true,
    telefone: "",
};

export const useUsuarioFormStore = create<UsuarioFormState>((set) => ({
    formulario: FORMULARIO_INICIAL,

    setCampo: (campo, valor) => set((state) => ({
        formulario: { ...state.formulario, [campo]: valor }
    })),

    preencherFormulario: (usuario) => set({ 
        formulario: { ...usuario } // Spread para garantir nova referência
    }),

    limparFormulario: () => set({ formulario: FORMULARIO_INICIAL }),
}));