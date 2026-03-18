"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Activity, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"; 
import styles from "./RelacaoCinturaQuadril.module.css";
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";

interface Props {
  data: RelatorioCompletoDTO;
  calculos: {
    saudeCardiovascular: {
      rcq: string | number;
      risco: string; // Espera: "Risco Baixo", "Risco Moderado" ou "Risco Alto"
    };
  };
}

export default function AnaliseMetabolica({ data, calculos }: Props) {
  // Processamento do histórico para o gráfico
  const chartData = data.historicoEvolucao?.map(h => ({
    rcq: (Number(h.circ_cintura) / Number(h.circ_quadril)) || 0
  })) || [];

  const rcqValue = calculos.saudeCardiovascular.rcq || "0.00";
  const riscoStatus = calculos.saudeCardiovascular.risco;

  // Definição dinâmica de cores e ícones baseada no risco (Padrão 2026)
  const getStatusConfig = () => {
    switch (riscoStatus) {
      case "Risco Alto":
        return { 
          color: "#f43f5e", 
          icon: <AlertCircle size={20} />, 
          label: "Risco Alto",
          className: styles.borderRisk 
        };
      case "Risco Moderado":
        return { 
          color: "#f59e0b", 
          icon: <AlertTriangle size={20} />, 
          label: "Moderado",
          className: styles.borderModerate // Adicione esta classe no seu CSS se desejar
        };
      default:
        return { 
          color: "#10b981", 
          icon: <CheckCircle2 size={20} />, 
          label: "Saudável",
          className: styles.borderSafe 
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${styles.miniCard} ${config.className}`}>
      <div className={styles.content}>
        {/* Ícone com fundo sutil na cor do status */}
        <div 
          className={styles.iconWrapper} 
          style={{ backgroundColor: `${config.color}15`, color: config.color }}
        >
          {config.icon}
        </div>
        
        <div className={styles.info}>
          <span className={styles.label}>RCQ (Cintura/Quadril)</span>
          <div className={styles.valueGroup}>
            <span className={styles.value}>{rcqValue}</span>
            <span className={styles.statusText} style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* Mini gráfico de fundo (Sparkline) */}
      <div className={styles.sparkline}>
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={chartData}>
            <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} hide />
            <Line 
              type="monotone" 
              dataKey="rcq" 
              stroke={config.color} 
              strokeWidth={2} 
              dot={false} 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}