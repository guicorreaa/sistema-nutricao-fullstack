"use client";
import { createPortal } from "react-dom"
import { useEffect, useState } from "react";
import Style from "./VisualizarDados.module.css";
import Global from "@/app/globals.module.css";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";

export default function VisualizarFormularioModal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // UI
  const visualizarDados = useAntropUiStore((state) => state.visualizarDados);
  const setVisualizarDados = useAntropUiStore((state) => state.setVisualizarDados);
  
  // FORM
  const formulario = useAntropFormStore((state) => state.formulario);
  const limparFormulario = useAntropFormStore((state) => state.limparFormulario);


  // BLOQUEIA O SCROLL QUANDO O MODAL ESTÁ ABERTO
  useEffect(() => {
    if (visualizarDados) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visualizarDados]);

  if (!visualizarDados || !mounted || !formulario) return null;

  function handleFechar() {
    setVisualizarDados(false);
    limparFormulario();
  }

  return createPortal(
    <div
      className={Style.modal_overlay}
      onClick={handleFechar} // clicar fora fecha
    >
      <div
        className={Style.modal_content}
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
      >
        <h2 className={Global.titulo}>Dados Antropométricos</h2>

        <div className={Style.modal_body}>
          <div className={Style.grid}>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Altura</span>
              <span className={Style.valorCampo}>{formulario.altura} m</span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Peso</span>
              <span className={Style.valorCampo}>{formulario.peso} kg</span>
            </div>

            {/* <div className={Style.campo}>
              <span className={Style.tituloCampo}>Dieta atual</span>
              <span className={Style.valorCampo}>
                {formulario.dieta_atual || "—"}
              </span>
            </div> */}

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Observações</span>
              <span className={Style.valorCampo}>
                {formulario.observacoes || "Nenhuma"}
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Fuma</span>
              <span className={Style.valorCampo}>
                {formulario.fuma ? "Sim" : "Não"}
              </span>
            </div>

            {formulario.fuma && (
              <div className={Style.campo}>
                <span className={Style.tituloCampo}>Frequência que fuma</span>
                <span className={Style.valorCampo}>
                  {formulario.frequencia_fuma || "Não fumante"}
                </span>
              </div>
            )}

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Consumo de água (L/dia)</span>
              <span className={Style.valorCampo}>
                {formulario.consumo_agua_dia} L
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Antecedentes familiares</span>
              <span className={Style.valorCampo}>
                {formulario.antecedentes_familiar || "—"}
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Acompanhamento especial</span>
              <span className={Style.valorCampo}>
                {formulario.precisa_acompanhamento_especial ? "Sim" : "Não"}
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Restrições alimentares</span>
              <span className={Style.valorCampo}>
                {formulario.tem_restricoes_alimentares ? "Sim" : "Não"}
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Toma medicamentos</span>
              <span className={Style.valorCampo}>
                {formulario.toma_medicamentos ? "Sim" : "Não"}
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Circunferência do braço</span>
              <span className={Style.valorCampo}>{formulario.circ_braco} cm</span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Circunferência da panturrilha</span>
              <span className={Style.valorCampo}>
                {formulario.circ_panturrilha} cm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Circunferência da cintura</span>
              <span className={Style.valorCampo}>
                {formulario.circ_cintura} cm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Circunferência do quadril</span>
              <span className={Style.valorCampo}>
                {formulario.circ_quadril} cm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Dobra cutânea tríceps</span>
              <span className={Style.valorCampo}>
                {formulario.dobra_cutanea_triceps} mm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Dobra cutânea bíceps</span>
              <span className={Style.valorCampo}>
                {formulario.dobra_cutanea_biceps} mm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Dobra cutânea escapular</span>
              <span className={Style.valorCampo}>
                {formulario.dobra_cutanea_escapular} mm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Dobra cutânea ilíaca</span>
              <span className={Style.valorCampo}>
                {formulario.dobra_cutanea_iliaca} mm
              </span>
            </div>

            <div className={Style.campo}>
              <span className={Style.tituloCampo}>Fator de atividade física</span>
              <span className={Style.valorCampo}>
                {formulario.fator_atividade_fisica.descricao}
              </span>
            </div>
          </div>
        </div>

        <div className={Style.modal_buttons}>
          <button onClick={handleFechar} className={Style.botaoFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
