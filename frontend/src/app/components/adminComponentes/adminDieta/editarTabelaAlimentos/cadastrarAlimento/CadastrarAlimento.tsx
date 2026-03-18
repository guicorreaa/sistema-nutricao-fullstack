import { AlimentoCompleto, FormularioAlimento } from "@/service/admin/dieta/interfaces";
import Style from "./CadastrarAlimento.module.css";
import { useEffect, useState } from "react";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import BotaoCadastroCategoria from "../botaoCadastroCategoria/BotaoCadastroCategoria";
import BotaoCadastrarEditarSubcategoria from "../botaoCadastrarEditarSubcategoria/BotaoCadastrarSubcategoria";
import Categoria from "../../categoria/Categoria";
import Subcategoria from "../../subcategoria/Subcategoria";
import BotaoEditarCategoria from "../../categoria/botaoEditarCategoria/BotaoEditarCategoria";
import BotaoEditarSubcategoria from "../../subcategoria/botaoEditarSubcategoria/BotaoEditarSubcategoria";
import { useAlimentoFormStore } from "@/hooks/admin/dieta/alimentos/useAlimentoFormStore";
import { useSubcategoriaStore } from "@/hooks/admin/dieta/subcategoria/useSubcategoriaStore";
import { useAlimentoStore } from "@/hooks/admin/dieta/alimentos/useAlimentoStore";
import { useAlimentoUiStore } from "@/hooks/admin/dieta/alimentos/useAlimentoUiStore";
import { useCategoriaStore } from "@/hooks/admin/dieta/categoria/useCategoriaStore";

interface CadastrarAlimentoProps {
    modo: "cadastrar" | "editar",
    setCadastrar: (valor: boolean) => void;
}

// Definição das listas para os Maps (Fora do componente para não recriar em cada render)
const LISTA_MACROS = [
    { label: "Energia (kcal) *", name: "energia_kcal" },
    { label: "Proteína (g) *", name: "proteina" },
    { label: "Carboidrato (g) *", name: "carboidrato" },
    { label: "Lipídios (g) *", name: "lipidios" },
] as const;

const LISTA_GERAL = [
    { label: "Umidade (g)", name: "umidade" },
    { label: "Energia (kj)", name: "energia_kj" },
    { label: "Fibra Alimentar (g)", name: "fibra_alimentar" },
    { label: "Colesterol (mg)", name: "colesterol" },
] as const;

const LISTA_MINERAIS = [
    { label: "Cálcio (mg)", name: "calcio" },
    { label: "Magnésio (mg)", name: "magnesio" },
    { label: "Manganês (mg)", name: "manganes" },
    { label: "Fósforo (mg)", name: "fosforo" },
    { label: "Ferro (mg)", name: "ferro" },
    { label: "Sódio (mg)", name: "sodio" },
    { label: "Potássio (mg)", name: "potassio" },
    { label: "Cobre (mg)", name: "cobre" },
    { label: "Zinco (mg)", name: "zinco" },
] as const;

const LISTA_VITAMINAS = [
    { label: "Retinol (µg)", name: "retinol" },
    { label: "Vit. A (RE)", name: "vitamina_a_re" },
    { label: "Vit. A (RAE)", name: "vitamina_a_rae" },
    { label: "Tiamina (mg)", name: "tiamina" },
    { label: "Riboflavina (mg)", name: "riboflavina" },
    { label: "Piridoxina (mg)", name: "piridoxina" },
    { label: "Niacina (mg)", name: "niacina" },
    { label: "Vitamina C (mg)", name: "vitamina_c" },
] as const;

export default function CadastrarAlimento({ modo, setCadastrar }: CadastrarAlimentoProps) {
    const mensagem = useMessage();

    // UI SET
    // alimento
    const setCampoEditarAlimentos = useAlimentoUiStore((state) => state.setCampoEditarAlimentos);

    // CRUD
    // alimento
    const alimentoSelecionado = useAlimentoStore((state) => state.alimentoSelecionado);
    const pegarAlimentoEspecifico = useAlimentoStore((state) => state.pegarAlimentoEspecifico);
    const cadastrarAlimento = useAlimentoStore((state) => state.cadastrarAlimento);
    const salvarAlteracoesAlimento = useAlimentoStore((state) => state.salvarAlteracoesAlimento);

    // categorias
    const todasCategorias = useCategoriaStore((state) => state.todasCategorias);
    const categoriaSelecionadaId = useCategoriaStore((state) => state.categoriaSelecionadaId);

    // subcategorias
    const todasSubcategorias = useSubcategoriaStore((state) => state.todasSubcategorias);
    const fetchSubcategorias = useSubcategoriaStore((state) => state.fetchSubcategorias);
    const subcategoriaSelecionadaId = useSubcategoriaStore((state) => state.subcategoriaSelecionadaId);

    // FORM
    const formularioAlimento = useAlimentoFormStore((state) => state.formulario);

    const [formLocal, setFormLocal] = useState(formularioAlimento);

    // Funções de Ajuda
    const alterarCampo = <T extends keyof (FormularioAlimento | AlimentoCompleto)>(
        campo: T,
        valor: (FormularioAlimento | AlimentoCompleto)[T]
    ) => setFormLocal((prev) => ({ ...prev, [campo]: valor }))

    const limparFormulario = () => {
        setFormLocal(formularioAlimento);
    };

    // Buscar subcategorias quando mudar a categoria
    useEffect(() => {
        // Só busca se houver um ID válido
        if (formLocal.categoria_id && formLocal.categoria_id !== 0) {
            fetchSubcategorias(formLocal.categoria_id, true);
        }
    }, [formLocal.categoria_id]);

    // Lógica para carregar dados na Edição
    useEffect(() => {
        const carregarDados = async () => {
            if (modo === "editar" && alimentoSelecionado) {
                const dados = await pegarAlimentoEspecifico(alimentoSelecionado.alimento_id)

                if (dados) {
                    setFormLocal(dados);
                } else {
                    mensagem.mostrarErro("Não foi possível carregar os dados do alimento para edição.");
                    limparFormulario();
                }

            } else {
                limparFormulario();
            }
        }

        carregarDados();
    }, [modo, alimentoSelecionado?.alimento_id]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // 1. Validação inicial
        if (modo === "editar" && !alimentoSelecionado?.alimento_id) {
            return mensagem.mostrarErro("Nenhum alimento selecionado para edição.");
        }

        // 2. Prepara os dados brutos (misturando o formLocal com o ID se for edição)
        const dadosBrutos = modo === "cadastrar"
            ? { ...formLocal }
            : { ...formLocal, alimento_id: alimentoSelecionado!.alimento_id };

        // 3. LIMPEZA: Remove as descrições em texto e extrai apenas o que a API precisa
        const {
            descricaoCategoria,
            descricaoSubcategoria,
            ...dadosParaEnviar
        } = dadosBrutos as any;

        // 4. GARANTIA: Força os IDs a serem numero
        const payloadFinal = {
            ...dadosParaEnviar,
            categoria_id: Number(dadosParaEnviar.categoria_id),
            subcategoria_id: Number(dadosParaEnviar.subcategoria_id)
        };

        // 5. Executa a ação
        const resposta = modo === "cadastrar"
            ? await cadastrarAlimento(payloadFinal as FormularioAlimento)
            : await salvarAlteracoesAlimento(payloadFinal as AlimentoCompleto);

        if (resposta) {
            mensagem.mostrarSucesso(`Alimento ${modo === "cadastrar" ? "cadastrado" : "atualizado"}!`);
            limparFormulario();

            if (modo === "cadastrar") {
                setCadastrar(false);
            } else {
                setCampoEditarAlimentos(false);
            }
        } else {
            mensagem.mostrarErro("Erro ao processar a requisição.");
        }
    }

    return (
        <form className={Style.form} onSubmit={onSubmit}>

            {/* SEÇÃO: DADOS BÁSICOS */}
            <div className={Style.section}>
                <h3>Dados Básicos</h3>
                <input
                    required
                    name="nome_alimento"
                    value={formLocal.nome_alimento}
                    placeholder="Nome do Alimento *"
                    onChange={(e) => alterarCampo("nome_alimento", e.target.value)}
                />

                <div className={Style.containerCategoria}>
                    <select
                        required
                        value={formLocal.categoria_id || ""} // Se for 0, fica "" para o required funcionar
                        onChange={(e) => {
                            const novoId = Number(e.target.value);
                            setFormLocal(prev => ({ ...prev, categoria_id: novoId, subcategoria_id: 0 }));
                        }}
                    >
                        <option value="">Selecione uma Categoria *</option>
                        {todasCategorias?.map(cat => (
                            <option key={cat.categoria_id} value={cat.categoria_id}>{cat.descricao}</option>
                        ))}
                    </select>

                    <BotaoCadastroCategoria />
                    <BotaoEditarCategoria categoriaId={formLocal.categoria_id} />
                    <Categoria />
                </div>

                <div className={Style.containerSubcategoria}>
                    <select
                        required
                        value={formLocal.subcategoria_id || ""}
                        onChange={(e) => alterarCampo("subcategoria_id", Number(e.target.value))}
                        disabled={!formLocal.categoria_id}
                    >
                        <option value="">Selecione uma Subcategoria *</option>
                        {todasSubcategorias?.map(sub => (
                            <option key={sub.subcategoria_id} value={sub.subcategoria_id}>{sub.descricao}</option>
                        ))}
                    </select>

                    <BotaoCadastrarEditarSubcategoria />
                    {!!(formLocal.categoria_id && formLocal.subcategoria_id) && (
                        <BotaoEditarSubcategoria subcategoriaId={formLocal.subcategoria_id} />
                    )}
                    <Subcategoria />
                </div>
            </div>

            {/* SEÇÃO: MACRONUTRIENTES */}
            <div className={Style.gridNutrientes}>
                <h3>Macronutrientes (por 100g)</h3>
                {LISTA_MACROS.map((campo) => (
                    <label key={campo.name}>
                        {campo.label}
                        <input
                            type="number"
                            step="any"
                            value={formLocal[campo.name] ?? 0}
                            onChange={(e) => alterarCampo(campo.name, Number(e.target.value))}
                        />
                    </label>
                ))}
            </div>

            {/* SEÇÃO: MICRONUTRIENTES (OPCIONAL) */}
            <details className={Style.micronutrientes}>
                <summary>Ver Micronutrientes (Opcional)</summary>
                <div className={Style.microContainer}>

                    {/* Grupo Geral */}
                    <section className={Style.microGroup}>
                        <h4>Geral</h4>
                        {LISTA_GERAL.map((campo) => (
                            <label key={campo.name}>
                                {campo.label}
                                <input
                                    type="number"
                                    step="any"
                                    value={formLocal[campo.name] ?? 0}
                                    onChange={(e) => alterarCampo(campo.name, Number(e.target.value))}
                                />
                            </label>
                        ))}
                    </section>

                    {/* Grupo Minerais */}
                    <section className={Style.microGroup}>
                        <h4>Minerais</h4>
                        <div className={Style.gridMicroItems}>
                            {LISTA_MINERAIS.map((campo) => (
                                <label key={campo.name}>
                                    {campo.label}
                                    <input
                                        type="number"
                                        step="any"
                                        value={formLocal[campo.name] ?? 0}
                                        onChange={(e) => alterarCampo(campo.name, Number(e.target.value))}
                                    />
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Grupo Vitaminas */}
                    <section className={Style.microGroup}>
                        <h4>Vitaminas</h4>
                        <div className={Style.gridMicroItems}>
                            {LISTA_VITAMINAS.map((campo) => (
                                <label key={campo.name}>
                                    {campo.label}
                                    <input
                                        type="number"
                                        step="any"
                                        value={formLocal[campo.name] ?? 0}
                                        onChange={(e) => alterarCampo(campo.name, Number(e.target.value))}
                                    />
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
            </details>

            <div className={Style.areaBotoes}>
                <button type="submit" className={Style.btnSalvar}>
                    {modo === "cadastrar" ? "Cadastrar Alimento" : "Salvar Alterações"}
                </button>
            </div>
        </form>
    );
}