export interface PaginaClientes {
  content: DadosTabelaCliente[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

// interface tabela principal clientes
export interface DadosTabelaCliente {
  clienteId: string;
  nome: string;
  dataNascimento: string;
  sexo: string;
  nivelAtividadeFisica: string;
  objetivoNutricional: string;
  ultimaAlteracao: string;
}

// interface para preencher tabela de usuarios ao cadastrar
export interface Usuarios {
  usuario_id: string;
  email: string;
  nome: string;
  ativo: boolean;
  data_criacao: string;
  telefone: string;
}

export interface FormularioCadastrarCliente {
    nome: string;
    dataNascimento: string;
    sexo: string;
    nivelAtividadeFisica: string;
    objetivoNutricional: string;
}