// Como a consulta vem paginação, é necessário criar uma interface para a resposta da consulta, que inclui a lista de usuários e informações sobre a paginação.
export interface PaginaDadosAntropometricos {
  content: DadosAntropTabelaPrincipal[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}
export interface DadosAntropTabelaPrincipal {
  dadosID: string;
  nomeCliente: string;
  email: string;
}

// Como a consulta vem paginação, é necessário criar uma interface para a resposta da consulta, que inclui a lista de usuários e informações sobre a paginação.
// Interface para a resposta da consulta dos clientes sem dados antropométricos cadastrados
export interface PaginaTabelaClientes {
  content: TabelaClientes[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}
export interface TabelaClientes {
  clienteId: string;
  nome: string;
  email: string;
}

export interface FatorAtividade {
  valor: number;
  descricao: string;
  chave: string;
}

// usado para consultar/trazer os dados de uma pessoa especifica
export interface DadosAntropometricos {
  dieta_atual: string;
  observacoes: string;
  altura: number;
  peso: number;
  fuma: boolean;
  frequencia_fuma: string;
  consumo_agua_dia: number;
  antecedentes_familiar: string;
  precisa_acompanhamento_especial: boolean;
  tem_restricoes_alimentares: boolean;
  toma_medicamentos: boolean;
  circ_braco: number;
  circ_panturrilha: number;
  circ_cintura: number;
  circ_quadril: number;
  dobra_cutanea_triceps: number;
  dobra_cutanea_biceps: number;
  dobra_cutanea_escapular: number;
  dobra_cutanea_iliaca: number;
  fator_atividade_fisica: FatorAtividade;
}

export interface DadosAntropometricosFixos {
  dieta_atual: string;
  observacoes: string;
  altura: number;
  fuma: boolean;
  frequencia_fuma: string;
  consumo_agua_dia: number;
  antecedentes_familiar: string;
  precisa_acompanhamento_especial: boolean;
  tem_restricoes_alimentares: boolean;
  toma_medicamentos: boolean;
  fator_atividade_fisica: FatorAtividade;
}

export interface DadosAntropometricosVariaveis {
  peso: number;
  circ_braco: number;
  circ_panturrilha: number;
  circ_cintura: number;
  circ_quadril: number;
  dobra_cutanea_triceps: number;
  dobra_cutanea_biceps: number;
  dobra_cutanea_escapular: number;
  dobra_cutanea_iliaca: number;
  observacoes?: string;
}

// Interface para preencher comboBox com "fator atividade física"
export interface FatorAtividadeFisica {
  valor: number;
  descricao: string;
  chave: string;
}