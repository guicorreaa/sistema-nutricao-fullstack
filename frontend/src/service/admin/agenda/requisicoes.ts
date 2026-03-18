import {
  FormularioAgendamento,
  InformacoesTabelaAgendamento,
  PaginaAgendamento,
} from "./interfaces";
import { arrumarHorario, mudarDataConsultaBACKEND } from "./funcoes";
import PaginaDadosAntropometricos from "@/app/admin/dadosAntropometricos/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// preencher a tabela que exibi todos os agendamentos
export async function preencherTabelaAgendamentos(
  nomeEmail: String,
  pagina: number,
  size: number = 20,
): Promise<PaginaAgendamento | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/agendar/admin/agendamentos?page=${pagina}&size=${size}&nomeEmail=${nomeEmail}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn("Erro ao buscar os agendamentos cadastrados.", res.status);
      return;
    }

    const resultado: PaginaAgendamento = await res.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao buscar os agendamentos dos clientes");
  }
}

// Função para cadastrar um novo agendamento
export async function cadastrarAgendamentoService(
  formulario: FormularioAgendamento
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/agendar/admin/agendamentos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao cadastrar: ${response.status} - ${text}`);
    }

    // Lê a resposta como texto
    const text = await response.text();
    return text ? JSON.parse(text) : { sucesso: true };
  } catch (err) {
    console.error(err);
    throw err; // propaga o erro pro componente tratar
  }
}

// Função para editar um agendamento
export async function editarAgendamentoService(
  idConsulta: string,
  formulario: FormularioAgendamento
) {
  try {
    // Arrumando antes de enviar para o banco
    formulario.horario_consulta = arrumarHorario(formulario.horario_consulta);

    // Arrumando antes de enviar para o banco
    const dataFormatada = mudarDataConsultaBACKEND(formulario.data_consulta);
    if (!dataFormatada) {
      throw new Error("A data da consulta é inválida ou está vazia!");
    }
    formulario.data_consulta = dataFormatada;

    const response = await fetch(
      `${API_BASE_URL}/agendar/admin/agendamentos/${idConsulta}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    const text = await response.text(); // lê só uma vez

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.status} - ${text}`);
    }

    return text ? JSON.parse(text) : { sucesso: true };
  } catch (err) {
    console.error(err);
    throw err; // propaga o erro pro componente
  }
}

// Função para excluir um agendamento
export async function excluirAgendamentoService(
  agendamentoSelecionadoId: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/agendar/admin/agendamentos/${agendamentoSelecionadoId}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 aqui manda os cookies junto
      }
    );

    const text = await response.text(); // lê só uma vez

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.status} - ${text}`);
    }

    return true;
  } catch (err) {
    console.error(err);
    throw err; // propaga o erro pro componente
    return false;
  }
}

// Função para obter os dados especificos de uma consulta
export async function obterAgendamentoEspecifico(
  agendamentoId: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/agendar/admin/agendamentos/${agendamentoId}`,
      {
        method: "GET",
        credentials: "include"
      }
    )

    if (!response.ok) {
      console.warn("Erro ao buscar o agendamento cadastrado.", response.status);
      return;
    }

    const resultado: FormularioAgendamento = await response.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao obter dados da consulta especifica!")
  }
}
