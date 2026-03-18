import {
  Usuarios,
  FormularioUsuario,
  PaginaUsuarios,
} from "@/service/admin/usuario/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// pegar todos usuarios e preencher a tabela
export async function carragarUsuarios(
  pesquisarUsuario: String = "",
  pagina: number,
  size: number = 20
): Promise<PaginaUsuarios | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/usuario/admin/obterUsuarios?page=${pagina}&size=${size}&nomeEmail=${pesquisarUsuario}`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Erro ao buscar usuarios!", res.status);
      return;
    }

    const resultado: PaginaUsuarios = await res.json();
    return resultado;
  } catch (error) {
    console.error("Erro ao buscar usuarios");
  }
}

// Função para cadastrar um novo usuario
export async function cadastrar(formUsuario: FormularioUsuario): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/usuario/admin/registrar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 aqui manda os cookies junto
        body: JSON.stringify({
          email: formUsuario.email,
          telefone: formUsuario.telefone,
          ativo: true,
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao cadastrar cliente", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar usuário", error);
    return false;
  }
}

// Função para editar um usuario
export async function salvarAlteracoes(
  usuarioSelecionadoId: string,
  dadosUsuario: FormularioUsuario
): Promise<boolean> {
  const dadosAtualizados = {
    email: dadosUsuario.email.toLocaleLowerCase(),
    ativo: dadosUsuario.ativo,
    telefone: dadosUsuario.telefone,
  };

  try {
    const resp = await fetch(
      `${API_BASE_URL}/usuario/admin/update/${usuarioSelecionadoId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // envia os cookies de sessão
        body: JSON.stringify(dadosAtualizados),
      }
    );

    if (!resp.ok) {
      console.warn("Erro ao atualizar usuário", resp.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    return false;
  }
}

/**
 * Função para excluir um usuario
 * Retorna um objeto indicando se a exclusão foi bem-sucedida e, em caso de falha, o status da resposta para tratamento específico (como conflito de associação).
*/
type ResultadoExcluirUsuario = {
  sucesso: boolean;
  status?: number;
};

export async function excluir(usuarioSelecionadoId: string): Promise<ResultadoExcluirUsuario> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/usuario/admin/deletarusuario/${usuarioSelecionadoId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return {
        sucesso: false,
        status: response.status,
      };
    }

    return { sucesso: true };
  } catch (error) {
    console.error("Erro ao deletar usuário", error);
    return { sucesso: false };
  }
}
