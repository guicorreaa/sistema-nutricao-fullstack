import { Activity, Droplets, Flame } from "lucide-react";
import Style from "./EstiloVida.module.css";
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";
import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";

interface EstiloVidaProps {
    data: RelatorioCompletoDTO
    calculos: ReturnType<typeof useRelatorioCalculos>
}

export default function EstiloVida({ data, calculos }: EstiloVidaProps) {

    return (
        <section className={Style.section}>
            <h2 className={Style.sectionTitle}><Activity size={20} /> Estilo de Vida & Saúde</h2>
            <div className={Style.infoGrid}>
                <div className={Style.infoBox}>
                    <Droplets size={18} className={Style.iconBlue} />
                    <div>
                        <label>Hidratação</label>
                        <p>{data.consumo_agua_dia}L / Meta: {calculos.hidratacao?.ideal}</p>
                    </div>
                </div>
                <div className={Style.infoBox}>
                    <Flame size={18} className={Style.iconOrange} />
                    <div>
                        <label>Atividade Física</label>
                        <p>{data.fator_atividade_fisica?.descricao}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}