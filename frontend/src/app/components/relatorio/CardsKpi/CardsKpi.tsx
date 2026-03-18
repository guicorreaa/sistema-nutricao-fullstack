import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";
import Style from "./CardsKpi.module.css";
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces"

interface CardsProps {
    data: RelatorioCompletoDTO;
    calculos: ReturnType<typeof useRelatorioCalculos>;
}

export default function CardsKpi({ data, calculos }: CardsProps) {

    return (
        <div className={Style.gridKpi}>
            <div className={`${Style.cardKpi} ${Style['bg_' + calculos.getStatusMetaPeso.id]}`}>
                <span className={Style.kpiLabel}>Peso Atual</span>
                <strong className={Style.kpiValue}>{data?.peso} kg</strong>
                <span className={Style.kpiSub}>Ideal: {calculos.pesoIdeal} kg</span>
            </div>
            <div className={`${Style.cardKpi} ${Style['bg_' + calculos.statusPeso.id.toLowerCase()]}`}>
                <span className={Style.kpiLabel}>IMC</span>
                <strong className={Style.kpiValue}>{calculos.resultadoIMC}</strong>
                <span className={`${Style.kpiStatus} ${Style[calculos.statusPeso.id.toLowerCase()]}`}>
                    {calculos.statusPeso.label}
                </span>
            </div>
            <div className={Style.cardKpi}>
                <span className={Style.kpiLabel}>Massa Magra</span>
                <strong className={Style.kpiValue}>{calculos.composicao.massaMagra}</strong>
                <span className={Style.kpiSub}>{calculos.composicao.percentualMassaMagra}</span>
            </div>
            <div className={Style.cardKpi}>
                <span className={Style.kpiLabel}>GASTO ENERGÉTICO BASAL</span>
                <strong className={Style.kpiValue}>{calculos.calorias.basal}</strong>
                <span className={Style.kpiSub}>Basal</span>
            </div>
            <div className={Style.cardKpi}>
                <span className={Style.kpiLabel}>Gasto Diário (GET)</span>
                <strong className={Style.kpiValue}>{calculos.calorias.total}</strong>
                <span className={Style.kpiSub}>Diário</span>
            </div>
        </div>
    )
}