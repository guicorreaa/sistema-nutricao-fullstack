import { create } from "zustand";
import { FormularioAlimento, AlimentoCompleto } from "@/service/admin/dieta/interfaces";

// Centralizamos o estado vazio
const FORMULARIO_ALIMENTO_VAZIO: FormularioAlimento = {
    nome_alimento: "",
    umidade: 0,
    energia_kcal: 0,
    energia_kj: 0,
    proteina: 0,
    lipidios: 0,
    colesterol: 0,
    carboidrato: 0,
    fibra_alimentar: 0,
    calcio: 0,
    magnesio: 0,
    manganes: 0,
    fosforo: 0,
    ferro: 0,
    sodio: 0,
    potassio: 0,
    cobre: 0,
    zinco: 0,
    retinol: 0,
    vitamina_a_re: 0,
    vitamina_a_rae: 0,
    tiamina: 0,
    riboflavina: 0,
    piridoxina: 0,
    niacina: 0,
    vitamina_c: 0,
    categoria_id: 0,
    subcategoria_id: 0,
};

interface AlimentoFormState {
    formulario: FormularioAlimento | AlimentoCompleto;

    // Actions
    setCampo: <T extends keyof FormularioAlimento>(
        campo: T,
        valor: FormularioAlimento[T]
    ) => void;
    
    setFormularioCompleto: (dados: FormularioAlimento | AlimentoCompleto) => void;
    preencherFormulario: (dados: FormularioAlimento) => void;
    limparFormulario: () => void;
}

export const useAlimentoFormStore = create<AlimentoFormState>((set) => ({
    formulario: FORMULARIO_ALIMENTO_VAZIO,

    // Atualiza apenas um campo nutritivo ou identificador
    setCampo: (campo, valor) =>
        set((state) => ({
            formulario: { ...state.formulario, [campo]: valor },
        })),

    // Preenche o formulário todo (útil ao clicar em editar um alimento da tabela)
    setFormularioCompleto: (dados) => set({ formulario: dados }),

    preencherFormulario: (dados) => set({ formulario: dados }),

    // Reseta tudo para o padrão
    limparFormulario: () => set({ formulario: FORMULARIO_ALIMENTO_VAZIO }),
}));