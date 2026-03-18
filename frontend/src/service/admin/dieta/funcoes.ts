import { ItemRefeicaoTabela, TotaisMacros } from "./interfaces";

export function formatarDataParaBackend(data: string) {
  const date = new Date(data);

  const dataFormatada = date.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const horaFormatada = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${dataFormatada} ${horaFormatada}`;
}

export function converterParaDatetimeLocal(dataString: string | undefined) {
  if (!dataString) return "";

  // Ex: 26/12/2026 12:05:00
  const partes = dataString.split(" ");

  const data = partes[0];
  const hora = partes[1] ?? "00:00:00"; // se não tiver hora, coloca 00:00

  const [dia, mes, ano] = data.split("/");

  // Remove segundos se existirem
  const horaSemSegundos = hora.substring(0, 5); // "12:05"

  return `${ano}-${mes}-${dia}T${horaSemSegundos}`;
}

// Calcular dentro da refeição os totais (Grafico Pizza)
export function calcularTotaisMacros(itens: ItemRefeicaoTabela[]): TotaisMacros {
  return itens.reduce(
    (acc: TotaisMacros, alimento) => {
      const fator = alimento.quantidadeGramas / 100;

      acc.kcal += alimento.energia_kcal * fator;
      acc.carboidrato += alimento.carboidrato * fator;
      acc.proteina += alimento.proteina * fator;
      acc.lipidios += alimento.lipidios * fator;

      return acc;
    },
    { kcal: 0, carboidrato: 0, proteina: 0, lipidios: 0 } // valor inicial
  );
}

// Calcular por refeição na tabela (Tabela Total)
export function calcularTotaisPorRefeicao(
  refeicaoId: string,
  itens: ItemRefeicaoTabela[]
) {
  const itensDaRefeicao = itens.filter(
    (i) => i.refeicao_id === refeicaoId
  );

  return calcularTotaisMacros(itensDaRefeicao);
}

// Calcular por refeição na tabela (Tabela alimentos cadastrados)
export function calcularMacrosPorQuantidade(alimento: ItemRefeicaoTabela) {
  const fator = alimento.quantidadeGramas / 100;

  return {
    energia: alimento.energia_kcal * fator,
    carboidrato: alimento.carboidrato * fator,
    proteina: alimento.proteina * fator,
    lipidios: alimento.lipidios * fator,
  };
}