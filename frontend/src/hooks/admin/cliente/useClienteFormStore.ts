"use client";

import { create } from 'zustand';

import { FormularioCadastrarCliente } from "@/service/admin/cliente/interface";

interface ClienteFormStore {
    formulario: FormularioCadastrarCliente;
    setCampo: <T extends keyof FormularioCadastrarCliente>(
        campo: T,
        valor: FormularioCadastrarCliente[T]
    ) => void;
    preencherFormulario: (cliente: FormularioCadastrarCliente) => void;
    limparFormulario: () => void;
}

const FORM_CADASTRAR_CLIENTE: FormularioCadastrarCliente = {
    nome: "",
    dataNascimento: "",
    sexo: "",
    nivelAtividadeFisica: "",
    objetivoNutricional: "",
};

export const useFormClienteStore = create<ClienteFormStore>((set) => ({

    formulario: FORM_CADASTRAR_CLIENTE,

    setCampo: (campo, valor) => set((state) => ({
        formulario: { ...state.formulario, [campo]: valor }
    })),

    preencherFormulario: (cliente) => set({
        formulario: {...cliente}
    }),

    limparFormulario: () => set({ formulario: FORM_CADASTRAR_CLIENTE })

}));