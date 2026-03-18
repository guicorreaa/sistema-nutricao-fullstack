import Style from "./DeficitSuperavit.module.css";
import useRelatorioCalculos from "@/hooks/admin/relatorio/useRelatorioCalculos";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface DeficitSuperavitProps {
  calculo: ReturnType<typeof useRelatorioCalculos>;
  setDeficit: (valor: number) => void;
  setSuperavit: (valor: number) => void;
}

export default function DeficitSuperavit({
  calculo,
  setDeficit,
  setSuperavit
}: DeficitSuperavitProps) {

  const [localDeficit, setLocalDeficit] = useState<string>("");
  const [localSuperavit, setLocalSuperavit] = useState<string>("");

  // Debounce: Só envia para o PAI após o usuário parar de digitar por 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDeficit(Number(localDeficit));
    }, 300);
    return () => clearTimeout(handler);
  }, [localDeficit, setDeficit]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSuperavit(Number(localSuperavit));
    }, 300);
    return () => clearTimeout(handler);
  }, [localSuperavit, setSuperavit]);

  return (
    <div className={Style.card}>
      {/* 1. EXIBIÇÃO DOS RESULTADOS (Destaque em cima) */}
      <div className={Style.displayResults}>
        <div className={`${Style.resultBadge} ${Style.deficitBadge}`}>
          <div className={Style.iconArea}>
            <ArrowDownCircle size={20} />
            <span>Meta Déficit</span>
          </div>
          <div className={Style.valueArea}>
            <strong>{calculo.deficitCalorico.toFixed(2)}</strong>
            <small>kcal/dia</small>
          </div>
        </div>

        <div className={`${Style.resultBadge} ${Style.superavitBadge}`}>
          <div className={Style.iconArea}>
            <ArrowUpCircle size={20} />
            <span>Meta Superávit</span>
          </div>
          <div className={Style.valueArea}>
            <strong>{calculo.superavitCalorico.toFixed(2)}</strong>
            <small>kcal/dia</small>
          </div>
        </div>
      </div>

      <hr className={Style.divider} />

      {/* 2. CAMPOS DE ENTRADA */}
      <div className={Style.inputGrid}>
        <div className={Style.field}>
          <label>Ajuste de Déficit</label>
          <input
            type="number"
            placeholder="Ex: 500"
            onChange={(e) => setLocalDeficit(e.target.value)}
          />
        </div>

        <div className={Style.field}>
          <label>Ajuste de Superávit</label>
          <input
            type="number"
            placeholder="Ex: 300"
            onChange={(e) => setLocalSuperavit(e.target.value)}
          />
        </div>
      </div>

      <p className={Style.baseInfo}>
        Baseado no Gasto Total de <strong>{calculo.calorias.total}</strong>
      </p>
    </div>
  );
}