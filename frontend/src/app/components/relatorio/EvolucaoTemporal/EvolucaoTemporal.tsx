import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";
import Style from "./EvolucaoTemporal.module.css";
import GraficosEvolucao from "../GraficosEvolucao/GraficosEvolucao";
import { Activity } from "lucide-react";

interface EvolucaoTemporalProps {
    data: RelatorioCompletoDTO
}

export default function EvolucaoTemporal({ data }: EvolucaoTemporalProps) {

    return (
        <section className={Style.section}>
            <h2 className={Style.sectionTitle}><Activity size={20} /> Evolução Temporal</h2>
            {data.historicoEvolucao?.length > 0 ? (
                <GraficosEvolucao data={data.historicoEvolucao} />
            ) : (
                <p className={Style.noData}>Ainda não há histórico suficiente para gerar gráficos.</p>
            )}
        </section>
    );
}