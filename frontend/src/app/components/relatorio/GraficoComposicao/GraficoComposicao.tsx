import { 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import Styles from './GraficoComposicao.module.css';

interface GraficoProps {
  massaMagra: number;
  massaGorda: number;
}

export function GraficoComposicao({ massaMagra, massaGorda }: GraficoProps) {
  const total = Number(massaMagra) + Number(massaGorda);
  
  const data = [
    { name: 'Massa Magra', value: Number(massaMagra), color: '#10b981' },
    { name: 'Massa Gorda', value: Number(massaGorda), color: '#f43f5e' },
  ];

  return (
    <div className={Styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={75}
            outerRadius={95}
            paddingAngle={10}
            cornerRadius={12}
            dataKey="value"
            stroke="none"
            animationBegin={0}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Grupo de texto centralizado */}
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-4" className={Styles.labelTotal}>
              {total.toFixed(1)}kg
            </tspan>
            <tspan x="50%" dy="24" className={Styles.labelSub}>
              Total
            </tspan>
          </text>

          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'transparent' }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className={Styles.legendText}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Sub-componente de Tooltip para usar as classes do CSS Module
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={Styles.customTooltip}>
        <p className={Styles.tooltipLabel}>{payload[0].name}</p>
        <p className={Styles.tooltipValue}>{payload[0].value.toFixed(2)} kg</p>
      </div>
    );
  }
  return null;
};