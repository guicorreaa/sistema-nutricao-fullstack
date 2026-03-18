import Global from "@/app/globals.module.css";
import Style from "./BotoesMenus.module.css";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";
import { useDietaUiStore } from "@/hooks/admin/dieta/clienteDieta/useDietaUiStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useTipoRefeicaoUiStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoUiStore";

export default function BotoesMenu() {

  // UI SET
  // dieta
  const setBotaoCampoCadastrarDieta = useDietaUiStore((state) => state.setBotaoCampoCadastrarDieta);
  const setCampoAlterarDieta = useDietaUiStore((state) => state.setCampoAlterarDieta);
  const setVerTabelaDieta = useDietaUiStore((state) => state.setVerTabelaDieta);
  const setCampoGerenciarDieta = useDietaUiStore((state) => state.setCampoGerenciarDieta);
  
  // refeicao
  const setCampoCadastrarRefeicao = useRefeicaoUiStore((state) => state.setCampoCadastrarRefeicao);
  const irParaSelecaoDietas = useRefeicaoUiStore((state) => state.irParaSelecaoDietas);
  const setCampoGerenciarRefeicao = useRefeicaoUiStore((state) => state.setCampoGerenciarRefeicao);
  
  // tipo refeição
  const setCampoCadastrarTipoRefeicao = useTipoRefeicaoUiStore((state) => state.setCampoCadastrarTipoRefeicao);

  // CRUD
  // dieta
  const fetchDietasDoCliente = useDietaStore((state) => state.fetchDietasDoCliente);
  const clienteSelecionado = useDietaStore((state) => state.clienteSelecionado);

  // refeição
  const setRefeicaoSelecionada = useRefeicaoStore((state) => state.setRefeicaoSelecionada);

  const opcoes = [
    {
      titulo: "Cadastrar Dieta",
      descricao: "Adicionar uma nova dieta para o cliente.",
      onClick: () => {
        fetchDietasDoCliente(false);
        setBotaoCampoCadastrarDieta(true);
      },
    },
    {
      titulo: "Gerenciar Dieta",
      descricao: "Gerencie as dietas existentes.",
      onClick: () => {
        fetchDietasDoCliente(true);
        setCampoAlterarDieta(false);
        setVerTabelaDieta(true);
        setCampoGerenciarDieta(true);
      },
    },
    {
      titulo: "Cadastrar Refeição",
      descricao: "Cadastre a refeição de um cliente.",
      onClick: () => {
        fetchDietasDoCliente(false);
        setCampoCadastrarRefeicao(true);
        irParaSelecaoDietas();
        setCampoCadastrarTipoRefeicao(false);
      },
    },
    {
      titulo: "Gerenciar Refeições",
      descricao: "Gerencie as refeições existentes.",
      onClick: async () => {
        setRefeicaoSelecionada();
        await fetchDietasDoCliente(false);
        setCampoGerenciarRefeicao(true);
        irParaSelecaoDietas();
      },
    },
    // {
    //   titulo: "Gerenciar Tipos de Refeição",
    //   descricao: "Gerencie os tipos de refeições existentes.",
    //   // onClick: () => pegarDietasPeloCliente(),
    // },
  ];

  return (
    <>
      <p className={`${Global.subtitulo} ${Style.subtituloNome}`}>
        Cliente selecionado: {clienteSelecionado ? clienteSelecionado.nome : ""}
      </p>

      <div className={Style.divBotoes}>
        <div className={Style.cardsContainer}>
          {opcoes.map((opcao, index) => (
            <div key={index} className={Style.card} onClick={opcao.onClick}>
              <h2>{opcao.titulo}</h2>
              <p>{opcao.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
