import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Carregar os dados para o relatório do cliente
export async function obterDadosParaRelatorio(): Promise<RelatorioCompletoDTO | undefined> {
    try {
        const res = await fetch(
            `${API_BASE_URL}/relatorios/`,
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
