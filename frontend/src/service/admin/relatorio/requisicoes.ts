import { RelatorioCompletoDTO } from "./interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// usado para carregar todos os dados para geração dos relatórios
export default async function carregarDadosParaRelatorioCompleto(
    idDadoAntropTabelaPrincipal: string
): Promise<RelatorioCompletoDTO | undefined> {
    try {
        const res = await fetch(
            `${API_BASE_URL}/relatorios/admin/gerar-relatorio/${idDadoAntropTabelaPrincipal}`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        if (!res.ok) {
            console.warn("Não foi possível buscar os dados para o relatório!");
        }
        const resultado = await res.json();
        return resultado;
    }
    catch (error) {
        console.error("Erro ao buscar os dados para o relatório! ", error)
    }
}