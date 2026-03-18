import Style from "./EditarRefeicao.module.css";
import Global from "@/app/globals.module.css";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";
import { useRefeicaoFormStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoFormStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";
import { useTipoRefeicaoCrud } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoCrud";
import { useTipoRefeicaoUiStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoUiStore";
import { useTipoRefeicaoStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoStore";


export default function EditarRefeicao() {
  const mensagem = useMessage();

  // UI SET
  // refeição
  const setEditarRefeicao = useRefeicaoUiStore((state) => state.setEditarRefeicao);
  const setTabelaRefeicoesDaDieta = useRefeicaoUiStore((state) => state.setTabelaRefeicoesDaDieta);
  const setCampoGerenciarRefeicao = useRefeicaoUiStore((state) => state.setCampoGerenciarRefeicao);

  // tipo refeição
  const setCampoCadastrarTipoRefeicao = useTipoRefeicaoUiStore((state) => state.setCampoCadastrarTipoRefeicao);  

  // CRUD
  // dieta
  const dietaSelecionada = useDietaStore((state) => state.dietaSelecionada);

  // refeição
  const atualizarRefeicao = useRefeicaoStore((state) => state.atualizarRefeicao);
  const fetchRefeicoesPorDieta = useRefeicaoStore((state) => state.fetchRefeicoesPorDieta);
  const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);

  // tipo refeição
  const dadosTipoRefeicao = useTipoRefeicaoStore((state) => state.dadosTipoRefeicao);

  // FORM
  const formularioRefeicao = useRefeicaoFormStore((state) => state.formulario);
  const alterarFormularioRefeicao = useRefeicaoFormStore((state) => state.setCampo);

  async function handleEnviarFormularioRefeicao(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (!dietaSelecionada) {
      return;
    }
    const resultado = await atualizarRefeicao(formularioRefeicao);

    if (resultado) {
      mensagem.mostrarSucesso("Refeição alterada com sucesso!");
      setEditarRefeicao(false);
      await fetchRefeicoesPorDieta(dietaSelecionada);
      setTabelaRefeicoesDaDieta(true);
    } else {
      mensagem.mostrarErro("Não foi possível atualizar a refeição!");
    }
  }

  function handleBotaoNovoTipo() {
    setCampoGerenciarRefeicao(false);
    setCampoCadastrarTipoRefeicao(true);
  }

  function handleBotaoVoltar() {
    setEditarRefeicao(false);
    setTabelaRefeicoesDaDieta(true);
  }

  return (
    <>
      <p className={`${Global.subtitulo} ${Style.valores}`}>
        Dieta selecionada: {refeicaoSelecionada?.nome_dieta}
        <br />
        Horário: {refeicaoSelecionada?.horario}
        <br />
        Tipo de Refeição: {refeicaoSelecionada?.descricao}
        <br />
        Observação: {refeicaoSelecionada?.observacao}
      </p>

      <form
        className={Style.formulario}
        onSubmit={handleEnviarFormularioRefeicao}
      >
        <div className={Style.horarioTipo}>
          {/* Horário da Refeição */}
          <div className={Style.campo}>
            <label>Horário da Refeição</label>
            <input
              type="time"
              name="horario"
              // value={useFormularioRefeicao.formularioRefeicao.horario}
              onChange={(e) =>
                alterarFormularioRefeicao(
                  "horario",
                  e.target.value
                )
              }
              required
            />
          </div>

          {/* Tipo Refeição */}
          <div className={`${Style.campo}`}>
            <label>Tipo de Refeição</label>

            <div className={Style.tipoCadastrar}>
              <select
                name="tipoRefeicao"
                required
                className={Style.campoTipo}
                // value={useFormularioRefeicao.formularioRefeicao.tipo_refeicao}
                onChange={(e) =>
                  alterarFormularioRefeicao(
                    "tipo_refeicao",
                    Number(e.target.value)
                  )
                }
              >
                <option value="" hidden>
                  Selecione...
                </option>

                {dadosTipoRefeicao?.map((tipo) => (
                  <option key={tipo.tipo_id} value={tipo.tipo_id}>
                    {tipo.descricao}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className={Style.cadastrarRefeicao}
                onClick={handleBotaoNovoTipo}
                title="Cadastrar novo tipo de refeição"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Observação */}
        <div className={Style.campoFull}>
          <label>Observação</label>
          <textarea
            name="observacao"
            placeholder="Digite uma observação..."
            onChange={(e) =>
              alterarFormularioRefeicao(
                "observacoes",
                e.target.value
              )
            }
          ></textarea>
        </div>

        <div className={Style.acoes}>
          <button
            type="button"
            className={Style.btnSecundario}
            onClick={handleBotaoVoltar}
          >
            Voltar
          </button>
          <button type="submit" className={Style.btnPrincipal}>
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}
