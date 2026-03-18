export interface FatorAtividade {
    valor: number;
    descricao: string;
    chave: string;
}

export interface HistoricoCompletoAntropometricoDTO {
    dataAvaliacao: string;
    peso: number;
    circ_braco: number;
    circ_panturrilha: number;
    circ_cintura: number;
    circ_quadril: number;
    dobra_cutanea_triceps: number;
    dobra_cutanea_biceps: number;
    dobra_cutanea_escapular: number;
    dobra_cutanea_iliaca: number;
}

export interface RelatorioCompletoDTO {
    // Dados do cliente
    nome: string;
    dataNascimento: string; // Recebido como string formatada (dd/MM/yyyy)
    sexo: string;
    objetivoNutricional: string;
    idade: number;

    // Dados antropométricos
    dados_id: string; // UUID é tratado como string no TS
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
    ultima_alteracao: string; // LocalDateTime formatado como string

    peso: number;
    circ_braco: number;
    circ_panturrilha: number;
    circ_cintura: number;
    circ_quadril: number;
    dobra_cutanea_triceps: number;
    dobra_cutanea_biceps: number;
    dobra_cutanea_escapular: number;
    dobra_cutanea_iliaca: number;

    // Lista de histórico
    historicoEvolucao: HistoricoCompletoAntropometricoDTO[];
}

