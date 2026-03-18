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
  cancelText?: string;
  acao?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  cancelText = "Cancelar",
  acao = "geral"
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Bloqueia scroll ao abrir o modal
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={Style.modal_overlay}>
      <div
        className={Style.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar (X) */}
        <button className={Style.btn_close} onClick={onClose}>
          &times;
        </button>

        <h2 className={Global.titulo}>{title}</h2>

        <div className={Style.modal_body}>{children}</div>

      </div>
    </div>,
    document.body
  );
}
