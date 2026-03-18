// ******************************** CLIENTE ********************************
// Como a consulta vem paginação, é necessário criar uma interface para a resposta da consulta, que inclui a lista de usuários e informações sobre a paginação.
export interface PaginaClienteDieta {
  content: DadosTabelaCliente[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

// interface para preencher tabela de cliente
export interface DadosTabelaCliente {
  clienteId: string;
  nome: string;
  email: string
}

// ******************************** DIETAS ********************************
// Preenche tabela dietas
export interface DadosDietas {
  dieta_id: string;
  cliente_id: string;
  nome_dieta: string;
  data_inicio: string;
  data_final: string;
}

// Cadastrar e atualizar dietas
export interface FormularioCadastrarDieta {
  dieta_nome: string;
  data_inicio: string;
  data_final: string;
}

// ******************************** REFEIÇÃO ********************************
// Preenche tabela Refeicao (ainda não trago o id da dieta, pois é só exibição)
export interface Refeicao {
  refeicao_id: string;
  descricao: string;
  horario: string;
  nome_dieta: string;
  observacao: string;
}

// Quando for editar ou visualizar ele traz todos os dados com id dessa vez
export interface RefeicaoCompleta {
  refeicao_id: string;
  horario: string;
  dieta_id: string;
  nome_dieta: string;
  tipo_refeicao: number;
  descricao: string;
  observacao: string;
}

// Cadastrar e atualizar Refeicao
export interface FormularioRefeicao {
  horario: string;
  dieta_id: string;
  tipo_refeicao: number;
  observacoes: string;
}

// ******************************** TIPO REFEIÇÃO ********************************
// Preencher combobox tipo refeição ex: Café da Manhã
export interface TipoRefeicao {
  tipo_id: number;
  descricao: string;
  ativo: boolean;
}

// Cadastrar e atualizar FormularioTipoRefeicao
export interface FormularioTipoRefeicao {
  descricao: string;
  ativo: boolean;
}

// ******************************** ITEM REFEIÇÃO ********************************
// Cadastrar item dentro da refeição
export interface FormularioItemRefeicao {
  refeicao_id: string;
  alimento_id: number;
  observacao: string;
  quantidadeGramas: number;
}

// Cadastrar item dentro da refeição
export interface FormularioItemRefeicaoOpcional {
  idItemPrincipal: string;
  idAlimentoSubstituto: number;
  quantidadeGramas: number;
  observacao: string
}

export interface ItemRefeicaoTabela {
  id_item_refeicao: string;
  refeicao_id: string;
  alimento_id: number;
  nome_alimento: string;
  energia_kcal: number;
  carboidrato: number;
  proteina: number;
  lipidios: number;
  quantidadeGramas: number;
  opcional: boolean;
  alimentoSubstituido: string;
}

// Usado apenas para calcular os totais e exibir na interface dos itens cadastrados
export interface TotaisMacros {
  kcal: number;
  carboidrato: number;
  proteina: number;
  lipidios: number;
}

// export interface ItemRefeicao {
//   id_item_refeicao: string;   // UUID
//   refeicao_id: string;       // UUID
//   alimento_id: number;       // INT
//   nome_alimento: string;
//   energia_kcal: number;
//   proteina: number;
//   carboidrato: number;
//   lipidios: number;
//   fibra_alimentar: number;
//   sodio: number;
//   potassio: number;
//   calcio: number;
//   ferro: number;
//   vitamina_c: number;
//   quantidadeGramas: number;  // NUMERIC(7,2)
// }

// ******************************** ALIMENTOS ********************************
// Tabela alimentos (somente dados importantes)
export interface TabelaAlimentos {
  alimento_id: number;
  nome_alimento: string;
  energia_kcal: number;
  carboidrato: number;
  proteina: number;
  lipidios: number;
}

// Foi criada essa interface para armazenar o pageable que vem do spring, ou seja, vai armazenar a totalPages, TotalElements, size...
export interface PageableAlimentos {
  content: TabelaAlimentos[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // página atual
}

// Cadastrar novo alimento
export interface FormularioAlimento {
  nome_alimento: string;     // obrigatório
  umidade: number;
  energia_kcal: number;
  energia_kj: number;
  proteina: number;
  lipidios: number;
  colesterol: number;
  carboidrato: number;
  fibra_alimentar: number;
  calcio: number;
  magnesio: number;
  manganes: number;
  fosforo: number;
  ferro: number;
  sodio: number;
  potassio: number;
  cobre: number;
  zinco: number;
  retinol: number;
  vitamina_a_re: number;
  vitamina_a_rae: number;
  tiamina: number;
  riboflavina: number;
  piridoxina: number;
  niacina: number;
  vitamina_c: number;
  categoria_id: number;      // obrigatório
  subcategoria_id: number;   // obrigatório
}

export interface AlimentoCompleto extends FormularioAlimento {
  alimento_id: number;
  descricaoCategoria: string; // O nome da categoria que você adicionou
  descricaoSubcategoria: string; // O nome da subcategoria
  ativo: boolean;
}

// ******************************** CATEGORIA ********************************
// Trazer dados da categoria
export interface Categoria {
  categoria_id: number;
  descricao: string;
  ativo: boolean;
}

export interface FormularioCategoria {
  categoria_id?: number;
  descricao: string;
  ativo: boolean;
}

// ******************************** SUBCATEGORIA ********************************
// Trazer dados da subcategoria
export interface Subcategoria {
  subcategoria_id: number;
  descricao: string;
  categoria_id: number;
  ativo: boolean;
}

export interface FormularioSubcategoria {
  subcategoria_id?: number;
  descricao: string;
  categoria_id: number;
  ativo: boolean;
}

