import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";
import { GraficoComposicao } from "../GraficoComposicao/GraficoComposicao";
import Style from "./ComposicaoCorporal.module.css";
import { Scale } from "lucide-react";
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

interface ComposicaoCorporalProps {
    data: RelatorioCompletoDTO
    calculos: ReturnType<typeof useRelatorioCalculos>;
}

export default function ComposicaoCorporal({ data, calculos }: ComposicaoCorporalProps) {

    return (
        <section className={Style.section}>
            <h2 className={Style.sectionTitle}><Scale size={20} /> Composição Corporal</h2>
            <div className={Style.dataList}>
                <div className={Style.dataItem}>
                    <span>Gordura Corporal (kg)</span>
                    <strong>{calculos.composicao.massaGorda}</strong>
                </div>
                <div className={Style.dataItem}>
                    <span>Percentual de Gordura</span>
                    <strong>{calculos.composicao.percentualGordura}</strong>
                </div>
                <div className={Style.dataItem}>
                    <span>Percentual de Massa Magra</span>
                    <strong>{calculos.composicao.percentualMassaMagra}</strong>
                </div>
                <div className={Style.dataItem}>
                    <span>Massa Gorda (Kg)</span>
                    <strong>{calculos.composicao.massaGorda}</strong>
                </div>
                <div className={Style.dataItem}>
                    <span>Soma das Dobras</span>
                    <strong>{calculos.composicao.somaDobras}</strong>
                </div>
                <div className={Style.dataItem}>
                    <span>Densidade Corporal (g/mL)</span>
                    <strong>{calculos.densidadeCorporal}</strong>
                </div>
            </div>

            <div className={Style.chartWrapper}>
                <GraficoComposicao
                    massaMagra={parseFloat(calculos.composicao.massaMagra.replace(',', '.'))}
                    massaGorda={parseFloat(calculos.composicao.massaGorda.replace(',', '.'))}
                />
            </div>

            <h2 className={Style.sectionTitle}>Dobras cutâneas</h2>
            <div className={Style.dobrasGrid}>
                <div className={Style.dobraBox}><span>Dobra cutânea tríceps</span> <strong>{data.dobra_cutanea_triceps} mm</strong></div>
                <div className={Style.dobraBox}><span>Dobra cutânea bíceps</span> <strong>{data.dobra_cutanea_biceps} mm</strong></div>
                <div className={Style.dobraBox}><span>Dobra cutânea escapular</span> <strong>{data.dobra_cutanea_escapular} mm</strong></div>
                <div className={Style.dobraBox}><span>Dobra cutânea ilíaca</span> <strong>{data.dobra_cutanea_iliaca} mm</strong></div>
            </div>

            <h2 className={Style.sectionTitle}>Circunferências</h2>
            <div className={Style.dobrasGrid}>
                <div className={Style.dobraBox}><span>Circunferência braço</span> <strong>{data.circ_braco} cm</strong></div>
                <div className={Style.dobraBox}><span>Circunferência cintura</span> <strong>{data.circ_cintura} cm</strong></div>
                <div className={Style.dobraBox}><span>Circunferência panturrilha</span> <strong>{data.circ_panturrilha} cm</strong></div>
                <div className={Style.dobraBox}><span>Circunferência quadril</span> <strong>{data.circ_quadril} cm</strong></div>
            </div>
        </section>
    )
}