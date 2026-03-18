import { create } from "zustand";
import {
    FormularioItemRefeicao,
    ItemRefeicaoTabela,
    Refeicao
} from "@/service/admin/dieta/interfaces";
import {
    cadastrarNovoItemRefeicao,
    pegarAlimentosRefeicao,
    excluirAlimento,
    cadastrarNovoItemRefeicaoOpcional
} from "@/service/admin/dieta/requisicoes";

interface ItemRefeicaoState {
    todosItemRefeicao: ItemRefeicaoTabela[] | null;
    alimentoCadastradoSelecionado: ItemRefeicaoTabela | null;
    loading: boolean;

    // Actions
    setTodosItemRefeicao: (lista: ItemRefeicaoTabela[] | null) => void;
    setAlimentoCadastradoSelecionado: (alimento: ItemRefeicaoTabela | null) => void;

    // Funções de Negócio (CRUD)
    preencherTabelaAlimentosRefeicao: (refeicao: Refeicao) => Promise<boolean>;
    cadastrarNovoItemNaRefeicao: (formulario: FormularioItemRefeicao) => Promise<boolean>;
    excluirAlimentoSelecionado: (alimento: ItemRefeicaoTabela) => Promise<boolean>;
    cadastrarAlimentoOpcional: (formularioItemRefeicao: FormularioItemRefeicao) => Promise<boolean>;
}

const estadosIniciais = {
    todosItemRefeicao: null,
    alimentoCadastradoSelecionado: null,
    loading: false,
}

export const useItemRefeicaoStore = create<ItemRefeicaoState>((set, get) => ({
    ...estadosIniciais,

    setTodosItemRefeicao: (lista) => set({ todosItemRefeicao: lista }),
    setAlimentoCadastradoSelecionado: (alimento) => set({ alimentoCadastradoSelecionado: alimento }),

    preencherTabelaAlimentosRefeicao: async (refeicao: Refeicao) => {
        try {
            const resposta = await pegarAlimentosRefeicao(refeicao);
            if (resposta) {
                set({ todosItemRefeicao: resposta });
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao buscar alimentos:", error);
            return false;
        }
    },

    cadastrarNovoItemNaRefeicao: async (formulario) => {

        if (!formulario.alimento_id || !formulario.refeicao_id) return false;

        set({ loading: true });
        try {
            const resposta = await cadastrarNovoItemRefeicao(formulario);
            if (resposta) {
                return true;
            }
            return false;
        } catch (err) {
            console.error("Erro ao cadastrar um novo item de refeição", err);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    excluirAlimentoSelecionado: async (alimento) => {
        set({ loading: true });
        try {
            const resposta = await excluirAlimento(alimento);
            return !!resposta;
        } catch (error) {
            console.error("Erro ao deletar:", error);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    cadastrarAlimentoOpcional: async (formularioItemRefeicao) => {
        const { alimentoCadastradoSelecionado } = get();

        if (!alimentoCadastradoSelecionado) return false;

        set({ loading: true });
        try {
            const resposta = await cadastrarNovoItemRefeicaoOpcional(
                alimentoCadastradoSelecionado,
                formularioItemRefeicao
            );
            if (resposta) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        } finally {
            set({ loading: false });
        }
    },
}));