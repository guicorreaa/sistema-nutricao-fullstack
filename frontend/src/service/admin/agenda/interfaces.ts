
export interface PaginaAgendamento {
  content: InformacoesTabelaAgendamento[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

// Dados tabela agendamento
export interface InformacoesTabelaAgendamento {
  consulta_id: string;
  nome: string;
  celular: string;
  telefone: string;
  email: string;
  data_consulta: string;
  horario_consulta: string;
  tipo_consulta: string;
  data_agendamento: string;
  cancelamento_cliente: boolean;
  observacoes_consulta: string;
}

// Variaveis do para agendar
export interface FormularioAgendamento {
  nome: string;
  email: string;
  celular: string;
  telefone: string;
  data_consulta: string;
  horario_consulta: string;
  tipo_consulta: string;
  cancelamento_cliente: boolean;
  observacoes_consulta: string;
}
