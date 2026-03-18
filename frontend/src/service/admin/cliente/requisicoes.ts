import {
  DadosTabelaCliente,
  FormularioCadastrarCliente,
  PaginaClientes,
} from "@/service/admin/cliente/interface";
import { PaginaUsuarios, Usuarios } from "../usuario/interfaces";
import { formatarData, formatarDataEnviarFormulario } from "./funcoes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// preenche a tabela clientes
export async function carregarClientes(
  pesquisaNomeCliente: string = "",
  pagina: number,
  size: number = 20
): Promise<
  PaginaClientes | undefined
> {
  try {
    const res = await fetch(`${API_BASE_URL}/cliente/admin?page=${pagina}&size=${size}&nome=${pesquisaNomeCliente}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Erro ao buscar clientes!", res.status);
      return;
    }

    const resultado: PaginaClientes = await res.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao buscar clientes");
  }
}

/**
 * Função para carregar os usuários que ainda não foram associados a um cliente, com suporte para pesquisa por nome ou email e paginação.
 */
export async function carregarUsuarios(
  nomeEmail: string = "",
  pagina: number,
  size: number = 20
): Promise<PaginaUsuarios | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/usuario/admin/usuariosSemCliente?nomeEmail=${nomeEmail}&page=${pagina}&size=${size}`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn("Erro ao buscar usuários!", res.status);
      return;
    }

    const resultado = await res.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao buscar usuários!");
  }
}

// Função para cadastrar um novo cliente
export async function cadastrar(
  usuarioSelecionadoId: string,
  formularioCliente: FormularioCadastrarCliente
): Promise<boolean> {
  try {

    const dataFormatada = formatarDataEnviarFormulario(formularioCliente.dataNascimento);

    const response = await fetch(
      `${API_BASE_URL}/cliente/admin/${usuarioSelecionadoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nome: formularioCliente.nome,
          dataNascimento: dataFormatada,
          sexo: formularioCliente.sexo,
          objetivoNutricional: formularioCliente.objetivoNutricional,
          nivelAtividadeFisica: formularioCliente.nivelAtividadeFisica,
        }),
      }
    );

    // Se o servidor retornar erro (4xx ou 5xx)
    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Erro ao cadastrar cliente:", response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return false;
  }
}

/**
 * Função para excluir um usuario
 * Retorna um objeto indicando se a exclusão foi bem-sucedida e, em caso de falha, o status da resposta para tratamento específico (como conflito de associação).
*/
type ResultadoExcluirCliente = {
  sucesso: boolean;
  status?: number;
};

// Função para excluir um cliente
export async function excluir(
  clienteSelecionadoId: string
): Promise<ResultadoExcluirCliente> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cliente/admin/${clienteSelecionadoId}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 aqui manda os cookies junto
      }
    );

    if (!response.ok) {
      return {
        sucesso: false,
        status: response.status,
      };
    }
    return { sucesso: true };
  } catch (err) {
    console.warn("Não foi possível deletar o cliente!");
    return { sucesso: false };
  }
}

// Editar um cliente cadastrado
export async function editar(
  clienteSelecionadoId: string,
  formulario: FormularioCadastrarCliente
): Promise<boolean> {

  try {
    const response = await fetch(
      `${API_BASE_URL}/cliente/admin/${clienteSelecionadoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formulario,
          dataNascimento: formatarDataEnviarFormulario(formulario.dataNascimento)
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao atualizar o cliente!");
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}