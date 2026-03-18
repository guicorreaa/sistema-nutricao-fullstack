import {
  DadosAntropTabelaPrincipal,
  DadosAntropometricos,
  DadosAntropometricosFixos,
  DadosAntropometricosVariaveis,
  FatorAtividadeFisica,
  PaginaDadosAntropometricos,
  PaginaTabelaClientes,
  TabelaClientes,
} from "@/service/admin/dadosAntropometricos/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// tabela princpal (apenas pessoas com dados antropométricos)
export async function carregarClientesComDados(
  campoBuscar: string = "",
  pagina: number,
  size: number = 20
): Promise<
  PaginaDadosAntropometricos | undefined
> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/dados/admin/obterdados?page=${pagina}&size=${size}&nomeEmail=${campoBuscar}`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn(
        "Erro ao buscar os dados antropométricos cadastrados.",
        res.status
      );
      return;
    }

    const resultado: PaginaDadosAntropometricos = await res.json();
    return resultado;

  } catch (error) {
    console.error(
      "Erro ao buscar os clientes com dados antropométricos cadastrados."
    );
  }
}

// tabela clientes para cadastro de dados antropométricos (apenas pessoas que ainda não tem dados antropométricos)
export async function carregarClientesSemDadosCadastrados(
  nomeEmail: string = "",
  page: number,
  size: number = 20
): Promise<PaginaTabelaClientes | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/cliente/admin/semDados?nomeEmail=${nomeEmail}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Falha ao buscar clientes:", res.status);
      return;
    }

    const clientes = await res.json();
    return clientes;
  } catch (error) {
    console.error("Erro ao buscar os clientes sem dados antropométricos.");
  }
}

export async function cadastrarDados(
  clienteSelecionadoTabelaCliente: string,
  formularioDadosAntropometricos: DadosAntropometricos
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dados/admin/criar/${clienteSelecionadoTabelaCliente}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          dieta_atual: formularioDadosAntropometricos.dieta_atual,
          observacoes: formularioDadosAntropometricos.observacoes,
          altura: formularioDadosAntropometricos.altura,
          peso: formularioDadosAntropometricos.peso,
          fuma: formularioDadosAntropometricos.fuma,
          frequencia_fuma: formularioDadosAntropometricos.frequencia_fuma,
          consumo_agua_dia: formularioDadosAntropometricos.consumo_agua_dia,
          antecedentes_familiar:
            formularioDadosAntropometricos.antecedentes_familiar,
          precisa_acompanhamento_especial:
            formularioDadosAntropometricos.precisa_acompanhamento_especial,
          tem_restricoes_alimentares:
            formularioDadosAntropometricos.tem_restricoes_alimentares,
          toma_medicamentos: formularioDadosAntropometricos.toma_medicamentos,
          circ_braco: formularioDadosAntropometricos.circ_braco,
          circ_panturrilha: formularioDadosAntropometricos.circ_panturrilha,
          circ_cintura: formularioDadosAntropometricos.circ_cintura,
          circ_quadril: formularioDadosAntropometricos.circ_quadril,
          dobra_cutanea_triceps:
            formularioDadosAntropometricos.dobra_cutanea_triceps,
          dobra_cutanea_biceps:
            formularioDadosAntropometricos.dobra_cutanea_biceps,
          dobra_cutanea_escapular:
            formularioDadosAntropometricos.dobra_cutanea_escapular,
          dobra_cutanea_iliaca:
            formularioDadosAntropometricos.dobra_cutanea_iliaca,
          fator_atividade_fisica:
            formularioDadosAntropometricos.fator_atividade_fisica.chave,
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao cadastrar dados antropométricos", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar dados antropométricos!.");
    return false;
  }
}

export async function atualizarDados(
  dadoSelecionadoId: string,
  formularioDadosAntropometricos: DadosAntropometricosFixos
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dados/admin/atualizar/${dadoSelecionadoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formularioDadosAntropometricos,
          fator_atividade_fisica: formularioDadosAntropometricos.fator_atividade_fisica.chave
        }),
      }
    );

    if (!response.ok) {
      console.warn("Não foi possível atualizar dados antropométricos", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar dados antropométricos!.");
    return false;
  }
}

// trazer os dados de uma pessoa especifica para editar suas informações
export async function pegarDadosClienteEspecifico(
  idClienteSelecionadoTabelaPrincipal: string
): Promise<DadosAntropometricos | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/dados/admin/obterdados/${idClienteSelecionadoTabelaPrincipal}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn(
        "Erro ao buscar os dados antropométricos de pessoa selecionada.",
        res.status
      );
      return;
    }

    const dados = await res.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar os dados antropométricos.");
  }
}

// Função para excluir um cliente
export async function excluirDados(
  dadoSelecionado: String
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dados/admin/${dadoSelecionado}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Erro ao deletar dado antropométrico!", response.status);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Não foi possível deletar o dado antropométrico!");
    return false;
  }
}

export async function cadastrarDadoAntropometricoVariavel(
  idClienteSelecionadoTabelaPrincipal: string,
  formularioDadosAntropometricosVariavel: DadosAntropometricosVariaveis
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/antropometria/admin/criar/${idClienteSelecionadoTabelaPrincipal}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          peso: formularioDadosAntropometricosVariavel.peso,
          circBraco: formularioDadosAntropometricosVariavel.circ_braco,
          circPanturrilha: formularioDadosAntropometricosVariavel.circ_panturrilha,
          circCintura: formularioDadosAntropometricosVariavel.circ_cintura,
          circQuadril: formularioDadosAntropometricosVariavel.circ_quadril,
          dobraCutaneaTriceps: formularioDadosAntropometricosVariavel.dobra_cutanea_triceps,
          dobraCutaneaBiceps: formularioDadosAntropometricosVariavel.dobra_cutanea_biceps,
          dobraCutaneaEscapular: formularioDadosAntropometricosVariavel.dobra_cutanea_escapular,
          dobraCutaneaIliaca: formularioDadosAntropometricosVariavel.dobra_cutanea_iliaca,
          observacoes: formularioDadosAntropometricosVariavel.observacoes
        }),
      }
    );

    if (!response.ok) {
      console.warn("Erro ao cadastrar dados antropométricos variaveis", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar dados antropométricos variaveis!.");
    return false;
  }
}

// Carregar dados fator atividade
export async function carregarFatorAtividade(): Promise<FatorAtividadeFisica[] | undefined> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/dados/admin/fatores-atividade`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.warn(
        "Não foi possível buscar os fatores de atividade!",
        res.status
      );
    }
    const dados = await res.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar os dados fatores de atividade!.");
  }
}