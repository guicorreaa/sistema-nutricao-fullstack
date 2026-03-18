import { useState, ReactNode } from "react";
import styles from "./InputComTooltip.module.css";

interface TooltipProps {
  content: ReactNode; // texto ou JSX que aparece no balão
  children: ReactNode; // elemento que mostra o tooltip quando hover/click/focus
  position?: "top" | "bottom"; // posição do balão (pode expandir depois)
}

export default function Tooltip({
  content,
  children,
  position = "bottom",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={styles.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0} // para ser focável pelo teclado
      onClick={() => setVisible(!visible)} // para click em mobile
      role="button"
      aria-describedby="tooltip"
    >
      {children}
      {visible && (
        <div
          className={`${styles.tooltip} ${styles[position]}`}
          role="tooltip"
          id="tooltip"
        >
          {content}
        </div>
      )}
    </span>
  );
}
