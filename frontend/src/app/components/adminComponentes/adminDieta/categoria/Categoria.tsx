import { useEffect, useState } from "react";
import Style from "./Categoria.module.css";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import Modal from "@/app/components/modal/modal";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import { useCategoriaUiStore } from "@/hooks/admin/dieta/categoria/useCategoriaUiStore";
import { useCategoriaFormStore } from "@/hooks/admin/dieta/categoria/useCategoriaForm";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";
import { useSubcategoriaFormStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaFormStore";
import { useSubcategoriaUiStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaUi";

export default function Categoria() {
    const mensagem = useMessage();
    const campoConfirmar = useConfirmar();

    // UI GET
    // categoria
    const isModalCadastrarAberto = useCategoriaUiStore((state) => state.isModalCadastrarAberto);
    const isModalEditarAberto = useCategoriaUiStore((state) => state.isModalEditarAberto);

    // UI SET
    // categoria
    const resetUi = useCategoriaUiStore((state) => state.resetUi);

    // subcategoria
    const setModalCadastrar = useSubcategoriaUiStore((state) => state.setModalCadastrar);

    // CRUD
    // categoria
    const fetchCategorias = useCategoriaStore((state) => state.fetchCategorias);
    const cadastrarCategoria = useCategoriaStore((state) => state.cadastrarCategoria);
    const atualizarCategoria = useCategoriaStore((state) => state.atualizarCategoria);

    // FORM
    // categoria
    const formularioCategoria = useCategoriaFormStore((state) => state.formulario);
    const alterarFormularioCategoria = useCategoriaFormStore((state) => state.setCampo);
    const limparFormulario = useCategoriaFormStore((state) => state.limparFormulario);

    // subcategoria
    const formularioSubcategoria = useSubcategoriaFormStore((state) => state.formulario);
    const alterarFormularioSubcategoria = useSubcategoriaFormStore((state) => state.setCampo);
    
    // Local state
    const [carregando, setCarregando] = useState(false);
    const [descricao, setDescricao] = useState<string>("");

    function handleFechar() {
        resetUi();
        limparFormulario();
        setDescricao("");
    }

    // Cadastrar ou atualizar categoria
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!descricao.trim()) {
            mensagem.mostrarErro("A descrição é obrigatória.");
            return;
        }

        const confirmacao = await campoConfirmar.perguntar(`Tem certeza que deseja adicionar: ${descricao}`);

        if (confirmacao) {
            setCarregando(true);

            const dadosParaEnviar = {
                ...formularioCategoria,
                descricao: descricao
            }

            try {
                const resposta = isModalCadastrarAberto
                    ? await cadastrarCategoria(dadosParaEnviar)
                    : await atualizarCategoria(dadosParaEnviar);

                if (resposta?.success) {
                    mensagem.mostrarSucesso(`Categoria ${isModalCadastrarAberto ? "cadastrada" : "atualizada"} com sucesso!`);
                    handleFechar();
                    await fetchCategorias();
                    if (isModalCadastrarAberto) {
                        if (resposta.response?.categoria_id) {
                            alterarFormularioSubcategoria("categoria_id", resposta.response.categoria_id);
                            setModalCadastrar(true);
                        }
                    }
                    limparFormulario();
                    setDescricao("");
                } else {
                    mensagem.mostrarErro(resposta.mensagemErro || `Não foi possível ${isModalCadastrarAberto ? "cadastrada" : "atualizada"} a categoria.`);
                }
            } catch (error) {
                console.error("Erro inesperado ao salvar categoria.", error)
                mensagem.mostrarErro("Erro inesperado ao salvar categoria.");
            } finally {
                setCarregando(false);
            }
        }
    }

    useEffect(() => {
        if (isModalEditarAberto) {
            setDescricao(formularioCategoria.descricao);
        }
    }, [isModalEditarAberto]);

    return (
        <Modal
            isOpen={isModalCadastrarAberto || isModalEditarAberto}
            onClose={handleFechar}
            title={isModalCadastrarAberto ? "Cadastrar nova categoria" : "Editar categoria"}
        >
            <div className={Style.container}>
                <form onSubmit={handleSubmit} className={Style.form}>
                    <div className={Style.campo}>
                        <label htmlFor="descricao">Descrição da Categoria</label>
                        <input
                            id="descricao"
                            type="text"
                            placeholder="Ex: Carnes, Frutas..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className={Style.checkboxGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={formularioCategoria.ativo}
                                onChange={(e) => alterarFormularioCategoria("ativo", e.target.checked)}
                            />
                            Categoria Ativa
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className={Style.btnSalvar}
                    >
                        {carregando ? "Salvando..." : "Salvar Categoria"}
                    </button>
                </form>
            </div>
        </Modal>
    );
}