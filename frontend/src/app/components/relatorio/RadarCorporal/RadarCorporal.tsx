import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { RelatorioCompletoDTO } from "@/service/admin/relatorio/interfaces";
import Style from './RadarCorporal.module.css';

interface RadarProps {
  dados: RelatorioCompletoDTO;
}

export default function RadarCorporal({ dados }: RadarProps) {
  // 1. Transformamos os dados da API no formato que o Recharts entende
  const data = [
    { subject: 'Braço', A: dados?.circ_braco || 0, fullMark: 50 },
    { subject: 'Cintura', A: dados?.circ_cintura || 0, fullMark: 120 },
    { subject: 'Quadril', A: dados?.circ_quadril || 0, fullMark: 120 },
    { subject: 'Panturrilha', A: dados?.circ_panturrilha || 0, fullMark: 50 },
  ];

  if (!dados) return <div className={Style.loading}>Aguardando dados...</div>;

  return (
    <div className={Style.containerRadar}>
      <h3 className={Style.titulo}>Proporções Corporais (cm)</h3>
      <div className={Style.wrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} 
            />
            {/* Escondemos o eixo radial para o gráfico ficar mais limpo */}
            <PolarRadiusAxis domain={[0, 150]} tick={false} axisLine={false} />
            
            <Radar
              name="Medidas"
              dataKey="A"
              stroke="#3b82f6"      /* Azul mais forte para a linha */
              fill="#3b82f6"        /* Azul pastel para o preenchimento */
              fillOpacity={0.3}     /* Transparência suave */
            />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className={Style.legenda}>Análise visual de simetria e medidas periféricas vs. centrais.</p>
    </div>
  );
}