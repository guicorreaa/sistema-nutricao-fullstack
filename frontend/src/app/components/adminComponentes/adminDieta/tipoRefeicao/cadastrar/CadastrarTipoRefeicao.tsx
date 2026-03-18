import ModalGeral from "@/app/components/modalGeral/modal";
import Style from "./CadastrarTipoRefeicao.module.css";
import Global from "@/app/globals.module.css";

import { useMessage } from "@/app/context/mensagem/MensagemContext";
import ModalMensagem from "@/app/components/mensagem/mensagem";
import { useTipoRefeicaoStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoStore";
import { useTipoRefeicaoFormStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoFormStore";
import { useTipoRefeicaoUiStore } from "@/hooks/admin/dieta/tipoRefeicao/useTipoRefeicaoUiStore";
import { useRefeicaoUiStore } from "@/hooks/admin/dieta/refeicao/useRefeicaoUiStore";

type Acao = "cadastrar" | "editar" | "geral";

type Props = {
  tipoAcao: Acao;
};

export default function CadastrarTipoRefeicao() {

  const modalMensagem = useMessage();

  // UI GET
  const campoCadastrarTipoRefeicao = useTipoRefeicaoUiStore((state) => state.campoCadastrarTipoRefeicao);

  // UI SET
  // refeição
  const setEditarRefeicao = useRefeicaoUiStore((state) => state.setEditarRefeicao);
  
  // tipo refeição
  const setCampoCadastrarTipoRefeicao = useTipoRefeicaoUiStore((state) => state.setCampoCadastrarTipoRefeicao);

  // CRUD
  const cadastrarTipo = useTipoRefeicaoStore((state) => state.cadastrarTipo);
  const fetchTiposDeRefeicao = useTipoRefeicaoStore((state) => state.fetchTiposDeRefeicao);
  
  // FORM
  const formularioTipoRefeicao = useTipoRefeicaoFormStore((state) => state.formulario);
  const alterarFormularioTipoRefeicao = useTipoRefeicaoFormStore((state) => state.setCampo);
  const limparFormulario = useTipoRefeicaoFormStore((state) => state.limparFormulario);

  async function handleCadastrarTipo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const respostaCadastro = await cadastrarTipo(formularioTipoRefeicao);

      if (respostaCadastro) {
        // refeicaoCrud.setCampoCadastrarRefeicao(true);
        setEditarRefeicao(false);
        await fetchTiposDeRefeicao();
        modalMensagem.mostrarSucesso("Tipo cadastrado com sucesso.");
        setCampoCadastrarTipoRefeicao(false);
        limparFormulario();
      } else {
        modalMensagem.mostrarErro("Não foi possível cadastrar!");
      }
    } catch {
      modalMensagem.mostrarErro("Ocorreu um erro inesperado");
    }
  }

  return (
    <>
      <ModalGeral
        isOpen={campoCadastrarTipoRefeicao}
        onClose={() => {
          setCampoCadastrarTipoRefeicao(false);
          limparFormulario();
          setEditarRefeicao(false);
        }}
        title="Cadastrar novo tipo de refeição"
      >
        <>
          <form onSubmit={handleCadastrarTipo} className={Style.formContainer}>
            <p className={Global.subtitulo}>Preencha o campo abaixo:</p>
            {/* Campo Nome */}
            <div className={Style.campoNomeSituacao}>
              <div className={Style.campo}>
                <label className={Style.label}>Nome *</label>
                <input
                  className={Style.input}
                  type="text"
                  value={
                    formularioTipoRefeicao.descricao
                  }
                  onChange={(e) =>
                    alterarFormularioTipoRefeicao(
                      "descricao",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              {/* Campo Situação */}
              <div className={Style.campo}>
                <label className={Style.label}>Situação *</label>
                <select
                  className={Style.select}
                  value={
                    formularioTipoRefeicao.ativo
                      ? "true"
                      : "false"
                  }
                  onChange={(e) =>
                    alterarFormularioTipoRefeicao(
                      "ativo",
                      e.target.value === "true"
                    )
                  }
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            {/* Ações (opcional) */}
            <div className={Style.actions}>
              {/* <button
                type="button"
                className={Style.btnCancel}
                onClick={() => {
                  setCampoCadastrarTipoRefeicao(false);
                  setEditarRefeicao(false);
                }}
              >
                Voltar
              </button> */}
              <button type="submit" className={Style.btnPrimary}>
                Salvar
              </button>
            </div>
          </form>
        </>
      </ModalGeral>

      <ModalMensagem />
    </>
  );
}
