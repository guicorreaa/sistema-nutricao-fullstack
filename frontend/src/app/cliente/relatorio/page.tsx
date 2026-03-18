"use client";

import Style from "./page.module.css";
import { useAuthGuard } from "@/hooks/useAuthGuard";

import {
    FileText,
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

import Nav from "@/app/components/navigation/nav";

import useRelatorioData from "@/hooks/cliente/relatorio/useRelatorioData";
import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";
import { useState } from "react";

export default function Relatorio() {
    const { loading, userRole } = useAuthGuard("ROLE_CLIENTE");

    const [deficit, setDeficit] = useState<number>(0);
    const [superavit, setSuperavit] = useState<number>(0);

    const data = useRelatorioData();
    const calculos = useRelatorioCalculos({
        dados: data.dadosCliente,
        deficit,
        superavit
    });

    if (!data.dadosCliente) return <div className={Style.loading}>Carregando relatório...</div>;

    return (
        <>
            <Nav />

            <div className={Style.container}>
                {/* CABEÇALHO */}
                <RelatorioHeader dados={data.dadosCliente} />

                {/* CARDS PRINCIPAIS (KPIs) */}
                <CardsKpi data={data.dadosCliente} calculos={calculos} />

                {/* CONTEÚDO PRINCIPAL (GRID 2 COLUNAS) */}
                <div className={Style.mainContent}>

                    {/* COLUNA ESQUERDA */}
                    <div className={Style.column}>
                        <ComposicaoCorporal data={data.dadosCliente} calculos={calculos} />

                        <EvolucaoTemporal data={data.dadosCliente} />

                        <RadarCorporal dados={data.dadosCliente} />
                    </div>

                    {/* COLUNA DIREITA */}
                    <div className={Style.column}>
                        <EstiloVida data={data.dadosCliente} calculos={calculos} />

                        <RelacaoCinturaQuadril data={data.dadosCliente} calculos={calculos} />

                        <SecaoClinica data={data.dadosCliente} />

                        <div className={Style.observacoes}>
                            <h3><FileText size={16} /> Observações Clínicas</h3>
                            <p>{data.dadosCliente.observacoes || "Nenhuma observação registrada para este paciente."}</p>
                        </div>

                        <DeficitSuperavit calculo={calculos} setDeficit={setDeficit} setSuperavit={setSuperavit} />
                    </div>



                </div>
            </div>
        </>
    );
}