import { FileText } from "lucide-react";
import Style from "./SecaoClinica.module.css"
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

interface SecaoClinicaProps {
    data: RelatorioCompletoDTO
}

export default function SecaoClinica({ data }: SecaoClinicaProps) {

    return (
        <section className={Style.section}>
            <h2 className={Style.sectionTitle}><FileText size={20} /> Perfil Clínico</h2>
            <div className={Style.clinicGrid}>
                <div className={`${Style.statusItem} ${data.tem_restricoes_alimentares ? Style.danger : Style.safe}`}>
                    <span>Restrições</span>
                    <strong>{data.tem_restricoes_alimentares ? "Sim" : "Não"}</strong>
                </div>
                <div className={`${Style.statusItem} ${data.toma_medicamentos ? Style.warning : Style.safe}`}>
                    <span>Medicamentos</span>
                    <strong>{data.toma_medicamentos ? "Sim" : "Não"}</strong>
                </div>
            </div>
            <div className={Style.antecedentes}>
                <label>Antecedentes Familiares:</label>
                <p>{data.antecedentes_familiar || "Nenhum histórico informado."}</p>
            </div>
        </section>
    );
}