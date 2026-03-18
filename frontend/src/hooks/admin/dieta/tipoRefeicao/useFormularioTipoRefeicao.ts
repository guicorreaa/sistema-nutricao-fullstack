import { FormularioTipoRefeicao } from "@/service/admin/dieta/interfaces";
import { useState } from "react";

export function useFormularioTipoRefeicao() {
  const FORMULARIO_TIPO_REFEICAO_VAZIO: FormularioTipoRefeicao = {
    ativo: true,
    descricao: "",
  };

  const [formularioTipoRefeicao, setFormularioTipoRefeicao] =
    useState<FormularioTipoRefeicao>(FORMULARIO_TIPO_REFEICAO_VAZIO);

  const alterarFormularioTipoRefeicao = <
    T extends keyof FormularioTipoRefeicao
  >(
    campo: T,
    valor: FormularioTipoRefeicao[T]
  ) => setFormularioTipoRefeicao((prev) => ({ ...prev, [campo]: valor }));

  const limparFormularioTipoRefeicao = () => setFormularioTipoRefeicao(FORMULARIO_TIPO_REFEICAO_VAZIO);

  return {
    formularioTipoRefeicao,
    alterarFormularioTipoRefeicao,
    limparFormularioTipoRefeicao
  };
}
