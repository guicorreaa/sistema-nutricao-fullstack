import { useState } from "react";
import Style from "./Subcategoria.module.css";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import Modal from "@/app/components/modal/modal";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import { useSubcategoriaUiStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaUi";
import { useSubcategoriaFormStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaFormStore";
import { useSubcategoriaStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaStore";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";

export default function Subcategoria() {
    const mensagem = useMessage();
    const campoConfirmar = useConfirmar();

    // UI SET
    // subcategoria
    const resetUi = useSubcategoriaUiStore((state) => state.resetUi);
    const isModalCadastrarAberto = useSubcategoriaUiStore((state) => state.isModalCadastrarAberto);
    const isModalEditarAberto = useSubcategoriaUiStore((state) => state.isModalEditarAberto);

    // CRUD
    // subcategoria
    const fetchSubcategorias = useSubcategoriaStore((state) => state.fetchSubcategorias);
    const cadastrarSubcategoria = useSubcategoriaStore((state) => state.cadastrarSubcategoria);
    const atualizarSubcategoria = useSubcategoriaStore((state) => state.atualizarSubcategoria);

    // categoria
    const todasCategorias = useCategoriaStore((state) => state.todasCategorias);

    // FORM
    // subcategoria
    const formulario = useSubcategoriaFormStore((state) => state.formulario);
    const setCampo = useSubcategoriaFormStore((state) => state.setCampo);
    const limparFormularioSubcategoria = useSubcategoriaFormStore((state) => state.limparFormulario);

    const [carregando, setCarregando] = useState(false);

    function handleFechar() {
        resetUi();
        limparFormularioSubcategoria();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!formulario.descricao.trim()) {
            mensagem.mostrarErro("A descrição é obrigatória.");
            return;
        }

        if (!formulario.categoria_id) {
            mensagem.mostrarErro("A categoria é obrigatória.");
            return;
        }

        if (!formulario.subcategoria_id && isModalEditarAberto) {
            mensagem.mostrarErro("O ID da subcategoria é obrigatório.");
            return;
        }

        const confirmacao = await campoConfirmar.perguntar(`Tem certeza que deseja ${isModalCadastrarAberto ? "cadastrar" : "alterar"}: ${formulario.descricao}`);
        
        if (confirmacao) {
            setCarregando(true);
            try {                

                const resposta = isModalCadastrarAberto 
                ? await cadastrarSubcategoria(formulario)
                : await atualizarSubcategoria(formulario);

                if (resposta?.success) {
                    await fetchSubcategorias(formulario.categoria_id, true);
                    mensagem.mostrarSucesso("Subcategoria cadastrada com sucesso!");
                    handleFechar();
                } else {
                    mensagem.mostrarErro(resposta.mensagemErro || `Não foi possível ${isModalCadastrarAberto ? "cadastrar" : "alterar"} a subcategoria.`);
                }
            } catch (error) {
                mensagem.mostrarErro("Erro inesperado ao salvar subcategoria.");
            } finally {
                setCarregando(false);
            }
        }
    }

    return (
        <Modal
            isOpen={isModalCadastrarAberto}
            onClose={handleFechar}
            title={"Cadastrar nova subcategoria"}
        >
            <div className={Style.container}>

                <form onSubmit={handleSubmit} className={Style.form}>
                    <select
                        required
                        value={formulario.categoria_id || ""}
                        onChange={(e) => {
                            const novoId = Number(e.target.value);
                            setCampo("categoria_id", novoId);
                        }}
                    >
                        <option value="">Selecione uma Categoria *</option>
                        {todasCategorias?.map(cat => (
                            <option key={cat.categoria_id} value={cat.categoria_id}>{cat.descricao}</option>
                        ))}
                    </select>

                    {!!formulario.categoria_id && (
                        <>
                            <div className={Style.campo}>
                                <label htmlFor="descricao">Descrição da subcategoria</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    placeholder="Ex: Arroz, Ovo..."
                                    value={formulario.descricao}
                                    onChange={(e) => setCampo("descricao", e.target.value)}
                                    required
                                />
                            </div>

                            <div className={Style.checkboxGroup}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formulario.ativo}
                                        onChange={(e) => setCampo("ativo", e.target.checked)}
                                    />
                                    Subcategoria Ativa
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={carregando}
                                className={Style.btnSalvar}
                            >
                                {carregando ? "Salvando..." : "Salvar Categoria"}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </Modal>
    );
}