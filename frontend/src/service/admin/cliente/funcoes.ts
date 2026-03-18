// exibir o dia formatado
export function formatarData(dataString: string) {
  const data = new Date(dataString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarDataEnviarFormulario(dataString: string) {
  if (!dataString) return "";

  // O input type="date" retorna "YYYY-MM-DD"
  const [ano, mes, dia] = dataString.split("-");

  // Retorna exatamente no formato que o seu @JsonFormat espera
  return `${dia}/${mes}/${ano}`;
}

// Usado para converter o formato que vem do banco "dd/MM/yyyy" e converter para o formato que o input aceita
export function converterParaFormatoInput(data: any) {
  if (!data || typeof data !== 'string') return "";

  // Se a data já estiver no formato AAAA-MM-DD (ISO), retorna ela mesma
  // O regex abaixo verifica se começa com 4 números e tem traços
  if (/^\d{4}-\d{2}-\d{2}/.test(data)) {
    return data.substring(0, 10); // Garante que pega apenas YYYY-MM-DD
  }

  // Se a data estiver no formato brasileiro DD/MM/AAAA
  if (data.includes('/')) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  return data; // Retorna o que sobrou caso não caia nos casos acima
}

// Função para mudar de M e F para Masculino ou Feminino
export function mudarCharSexo(clienteSexo: string) {
  if (clienteSexo.toLocaleUpperCase() == "M") {
    return "Masculino";
  } else if (clienteSexo.toLocaleUpperCase() == "F") {
    return "Feminino";
  }
  return "Erro"
}
