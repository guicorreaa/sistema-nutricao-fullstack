"use client";

import { useConfirmar } from "@/app/context/confirmar/ConfirmarContext";
import styles from "./confirmar.module.css";

export default function ConfirmarModal() {
  const { visivel, mensagem, confirmar, cancelar } = useConfirmar();

  if (!visivel) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.caixa}>
        <p>{mensagem}</p>

        <div className={styles.botoes}>
          <button className={styles.confirmar} onClick={confirmar}>
            Confirmar
          </button>

          <button className={styles.cancelar} onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
