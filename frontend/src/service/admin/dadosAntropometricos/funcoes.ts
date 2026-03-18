// exibir o dia formatado
export function formatarData(dataString: string) {
  const data = new Date(dataString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Usado para ao invés de exibir o objeto que vem do fator atividade, mostra a string na comboBox
export const normalizarParaEnum = (campo: any): string => {
  // 1. Se não veio nada, retorna vazio
  if (!campo) return "";

  // 2. Se o campo for um OBJETO (que é o seu caso), pegamos a descrição dele
  let textoParaProcessar = "";

  if (typeof campo === 'object') {
    textoParaProcessar = campo.descricao || "";
  } else {
    textoParaProcessar = String(campo);
  }

  // 3. Agora sim, aplicamos as transformações no texto
  return textoParaProcessar
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
};