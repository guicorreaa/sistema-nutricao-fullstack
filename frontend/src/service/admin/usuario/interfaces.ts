// Como a consulta vem paginação, é necessário criar uma interface para a resposta da consulta, que inclui a lista de usuários e informações sobre a paginação.
export interface PaginaUsuarios {
  content: Usuarios[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

export interface Usuarios {
  usuario_id: string;
  email: string;
  nome: string;
  ativo: boolean;
  data_criacao: string;
  telefone: string;
}

export interface FormularioUsuario {
  email: string;
  ativo: boolean;
  telefone: string;
}