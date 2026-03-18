import {
  DadosDietas,
  DadosTabelaCliente,
  FormularioCadastrarDieta,
  FormularioTipoRefeicao,
  FormularioRefeicao,
  RefeicaoCompleta,
  Refeicao,
  FormularioItemRefeicao,
  ItemRefeicaoTabela,
  PaginaClienteDieta,
  FormularioAlimento,
  FormularioCategoria,
  AlimentoCompleto,
  FormularioSubcategoria
} from "@/service/admin/dieta/interfaces";

import { formatarDataParaBackend } from "@/service/admin/dieta/funcoes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ******************************** CLIENTES ********************************
// preencher a tabela clientes
export async function preencherTabelaClientesPrincipal(
  nomeEmail: string = "",
  page: number,
  size: number = 20
): Promise<
  PaginaClienteDieta | undefined
> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/cliente/admin/dadosSimples?nomeEmail=${nomeEmail}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn("Não foi possível buscar os clientes!", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar clientes");
  }
}

// ******************************** DIETAS ********************************
// pegar as dietas de um cliente
export async function pegarDietasPeloClienteNomeId(
  clienteSelecionado: DadosTabelaCliente
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/dieta/admin/dietas/nomes/${clienteSelecionado.clienteId}`, // mudar a URL depois que criar o endpoint
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar as dietas", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar dietas");
  }
}

// pegar as dietas de um cliente (tras todos os dados da tabela)
export async function pegarDietasPeloClienteTabelaCompleta(
  clienteSelecionado: DadosTabelaCliente
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/dieta/admin/dietas/${clienteSelecionado.clienteId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn("Não foi possível buscar as dietas", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar dietas");
  }
}

export async function cadastrarNovaDieta(
  formulario: FormularioCadastrarDieta,
  clienteSelecionado: DadosTabelaCliente
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dieta/admin/cadastrar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nome_dieta: formulario.dieta_nome,
          data_inicio: formulario.data_inicio,
          data_final: formulario.data_final,
          cliente_id: clienteSelecionado.clienteId,
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao cadastrar uma nova dieta", response.status);
      return;
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return true;
  } catch (err) { }
}

export async function atualizarDieta(
  formulario: FormularioCadastrarDieta,
  dietaSelecionada: DadosDietas
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dieta/admin/dietas/editar/${dietaSelecionada.dieta_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nome_dieta: formulario.dieta_nome,
          data_inicio: formatarDataParaBackend(formulario.data_inicio),
          data_final: formatarDataParaBackend(formulario.data_final),
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao atualizar a dieta", response.status);
      return;
    }
    return true;
  } catch (err) { }
}

// Função para excluir uma dieta
export async function excluirDietaSelecionada(dietaSelecionada: DadosDietas) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dieta/admin/dietas/${dietaSelecionada.dieta_id}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 aqui manda os cookies junto
      }
    );

    if (!response.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Erro ao deletar essa dieta!", response.status);
      return;
    }

    return true;
  } catch (err) {
    return false;
  }
}

// ******************************** REFEIÇÃO ********************************
// Cadastrar nova refeição
export async function cadastrarRefeicaoNova(formulario: FormularioRefeicao) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/refeicao/admin/cadastrar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          horario: formulario.horario,
          dieta_id: formulario.dieta_id,
          tipo_id: formulario.tipo_refeicao,
          observacao: formulario.observacoes,
        }),
      }
    );

    if (!response.ok) {
      console.warn(
        "Não foi possível cadastrar uma nova refeição.",
        response.status
      );
      return null;
    }

    const refeicaoCriada = await response.json();
    return refeicaoCriada;

  } catch (err) { }
}

// Função para pegar as refeições cadastrados no sistema
export async function pegarRefeicoesPeloCliente(dietaSelecionada: DadosDietas) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/refeicao/admin/obter/${dietaSelecionada.dieta_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar as refeições.", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar as refeições.");
  }
}

// Função para pegar os dados da refeição completa (usado para editar ou visualizar)
export async function pegarDadosCompletoDaRefeicao(
  idRefeicaoSelecionada: string
): Promise<RefeicaoCompleta | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/refeicao/admin/informacoes/${idRefeicaoSelecionada}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar a refeição.", res.status);
      return null; // <- aqui!
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar a refeição.");
    return null; // <- aqui também!
  }
}

// Atualizar refeição
export async function atualizarRefeicao(
  formulario: FormularioRefeicao,
  refeicaoSelecionada: Refeicao
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/refeicao/admin/editar/${refeicaoSelecionada.refeicao_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          horario: formulario.horario,
          dieta_id: formulario.dieta_id,
          tipo_id: formulario.tipo_refeicao,
          observacao: formulario.observacoes,
        }),
      }
    );

    if (!response.ok) {
      console.warn("Não foi possível atualizar a refeição.", response.status);
      return;
    }

    return true;
  } catch (err) { }
}

export async function excluirRefeicao(refeicaoSelecionada: Refeicao) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/refeicao/admin/deletar/${refeicaoSelecionada.refeicao_id}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 aqui manda os cookies junto
      }
    );

    if (!response.ok) {
      console.warn("Não foi possível excluir a refeição.", response.status);
      return;
    }

    return true;
  } catch (err) { }
}

// ******************************** TIPO REFEIÇÃO ********************************
// Função usada para cadastrar um novo tipo de refeição (EX: Café da Manhã)
export async function cadastrarNovoTipoRefeicao(
  formulario: FormularioTipoRefeicao
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tipo/admin/tipos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          descricao: formulario.descricao,
          ativo: formulario.ativo,
        }),
      }
    );

    if (!response.ok) {
      console.warn(
        "Não foi possível cadastrar uma novo tipo de refeição.",
        response.status
      );
      return;
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return true;
  } catch (err) { }
}

// Função para pegar os tipos de refeições cadastrados no sistema
export async function pegarTiposDeRefeicao() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/tipo/admin/tipos`, // mudar a URL depois que criar o endpoint
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn(
        "Não foi possível buscar os tipos de refeições.",
        res.status
      );
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar os tipos de refeições.");
  }
}

// ******************************** ALIMENTOS ********************************
// Pegar todos os alimentos do banco de dados (somente valores usados)
export async function preencherTabelaAlimentos(
  page = 0,
  size = 20,
  ativo?: boolean,
  categoria_id?: number,
  subcategoria_id?: number,
  nome_alimento?: string
) {
  try {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("size", String(size));

    if (ativo !== undefined) params.append("ativo", String(ativo));

    if (categoria_id !== undefined)
      params.append("categoria_id", String(categoria_id));

    if (subcategoria_id !== undefined)
      params.append("subcategoria_id", String(subcategoria_id));

    if (nome_alimento) params.append("nome_alimento", nome_alimento);

    const res = await fetch(
      `${API_BASE_URL}/alimento/admin/obter?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar os alimentos.", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar os alimentos.");
  }
}

// Cadastrar novo alimento
export async function cadastrarNovoAlimento(
  formulario: FormularioAlimento
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/alimento/admin/alimentos`,
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
      console.warn(
        "Não foi possível cadastrar um novo alimento.",
        response.status
      );
      return;
    }

    return true;
  } catch (err) {
    console.error("Erro ao cadastrar o alimento", err);
  }
}

export async function pegarAlimento(alimentoId: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/alimento/admin/obter/${alimentoId}`, {
      method: "GET",
      credentials: "include"
    }
    );

    if (!response.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar o alimento", response.status);
      return;
    }

    const resultado = await response.json();

    return resultado;
  } catch (err) {
    console.error("Erro ao obter alimento específico!");
  }
}

// Atualizar alimento
export async function atualizarAlimento(
  formulario: AlimentoCompleto
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/alimento/admin/alimentos/${formulario.alimento_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    if (!response.ok) {
      console.warn("Não foi possível atualizar o alimento.", response.status);
      return;
    }

    return true;
  } catch (err) {
    console.error("Erro ao atualizar o alimento", err);
  }
}

// ******************************** CATEGORIA ********************************
// Pegar todas categorias
export async function pegarTodasCategorias(ativo?: boolean) {
  try {
    const params = new URLSearchParams();

    if (ativo !== undefined) params.append("ativo", String(ativo));

    const res = await fetch(
      `${API_BASE_URL}/categoria/admin/categorias?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar as categorias.", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar as categorias.");
  }
}

// Cadastrar categoria
export async function cadastrarCategoriaNova(formulario: FormularioCategoria) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categoria/admin/categorias`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    // Pegamos o texto bruto primeiro para não quebrar no JSON.parse
    const text = await response.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      // Se não for JSON, o 'data' será o texto puro (ex: "Categoria já existe")
      data = text;
    }

    if (!response.ok) {
      return {
        success: false,
        mensagemErro: typeof data === 'string' ? data : (data.message || "Erro ao cadastrar categoria."),
        status: response.status
      };
    }
    return { success: true, response: data };
  } catch (err) {
    console.error("Erro crítico na requisição!", err);
    return { success: false, mensagemErro: "Erro de conexão com o servidor." };
  }
}

// Atualizar categoria
export async function atualizarDadosCategoria(
  formulario: FormularioCategoria
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categoria/admin/categorias/${formulario.categoria_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    const text = await response.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    // O status 204 (No Content) é um sucesso!
    if (response.ok || response.status === 204) {
      return { success: true, response: data };
    }

    // Se chegou aqui, é erro (400, 500, etc)
    return {
      success: false,
      mensagemErro: typeof data === 'string' ? data : (data?.message || "Erro ao atualizar categoria."),
      status: response.status
    };
  } catch (err) {
    console.error("Erro crítico na requisição!", err);
    return { success: false, mensagemErro: "Erro de conexão com o servidor." };
  }
}

// ******************************** SUBCATEGORIA ********************************
// Pegar todas subcategorias
// Pegar subcategorias POR categoria
export async function pegarTodasSubCategorias(
  ativo?: boolean,
  categoriaId?: number
) {
  try {
    // 🔒 não chama sem categoria
    if (!categoriaId) return [];

    const res = await fetch(
      `${API_BASE_URL}/subcategoria/admin/obter?ativo=${ativo ? "true" : "false"}&categoriaId=${categoriaId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn("Não foi possível buscar as subcategorias.", res.status);
      return [];
    }

    const resultado = await res.json();
    return resultado;

  } catch (error) {
    console.error("Erro ao buscar as subcategorias.");
    return [];
  }
}

// Cadastrar categoria
export async function cadastrarSubcategoriaNova(formulario: FormularioSubcategoria) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/subcategoria/admin/subcategorias`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    const text = await response.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      return {
        success: false,
        mensagemErro: typeof data === 'string' ? data : (data.message || "Erro ao cadastrar subcategoria."),
        status: response.status
      };
    }

    return { success: true, response: data };
  } catch (err) {
    console.error("Erro crítico na requisição!", err);
    return { success: false, mensagemErro: "Erro de conexão com o servidor." };
  }
}

// Atualizar subcategoria
export async function atualizarDadosSubCategoria(
  formulario: FormularioSubcategoria
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/subcategoria/admin/subcategorias/${formulario.subcategoria_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formulario),
      }
    );

    const text = await response.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    // O status 204 (No Content) é um sucesso!
    if (response.ok || response.status === 204) {
      return { success: true, response: data };
    }

    // Se chegou aqui, é erro (400, 500, etc)
    return {
      success: false,
      mensagemErro: typeof data === 'string' ? data : (data?.message || "Erro ao atualizar subcategoria."),
      status: response.status
    };
  } catch (err) {
    console.error("Erro crítico na requisição!", err);
    return { success: false, mensagemErro: "Erro de conexão com o servidor." };
  }
}

// ******************************** ITEM REFEIÇÃO ********************************
export async function cadastrarNovoItemRefeicao(
  formulario: FormularioItemRefeicao
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/itemrefeicao/admin/cadastrar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          refeicao_id: formulario.refeicao_id, // pego quando seleciono a refeição (ao abrir a pagina)
          alimento_id: formulario.alimento_id,
          observacao: formulario.observacao,
          quantidadeGramas: formulario.quantidadeGramas
        }),
      }
    );

    if (!response.ok) {
      console.warn(
        "Não foi possível cadastrar o alimento selecionado.",
        response.status
      );
      return;
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return true;
  } catch (err) {
    console.error("Erro ao tentar cadastrar alimento na refeição.")
  }
}

// Pegar os alimentos cadastrados na refeição
export async function pegarAlimentosRefeicao(
  refeicao: Refeicao
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/itemrefeicao/admin/obter/${refeicao.refeicao_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Não foi possível buscar os alimentos cadastrados na refeição", res.status);
      return;
    }

    const resultado = await res.json();

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar os alimentos cadastrados na refeição.");
  }
}

// Função para excluir uma dieta
export async function excluirAlimento(alimento: ItemRefeicaoTabela) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/itemrefeicao/admin/deletar/${alimento.id_item_refeicao}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 aqui manda os cookies junto
      }
    );

    if (!response.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Erro ao deletar o alimento dessa refeição!", response.status);
      return;
    }

    return true;
  } catch (err) {
    return false;
  }
}

// Cadastrar item refeição OPCIONAL
export async function cadastrarNovoItemRefeicaoOpcional(
  itemPrincipal: ItemRefeicaoTabela,
  formulario: FormularioItemRefeicao
) {

  try {
    const response = await fetch(
      `${API_BASE_URL}/item-refeicao-substituto/admin/cadastrar-substituto`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idItemPrincipal: itemPrincipal.id_item_refeicao,
          idAlimentoSubstituto: formulario.alimento_id,
          quantidadeGramas: formulario.quantidadeGramas,
          observacao: formulario.observacao
        }),
      }
    );

    if (!response.ok) {
      console.warn(
        "Não foi possível cadastrar o alimento substituto selecionado.",
        response.status
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error("Erro ao tentar cadastrar alimento substituto na refeição.")
    return false;
  }
}