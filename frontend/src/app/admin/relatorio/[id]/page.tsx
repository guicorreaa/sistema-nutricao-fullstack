"use client";

import Style from "./page.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import useRelatorioData from "@/hooks/admin/relatorio/useRelatorioData";
import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";

import {
    Activity,
    Scale,
    Flame,
    User,
    Droplets,
    FileText,
    Calendar
} from "lucide-react";
import { RelatorioHeader } from "@/app/components/relatorio/RelatorioHeader/RelatorioHeader";
import CardsKpi from "@/app/components/relatorio/CardsKpi/CardsKpi";
import ComposicaoCorporal from "@/app/components/relatorio/ComposicaoCorporal/ComposicaoCorporal";
import EvolucaoTemporal from "@/app/components/relatorio/EvolucaoTemporal/EvolucaoTemporal";
import EstiloVida from "@/app/components/relatorio/EstiloVida/EstiloVida";
import SecaoClinica from "@/app/components/relatorio/SecaoClinica/SecaoClinica";
import RadarCorporal from "@/app/components/relatorio/RadarCorporal/RadarCorporal";
import RelacaoCinturaQuadril from "@/app/components/relatorio/RelacaoCinturaQuadril/RelacaoCinturaQuadril";
import DeficitSuperavit from "@/app/components/relatorio/DeficitSuperavit/DeficitSuperavit";

export default function Relatorios() {
    const { loading, userRole } = useAuthGuard("ROLE_ADMIN");

    const [deficit, setDeficit] = useState<number>(0);
    const [superavit, setSuperavit] = useState<number>(0);
    
    const params = useParams();
    const data = useRelatorioData();

    const calculos = useRelatorioCalculos({ 
        dados: data.dadosRelatorio,
        deficit,
        superavit
    });

    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        if (rawId) {
            data.setIdDadoTabelaPrincipal(rawId as string);
            data.carregarDadosParaRelatorio(rawId as string);
        }
    }, [rawId]);

    if (!data.dadosRelatorio) return <div className={Style.loading}>Carregando relatório...</div>;

    return (
        <div className={Style.container}>
            {/* CABEÇALHO */}
            <RelatorioHeader dados={data.dadosRelatorio} />

            {/* CARDS PRINCIPAIS (KPIs) */}
            <CardsKpi data={data.dadosRelatorio} calculos={calculos} />

            {/* CONTEÚDO PRINCIPAL (GRID 2 COLUNAS) */}
            <div className={Style.mainContent}>

                {/* COLUNA ESQUERDA */}
                <div className={Style.column}>
                    <ComposicaoCorporal data={data.dadosRelatorio} calculos={calculos} />

                    <EvolucaoTemporal data={data.dadosRelatorio} />

                    <RadarCorporal dados={data.dadosRelatorio} />
                </div>

                {/* COLUNA DIREITA */}
                <div className={Style.column}>
                    <EstiloVida data={data.dadosRelatorio} calculos={calculos} />

                    <RelacaoCinturaQuadril data={data.dadosRelatorio} calculos={calculos} />

                    <SecaoClinica data={data.dadosRelatorio} />

                    <div className={Style.observacoes}>
                        <h3><FileText size={16} /> Observações Clínicas</h3>
                        <p>{data.dadosRelatorio.observacoes || "Nenhuma observação registrada para este paciente."}</p>
                    </div>

                    <DeficitSuperavit calculo={calculos} setDeficit={setDeficit} setSuperavit={setSuperavit}/>
                </div>



            </div>
        </div>
    );
}