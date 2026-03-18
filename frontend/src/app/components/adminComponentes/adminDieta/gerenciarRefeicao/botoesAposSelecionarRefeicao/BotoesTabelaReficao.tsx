import Style from "./BotoesTabelaReficao.module.css";


import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function BotoesPosSelecionar() {
  const mensagem = useMessage();
  const confirmar = useConfirmar();

  // UI SET
  const setTabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.setTabelaRefeicoesDaDieta);
  const setEditarRefeicao = useRefeicaoUiStore((state) => state.setEditarRefeicao);
  

  // CRUD
  //refeição
  const fetchDadosCompletosRefeicao = useRefeicaoStore((state) => state.fetchDadosCompletosRefeicao);
  const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);
  const excluirRefeicao = useRefeicaoStore((state) => state.excluirRefeicao);
  const fetchRefeicoesPorDieta = useRefeicaoStore((state) => state.fetchRefeicoesPorDieta);
  const loading = useRefeicaoStore((state) => state.loading);

  // dieta
  const dietaSelecionada = useDietaStore((state) => state.dietaSelecionada);

  async function handleEditar() {
    if (!refeicaoSelecionada) {
      mensagem.mostrarErro("Selecione uma refeição!");
      return;
    }
    await fetchDadosCompletosRefeicao(refeicaoSelecionada?.refeicao_id);
    setTabelaRefeicoesDaDieta(false);
    setEditarRefeicao(true);
  }

  async function handleExcluir() {
    if (!refeicaoSelecionada || !dietaSelecionada)
      return;

    const confirmacao = await confirmar.perguntar("Deseja excluir a refeicao?");

    if (!confirmacao) {
      // usuário apertou cancelar
      return;
    }
    const resultado = await excluirRefeicao(refeicaoSelecionada);

    if (resultado) {
      fetchRefeicoesPorDieta(dietaSelecionada);
      mensagem.mostrarSucesso("Refeição excluida com sucesso!");
    } else {
      mensagem.mostrarErro("Não foi possível excluir a refeição!");
    }
  }

  return (
    <div className={Style.botaoMenu}>
      <>
        <button
          onClick={handleEditar}
          className={loading ? Style.status : ""}
        >
          Editar
        </button>

        <button
          onClick={handleExcluir}
          disabled={loading}
        >
          Excluir
        </button>
      </>
    </div>
  );
}
