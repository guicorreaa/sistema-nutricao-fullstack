export function calcularImc(peso?: number, altura?: number): number | null {
  if (!peso || !altura) {
    return null;
  }

  const alturaEmMetros = altura >= 3 ? altura / 100 : altura;

  return peso / alturaEmMetros ** 2;
}

export function somaDasDobras(
  dobra_cutanea_triceps?: number,
  dobra_cutanea_biceps?: number,
  dobra_cutanea_escapular?: number,
  dobra_cutanea_iliaca?: number
): number | null {
  if (
    dobra_cutanea_triceps == null ||
    dobra_cutanea_biceps == null ||
    dobra_cutanea_escapular == null ||
    dobra_cutanea_iliaca == null
  ) {
    return null;
  }
  return (
    dobra_cutanea_triceps +
    dobra_cutanea_biceps +
    dobra_cutanea_escapular +
    dobra_cutanea_iliaca
  );
}

// Densidade Corporal (DC)
export function densidadeCorporal(
  resultadoSomaDasDobras?: number | null,
  sexo?: string,
  idade?: number
): number | null {
  if (resultadoSomaDasDobras == null || sexo == null || idade == null) {
    return null;
  }

  const log10 = Math.log10(resultadoSomaDasDobras);

  const sexoNormalizado = sexo.toUpperCase();

  if (sexoNormalizado === "M") {
    return 1.1765 - 0.0744 * log10;
  } else if (sexoNormalizado === "F") {
    return 1.1567 - 0.0717 * log10;
  }
  return null;
}

export function percentualMassaGorda(
  peso?: number | null | undefined,
  densidadeCorporal?: number | null | undefined
): number | null {
  if (
    peso == null ||
    densidadeCorporal == null ||
    peso <= 0 ||
    densidadeCorporal < 0 ||
    densidadeCorporal > 100
  ) {
    return null;
  }
  return (4.95 / densidadeCorporal - 4.5) * 100;
}

export function percentualMassaMagra(
  percentualMassaGorda?: number | null
): number | null {
  if (percentualMassaGorda == null) {
    return null;
  }
  return 100 - percentualMassaGorda;
}

export function massaGordaKg(
  peso?: number,
  percentualMassaGorda?: number | null
): number | null {
  if (peso == null || peso == 0 || percentualMassaGorda == null) {
    return null;
  }

  return (percentualMassaGorda * peso) / 100;
}

export function massaMagraKg(
  peso?: number | null | undefined,
  resultadoMassaGordaKg?: number | null
): number | null {
  if (
    peso == null ||
    resultadoMassaGordaKg == null ||
    peso <= 0 ||
    resultadoMassaGordaKg < 0
  ) {
    return null;
  }
  return peso - resultadoMassaGordaKg;
}

export function gastoEnergeticoBasal(
  sexo?: string,
  peso?: number,
  altura?: number,
  idade?: number | null
): number | null {
  if (peso == null || altura == null || idade == null || sexo == null) {
    return null;
  }

  // Se a altura for menor que 3, assumimos que está em metros (ex: 1.75) e convertemos para cm
  const alturaAjustada = altura < 3 ? altura * 100 : altura;

  if (sexo.toLocaleUpperCase() === "M") {
    // Harris-Benedict para Homens
    return 66.47 + (13.8 * peso) + (5 * alturaAjustada) - (6.76 * idade);
  } else {
    // Harris-Benedict para Mulheres
    return 655.1 + (9.56 * peso) + (1.85 * alturaAjustada) - (4.68 * idade);
  }
}

// arrumado
export function gastoEnergeticoTotal(
  gastoEnergeticoBasal?: number | null,
  fatorAtividadeFisica?: number
): number | null {
  if (gastoEnergeticoBasal == null || fatorAtividadeFisica == null) {
    return null;
  }

  return gastoEnergeticoBasal * fatorAtividadeFisica;
}

// PESO IDEAL PERCENTIL
const imcPercentil50: Record<string, number> = {
  "6": 14.54,
  "7": 15.07,
  "8": 15.62,
  "9": 16.17,
  "10": 16.72,
  "11": 17.28,
  "12": 17.87,
  "13": 18.53,
  "14": 19.22,
  "15": 19.92,
  "16": 20.63,
  "17": 21.12,
  "18": 21.45,
  "19": 21.86,
  "20-24": 23.07,
  "25-29": 24.19,
  "30-34": 24.90,
  "35-39": 25.25,
  "40-44": 25.49,
  "45-49": 25.55,
  "50-54": 25.54,
  "55-59": 25.51,
  "60-64": 25.47,
  "65-69": 25.41,
  "70-74": 25.33,
};

/**
 * Calcula o Peso Ideal baseado no Percentil 50 da tabela de IMC por idade.
 */
export function pesoIdeal(altura?: number, idade?: number): number | null {
  // Validações iniciais
  if (!altura || altura <= 0 || !idade) return null;

  // Normaliza altura (caso venha em cm ex: 175 vira 1.75)
  const alturaEmMetros = altura >= 3 ? altura / 100 : altura;
  const potenciaAltura = alturaEmMetros ** 2;

  let chaveIdade = "";

  // Lógica para encontrar a chave exata ou a faixa (ex: 22 -> "20-24")
  if (idade >= 6 && idade <= 19) {
    chaveIdade = Math.floor(idade).toString();
  } else if (idade >= 20 && idade <= 74) {
    const base = Math.floor(idade / 5) * 5;
    const teto = base + 4;
    chaveIdade = `${base}-${teto}`;
  } else {
    // Caso a idade esteja fora do range da tabela (ex: idoso > 74 ou bebê < 6)
    return null;
  }

  const imcReferencia = imcPercentil50[chaveIdade];

  // Retorna o cálculo final ou null se a chave não existir na tabela
  return imcReferencia ? Number((potenciaAltura * imcReferencia).toFixed(2)) : null;
}

// Uma função auxiliar simples para o status
export function getDescricaoIMC(imc: number) {
  if (imc < 16) return { label: 'Magreza Grau III', id: 'magreza3' };
  if (imc < 17) return { label: 'Magreza Grau II', id: 'magreza2' };
  if (imc < 18.5) return { label: 'Magreza Grau I', id: 'magreza1' };
  if (imc < 25) return { label: 'Eutrofia', id: 'eutrofia' };
  if (imc < 30) return { label: 'Sobrepeso', id: 'sobrepeso' };
  if (imc < 35) return { label: 'Obesidade Grau I', id: 'obesidade1' };
  if (imc < 40) return { label: 'Obesidade Grau II', id: 'obesidade2' };

  return { label: 'Obesidade Grau III', id: 'obesidade3' };
}

export function getStatusMetaPeso(pesoAtual: number, pesoIdeal: number): { label: string, id: string } {
  // 1. Diferença percentual
  const diferencaPercentual = ((pesoAtual - pesoIdeal) / pesoIdeal) * 100;

  // 2. Se o peso atual é menor ou muito próximo do ideal (margem de 1%)
  if (pesoAtual <= pesoIdeal * 1.01) {
    return { label: "Peso Ideal", id: "peso_ideal" };
  }
  // 3. Se estiver mais de 20% acima do peso ideal, é considerado "Muito Acima" 
  // (critério comum para obesidade em relação ao peso metra)
  if (diferencaPercentual > 20) {
    return { label: "Muito Acima da Meta", id: "peso_muito_acima" };
  }

  // 4. Caso contrário, apenas acima
  return { label: "Acima da Meta", id: "peso_acima" };
}

// service/calculosRelatorio.ts
export function calcularMetaDeficit(get: number, deficitManual: number): number {
    if (!get || get <= 0) return 0;
    return get - (deficitManual || 0);
}

export function calcularMetaSuperavit(get: number, superavitManual: number): number {
    if (!get || get <= 0) return 0;
    return get + (superavitManual || 0);
}