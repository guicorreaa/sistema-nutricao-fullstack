"use client"

import Global from "@/app/globals.module.css";
import Style from "./FormDadosVariaveisAntropometria.module.css";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";

interface FormularioAntropometricoProps {
  onSubmit?: () => void;
  botaoAtivo: boolean
}

export default function FormDadosVariaveisAntropometria({
  onSubmit,
  botaoAtivo
}: FormularioAntropometricoProps) {

  // UI
  const resetarUi = useAntropUiStore((state) => state.resetarUi);

  // CRUD
  const loading = useAntropStore((state) => state.loading);

  // FORM
  const formulario = useAntropFormStore((state) => state.formulario);
  const setCampo = useAntropFormStore((state) => state.setCampo);

  return (
    <div className={Style.containerCadastrarEditarCliente}>
      {botaoAtivo && (
        <>
          <h3 className={Global.tituloInformativo}>Preencha os campos</h3>
          <p className={Global.subtitulo}>
            Por favor, preencha os dados conforme as medidas obtidas
          </p>
        </>
      )}
      <form
        className={Style.formCadastro}
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        <div className={Style.campos}>
          <label htmlFor="peso">Peso (Kg):</label>
          <input
            type="number"
            id="peso"
            value={formulario.peso}
            onChange={(e) =>
              setCampo("peso", parseFloat(e.target.value))
            }
            min={1}
            max={999}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="circunferenciaBraco">Circunferência do braço:</label>
          <input
            type="number"
            id="circunferenciaBraco"
            value={formulario.circ_braco}
            onChange={(e) =>
              setCampo("circ_braco", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="circunferenciaPanturrilha">Circunferência da panturrilha:</label>
          <input
            type="number"
            id="circunferenciaPanturrilha"
            value={formulario.circ_panturrilha}
            onChange={(e) =>
              setCampo("circ_panturrilha", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="circunferenciaCintura">Circunferência da cintura:</label>
          <input
            type="number"
            id="circunferenciaCintura"
            value={formulario.circ_cintura}
            onChange={(e) =>
              setCampo("circ_cintura", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="circunferenciaQuadril">Circunferência do quadril:</label>
          <input
            type="number"
            id="circunferenciaQuadril"
            value={formulario.circ_quadril}
            onChange={(e) =>
              setCampo("circ_quadril", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="dobraCutaneaTriceps">Dobra cutânea triceps:</label>
          <input
            type="number"
            id="dobraCutaneaTriceps"
            value={formulario.dobra_cutanea_triceps}
            onChange={(e) =>
              setCampo("dobra_cutanea_triceps", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="dobraCutaneaBiceps">Dobra cutânea bíceps:</label>
          <input
            type="number"
            id="dobraCutaneaBiceps"
            value={formulario.dobra_cutanea_biceps}
            onChange={(e) =>
              setCampo("dobra_cutanea_biceps", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="dobraCutaneaEscapular">Dobra cutânea escapular:</label>
          <input
            type="number"
            id="dobraCutaneaEscapular"
            value={formulario.dobra_cutanea_escapular}
            onChange={(e) =>
              setCampo("dobra_cutanea_escapular", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="dobraCutaneaIliaca">Dobra cutânea ilíaca:</label>
          <input
            type="number"
            id="dobraCutaneaIliaca"
            value={formulario.dobra_cutanea_iliaca}
            onChange={(e) =>
              setCampo("dobra_cutanea_iliaca", parseFloat(e.target.value))
            }
            min={1}
            step={0.1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="observacao">Observações:</label>
          <textarea
            id="observacao"
            value={formulario.observacoes}
            onChange={(e) =>
              setCampo("observacoes", e.target.value)
            }
          />
        </div>

        {botaoAtivo && (
          <div className={Style.botaoCadastrarFechar}>
            <button
              type="submit"
              className={`${Style.btnCadastrar} ${loading ? Style.btnCarregando : ""}`}
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Cadastrar"}
            </button>

            <button
              type="button" // <<< aqui, o segredo
              className={Global.botaoFechar}
              onClick={resetarUi}
            >
              Fechar
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
