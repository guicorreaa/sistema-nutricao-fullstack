import { useItemRefeicaoFormStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoFormStore";
import Style from "./TabelaRefeicao.module.css";
import Global from "@/app/globals.module.css";
import { useRefeicaoFormStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoFormStore";
import { useRefeicaoStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoStore";

import { Refeicao, TotaisMacros } from "@/service/admin/dieta/interfaces";
import { useItemRefeicaoUiStore } from "@/hooks/admin/dieta/alimentosRefeicao/useItemRefeicaoUiStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";

export default function TabelaRefeicao() {

  // UI SET
  // refeição
  const setCampoGerenciarRefeicao = useRefeicaoUiStore((state) => state.setCampoGerenciarRefeicao);

  // item refeição
  const setCampoItemRefeicaoSendoUsado = useItemRefeicaoUiStore((state) => state.setCampoItemRefeicaoSendoUsado);

  // CRUD
  //refeicao
  const todasRefeicoes = useRefeicaoStore((state) => state.todasRefeicoes);
  const refeicaoSelecionada = useRefeicaoStore((state) => state.refeicaoSelecionada);
  const setRefeicaoSelecionada = useRefeicaoStore((state) => state.setRefeicaoSelecionada);

  // FORM
  const alterarFormularioItemRefeicao = useItemRefeicaoFormStore((state) => state.setCampo);

  function handleCadastrarAlimento(refeicao: Refeicao) {
    setRefeicaoSelecionada(refeicao); // Atualiza na UI
    alterarFormularioItemRefeicao("refeicao_id", refeicao.refeicao_id); // Atualiza o formulario
    setCampoItemRefeicaoSendoUsado(true);
  }

  return (
    <>
      <div className={Style.tableWrapper}>
        <table className={Style.tabelaClientes}>
          <thead>
            <tr>
              <th className={Style.thNome}>Tipo de Refeição</th>
              <th>Horário</th>
              <th>Observação</th>
              <th>Alimentos</th>
              <th>Carboidratos</th>
              <th>Kcal</th>
            </tr>
          </thead>

          <tbody>
            {todasRefeicoes?.length ? (
              todasRefeicoes.map((refeicao) => (
                <tr
                  key={refeicao.refeicao_id}
                  onClick={() => { setRefeicaoSelecionada(refeicao) }}
                  className={
                    refeicaoSelecionada?.refeicao_id ===
                      refeicao.refeicao_id
                      ? Style.selecionado
                      : ""
                  }
                >
                  <td>{refeicao.descricao}</td>
                  <td>{refeicao.horario}</td>
                  <td>{refeicao.observacao}</td>
                  <td className={Style.cadastrarAlimento}>
                    <button
                      className={Style.botaoCadastrarAlimento}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCadastrarAlimento(refeicao);
                        setCampoGerenciarRefeicao(false);
                      }}
                      title="Cadastrar Alimento"
                    >+</button>
                  </td>
                  <td>{"00000"}</td>
                  <td>{"00000"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhuma refeiçao encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
