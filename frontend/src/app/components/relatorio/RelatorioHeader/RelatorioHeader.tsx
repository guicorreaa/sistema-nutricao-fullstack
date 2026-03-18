import { User, Calendar } from "lucide-react";
import Style from "./RelatorioHeader.module.css"; // Você pode mover o CSS específico
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

interface HeaderProps {
    dados: RelatorioCompletoDTO
}

export function RelatorioHeader({
    dados
}: HeaderProps) {
    return (
        <header className={Style.header}>
            <div className={Style.profile}>
                <div className={Style.avatar}><User size={40} /></div>
                <div>
                    <h1>{dados.nome}</h1>
                    <p><Calendar size={14} /> {dados.idade} anos • {dados.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                </div>
            </div>
            <div className={Style.meta}>
                <span className={Style.badge}>{dados.objetivoNutricional}</span>
                <p className={Style.update}>Última atualização: {dados.ultima_alteracao}</p>
            </div>
        </header>
    );
}