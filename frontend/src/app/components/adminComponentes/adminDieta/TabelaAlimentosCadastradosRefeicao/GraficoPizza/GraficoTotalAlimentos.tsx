"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Style from "./GraficoTotalAlimentos.module.css";

interface Props {
  kcal: number;
  carboidrato: number;
  proteina: number;
  lipidios: number;
}

const CORES = ["#34d399", "#60a5fa", "#fb923c"];

export function GraficoPizzaMacros({ kcal, carboidrato, proteina, lipidios }: Props) {
  const totalGramas = carboidrato + proteina + lipidios;

  const data = [
    { name: "Carboidratos", value: carboidrato },
    { name: "Proteínas", value: proteina },
    { name: "Lipídios", value: lipidios },
  ];

  return (
    <div className={Style.containerGrafico}>
      <p className={Style.titulo}>Composição Nutricional</p>

      <div className={Style.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CORES[index % CORES.length]} 
                  stroke="none"
                  style={{ outline: 'none' }}
                />
              ))}
            </Pie>

            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
              }}
              // ✅ Solução definitiva para o erro de Type
              formatter={(value: any) => {
                const val = parseFloat(value ?? 0);
                return [`${val.toFixed(1)}g`, "Quantidade"];
              }}
            />
            
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              formatter={(value: string, entry: any) => {
                const peso = entry.payload?.value ?? 0;
                const percent = totalGramas > 0 ? ((peso / totalGramas) * 100).toFixed(0) : 0;
                return <span className={Style.legendText}>{value} ({percent}%)</span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className={Style.centerText}>
          <span className={Style.centerLabel}>Total</span>
          <strong className={Style.centerValue}>{kcal.toFixed(2)}</strong>
          <span className={Style.centerUnit}>kcal</span>
        </div>
      </div>
    </div>
  );
}