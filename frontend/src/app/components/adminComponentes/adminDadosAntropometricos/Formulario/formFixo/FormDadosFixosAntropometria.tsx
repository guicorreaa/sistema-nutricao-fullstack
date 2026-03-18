"use client"

import Style from "./FormDadosFixosAntropometria.module.css";
import Global from "@/app/globals.module.css";
import { useAntropUiStore } from "@/hooks/admin/antropometria/useAntropUiStore";
import { useAntropFormStore } from "@/hooks/admin/antropometria/useAntropFormStore";
import { useAntropStore } from "@/hooks/admin/antropometria/useAntropStore";

interface FormDados {
  onSubmit?: () => void;
  botaoAtivo: boolean
}

export default function FormDadosFixosAntropometria({ onSubmit, botaoAtivo }: FormDados) {

  // UI
  const resetarUi = useAntropUiStore((state) => state.resetarUi);

  // CRUD
  const fatorAtividade = useAntropStore((state) => state.fatorAtividade);
  const loading = useAntropStore((state) => state.loading);

  // FORM
  const formulario = useAntropFormStore((state) => state.formulario);
  const setCampo = useAntropFormStore((state) => state.setCampo);



  // Campos booleanos Sim/Não
  const camposBooleanos: { label: string; campo: keyof typeof formulario }[] = [
    { label: "Fuma", campo: "fuma" },
    { label: "Precisa de acompanhamento especial", campo: "precisa_acompanhamento_especial" },
    { label: "Tem restrição alimentar", campo: "tem_restricoes_alimentares" },
    { label: "Toma medicamentos", campo: "toma_medicamentos" },
  ];

  return (
    <div className={Style.containerCadastrarEditarCliente}>
      <h3 className={Global.tituloInformativo}>Preencha os campos</h3>
      <p className={Global.subtitulo}>
        Por favor, preencha os dados antropométricos do cliente para manter completo e atualizado.
      </p>

      <form
        className={Style.formCadastro}
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        {/* Campos numéricos e textos */}
        <div className={Style.campos}>
          <label htmlFor="altura">Altura (cm):</label>
          <input
            type="number"
            id="altura"
            step={1}
            value={formulario.altura}
            onChange={(e) => setCampo("altura", Number(e.target.value))}
            min={1}
            max={999}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="frequenciaFuma">Frequência que fuma:</label>
          <input
            type="text"
            id="frequenciaFuma"
            value={formulario.frequencia_fuma}
            onChange={(e) => setCampo("frequencia_fuma", e.target.value)}
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="consumoAguaDia">Consumo de água no dia (Ml):</label>
          <input
            type="number"
            id="consumoAguaDia"
            value={formulario.consumo_agua_dia}
            onChange={(e) => setCampo("consumo_agua_dia", Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="antecedentesFamiliar">Antecedentes familiares:</label>
          <input
            type="text"
            id="antecedentesFamiliar"
            value={formulario.antecedentes_familiar}
            onChange={(e) => setCampo("antecedentes_familiar", e.target.value)}
          />
        </div>

        <div className={Style.campos}>
          <label htmlFor="fatorAtividadeFisica">Fator atividade física:</label>
          <select
            id="fatorAtividadeFisica"
            // Usamos a descrição para o Select saber qual opção está marcada visualmente
            value={formulario.fator_atividade_fisica.descricao || ""}
            onChange={(e) => {
              // Encontramos o objeto original completo dentro do array data
              const selecionado = fatorAtividade.find(f => f.descricao === e.target.value);
              if (selecionado) {
                setCampo("fator_atividade_fisica", selecionado);
              }
            }}
            required
          >
            <option value="">Selecione um fator...</option>
            {fatorAtividade.map((item) => (
              <option key={item.valor} value={item.descricao}>
                {item.descricao} ({item.valor})
              </option>
            ))}
          </select>
        </div>

        {/* Campos booleanos Sim/Não */}
        {camposBooleanos.map(({ label, campo }) => (
          <div className={Style.campos} key={campo}>
            <label htmlFor={campo}>{label}:</label>
            <select
              id={campo}
              value={formulario[campo] ? "true" : "false"}
              onChange={(e) => setCampo(campo, e.target.value === "true")}
              required
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
        ))}

        <div className={Style.campos}>
          <label htmlFor="observacao">Observações:</label>
          <textarea
            id="observacao"
            className={Style.observacao}
            value={formulario.observacoes ? formulario.observacoes : ""}
            onChange={(e) => setCampo("observacoes", e.target.value)}
          />
        </div>

        {/* Botões */}
        {botaoAtivo && (
          <div className={Style.botaoCadastrarFechar}>
            <button
              type="submit"
              className={`${Style.btnCadastrar} ${loading ? Style.btnCarregando : ""}`}
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Cadastrar"}
            </button>

            <button type="button" className={Global.botaoFechar} onClick={resetarUi}>
              Fechar
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
