"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from "recharts";
import styles from "./GraficosEvolucao.module.css";
import { HistoricoCompletoAntropometricoDTO } from "@/service/admin/relatorio/interfaces";

export default function GraficosEvolucao({ data }: { data: HistoricoCompletoAntropometricoDTO[] }) {
  
  const formatData = data.map(item => ({
    ...item,
    dataSimples: item.dataAvaliacao.split('/').slice(0, 2).join('/')
  }));

  return (
    <div className={styles.chartsGrid}>
      
      {/* GRÁFICO 1: PESO */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3>Evolução do Peso</h3>
        </div>
        
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={formatData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                vertical={false} 
                className={styles.gridLines} 
              />
              
              <XAxis 
                dataKey="dataSimples" 
                axisLine={false} 
                tickLine={false} 
                className={styles.axisTick}
                dy={10}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                className={styles.axisTick}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              
              <Tooltip content={<CustomTooltip unit="kg" />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
              
              <Area 
                type="monotone" 
                dataKey="peso" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPeso)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO 2: MEDIDAS */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3>Medidas Corporais</h3>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={formatData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} className={styles.gridLines} />
              
              <XAxis 
                dataKey="dataSimples" 
                axisLine={false} 
                tickLine={false} 
                className={styles.axisTick}
                dy={10} 
              />
              
              <YAxis axisLine={false} tickLine={false} className={styles.axisTick} />
              
              <Tooltip content={<CustomTooltip unit="cm" />} />
              
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle" 
                wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 'bold' }}
              />
              
              <Line 
                type="monotone" 
                dataKey="circCintura" 
                name="Cintura" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }} 
              />
              
              <Line 
                type="monotone" 
                dataKey="circQuadril" 
                name="Quadril" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipDate}>Avaliação: {label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className={styles.tooltipRow}>
            <div className={styles.dot} style={{ backgroundColor: entry.color }} />
            <span>{entry.value} {unit}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};