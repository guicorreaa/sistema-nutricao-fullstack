import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";
import carregarDadosParaRelatorioCompleto from "@/service/admin/relatorio/requisicoes";
import { useEffect, useState } from "react";

export default function useRelatorioData() {

    // Usado para armazenar os dados recebidos da requisições e gerar o relatório
    const [dadosRelatorio, setDadosRelatorio] = useState<RelatorioCompletoDTO | null>(null);

    // Usado somente para armazenar o id do dado antropométrico selecionado na tabela principal
    const [idDadoTabelaPrincipal, setIdDadoTabelaPrincipal] = useState<string>("");

    async function carregarDadosParaRelatorio(
        idDadoTabelaPrincipal: string
    ) {
        const resposta = await carregarDadosParaRelatorioCompleto(idDadoTabelaPrincipal);
        if (!resposta) { return ; }
        setDadosRelatorio(resposta);
    }

    return {
        dadosRelatorio,
        idDadoTabelaPrincipal, 
        setIdDadoTabelaPrincipal,
        carregarDadosParaRelatorio
    };
}