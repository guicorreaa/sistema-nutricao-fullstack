"use client";

import { createContext, useContext, useState } from "react";

interface PropsConfirmar {
  perguntar: (mensagem: string) => Promise<boolean>;
  visivel: boolean;
  mensagem: string;
  confirmar: () => void;
  cancelar: () => void;
}

const ContextConfirmar = createContext<PropsConfirmar>(null!);

export function ConfirmarProvider({ children }: { children: React.ReactNode }) {
  const [visivel, setVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [resolver, setResolver] = useState<(v: boolean) => void>();

  function perguntar(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      setMensagem(msg);
      setVisivel(true);
      setResolver(() => resolve);
    });
  }

  function confirmar() {
    resolver?.(true);
    setVisivel(false);
  }

  function cancelar() {
    resolver?.(false);
    setVisivel(false);
  }

  return (
    <ContextConfirmar.Provider
      value={{ perguntar, visivel, mensagem, confirmar, cancelar }}
    >
      {children}
    </ContextConfirmar.Provider>
  );
}

export function useConfirmar() {
  return useContext(ContextConfirmar);
}
