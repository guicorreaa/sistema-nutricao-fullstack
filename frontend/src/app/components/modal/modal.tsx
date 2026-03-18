"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Style from "./modal.module.css";
import Global from "../../globals.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // BLOQUEIA O SCROLL QUANDO O MODAL ESTÁ ABERTO
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={Style.modal_overlay}>
      <div
        className={Style.modal_content}
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
      >
        {/* Botão fechar (X) */}
        <button className={Style.btn_close} onClick={onClose}>
          &times;
        </button>

        <h2 className={Global.titulo}>{title}</h2>

        <div className={Style.modal_body}>{children}</div>

        <div className={Style.modal_buttons}>
          {onConfirm && (
            <button onClick={onConfirm} className={Global.botaoPadrao}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
