import { DadosDietas } from "@/service/admin/dieta/interfaces";
import Global from "@/app/globals.module.css";
import Modal from "@/app/components/modal/modal";
import CampoSelecionarDietas from "@/app/components/adminComponentes/adminDieta/campoSelecionarDieta/CampoSelecionarDieta";
import TabelaRefeicao from "./tabelaRefeicao/TabelaRefeicao";
import BotoesTabelaRefeicao from "@/app/components/adminComponentes/adminDieta/gerenciarRefeicao/botoesAposSelecionarRefeicao/BotoesTabelaReficao";
import EditarRefeicao from "./editarRefeicao/EditarRefeicao";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useRefeicaoFormStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoFormStore";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

export default function GerenciarRefeicao() {

  // UI GET
  const campoGerenciarRefeicao = useRefeicaoUiStore((state) => state.campoGerenciarRefeicao);
  const tabelaSelecaoDietas = useRefeicaoUiStore((state) => state.tabelaSelecaoDietas);
  const tabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.tabelaRefeicoesDaDieta);
  const editarRefeicao = useRefeicaoUiStore((state) => state.editarRefeicao);

  // UI SET
  const setTabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.setTabelaRefeicoesDaDieta);
  const irParaFormularioRefeicao = useRefeicaoUiStore((state) => state.irParaFormularioRefeicao);
  
  // CRUD
  //refeicao
  const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);
  const setTodasRefeicoes = useRefeicaoStore((state) => state.setTodasRefeicoes);
  const fetchRefeicoesPorDieta = useRefeicaoStore((state) => state.fetchRefeicoesPorDieta);
  
  // dieta
  const todasDietas = useDietaStore((state) => state.todasDietas);
  const setDietaSelecionada = useDietaStore((state) => state.setDietaSelecionada);
  
  // FORM
  const setCampo = useRefeicaoFormStore((state) => state.setCampo);


  const resetUi = useRefeicaoUiStore((state) => state.resetUi);

  function handleFecharCampoGerenciarRefeicao() {
    resetUi();
    setTodasRefeicoes(null);
  }

  async function handleSelecionarDieta(dietaSelecionada: DadosDietas) {
    setCampo("dieta_id", dietaSelecionada.dieta_id);
    setDietaSelecionada(dietaSelecionada);
    await fetchRefeicoesPorDieta(dietaSelecionada);
    setTabelaRefeicoesDaDieta(true);
    irParaFormularioRefeicao();
  }

  return (
    <>
      <Modal
        isOpen={campoGerenciarRefeicao}
        onClose={handleFecharCampoGerenciarRefeicao}
        title="Gerenciar Refeição"
      >
        <>
          {todasDietas && tabelaSelecaoDietas && (
            <CampoSelecionarDietas
              onClick={(dieta) => handleSelecionarDieta(dieta)}
              title="Selecionar a dieta que deseja gerenciar"
            />
          )}

          {tabelaRefeicoesDaDieta && (
            <>
              <p className={Global.subtitulo}>
                Seleciona a refeição que deseja excluir ou alterar:
              </p>
              <TabelaRefeicao />
              {refeicaoSelecionada && <BotoesTabelaRefeicao />}
            </>
          )}

          {editarRefeicao && <EditarRefeicao />}
        </>
      </Modal>
    </>
  );
}
