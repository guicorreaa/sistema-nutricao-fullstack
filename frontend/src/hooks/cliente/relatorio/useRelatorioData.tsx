import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";
import { obterDadosParaRelatorio } from "@/service/clientes/relatorio/requisicoes";
import { useCallback, useEffect, useState } from "react";


export default function useRelatorioData() {

    // Dados completos para preencher o relatório do cliente
    const [dadosCliente, setDadosCliente] = useState<RelatorioCompletoDTO | null>(null);

    // Ao carregar a pagina preencher os dados do relatório do cliente
    const preencherDados = useCallback(async () => {
        const resposta = await obterDadosParaRelatorio();
        if (resposta) {
            setDadosCliente(resposta);
        }
    }, [])

    useEffect(() => {
        preencherDados();
    }, [preencherDados])

    return {
        dadosCliente,
        setDadosCliente
    };
}