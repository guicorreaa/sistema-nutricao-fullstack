import { FormularioAgendamento } from "./interfaces";
import { ChangeEvent } from "react";

// mudar a data da consulta para dia/mês/ano BACKEND APENAS
export function mudarDataConsultaBACKEND(data: string) {
    if (!data) {
      throw new Error("Data da consulta está vazia!");
    }
  
    // Se vier no formato "YYYY-MM-DD"
    if (data.includes("-")) {
      const partes = data.split("-");
      if (partes.length !== 3) throw new Error("Data da consulta está em formato inválido!");
      const [ano, mes, dia] = partes;
      if (!ano || !mes || !dia) throw new Error("Data da consulta tem partes indefinidas!");
      return `${dia.padStart(2,"0")}/${mes.padStart(2,"0")}/${ano}`;
    }
  
    // Se já estiver no formato "DD/MM/YYYY"
    if (data.includes("/")) {
      const partes = data.split("/");
      if (partes.length !== 3) throw new Error("Data da consulta está em formato inválido!");
      const [dia, mes, ano] = partes;
      if (!dia || !mes || !ano) throw new Error("Data da consulta tem partes indefinidas!");
      return `${dia.padStart(2,"0")}/${mes.padStart(2,"0")}/${ano}`;
    }
  
    throw new Error("Formato de data desconhecido: " + data);
  }

// exibi de forma elegante a data da consulta na tabela principal
export function exibirDataConsultaTabela(dataAgendamento: string) {
  const data = new Date(dataAgendamento);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// Formata celular: (DD) 9XXXX-XXXX (TABELA PRINCIPAL)
export function formatarCelular(numero: string) {
  const apenasDigitos = numero.replace(/\D/g, "");
  return apenasDigitos.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

// Formata telefone fixo: (DD) XXXX-XXXX (TABELA PRINCIPAL)
export function formatarTelefone(numero: string) {
  const apenasDigitos = numero.replace(/\D/g, "");
  return apenasDigitos.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

// função genérica para limpar campos
export function limparCampos(
  setFormularioAgendamento: React.Dispatch<
    React.SetStateAction<FormularioAgendamento>
  >,
  setCelularTratado: React.Dispatch<React.SetStateAction<string>>,
  setTelefoneTratado: React.Dispatch<React.SetStateAction<string>>
) {
  setFormularioAgendamento({
    nome: "",
    email: "",
    celular: "",
    telefone: "",
    data_consulta: "",
    horario_consulta: "",
    tipo_consulta: "",
    cancelamento_cliente: false,
    observacoes_consulta: "",
  });

  setCelularTratado("");
  setTelefoneTratado("");
}

export function arrumarHorario(horario: string) {
  return horario.slice(0, 5);
}
