"use client";

import { createContext, useContext, useState } from "react";

type TipoMensagem = "success" | "error";

type MessageContextType = {
  visivel: boolean;
  mensagem: string;
  tipo: TipoMensagem;
  mostrarSucesso: (valor: string) => void;
  mostrarErro: (valor: string) => void;
  fechar: () => void;
};

const MessageContext = createContext<MessageContextType>(null!);

export function MensagemProvider({ children }: { children: React.ReactNode }) {
  const [visivel, setVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState<TipoMensagem>("success");

  function mostrarSucesso(msg: string) {
    setMensagem(msg);
    setTipo("success");
    setVisivel(true);
  }

  function mostrarErro(msg: string) {
    setMensagem(msg);
    setTipo("error");
    setVisivel(true);
  }

  function fechar() {
    setVisivel(false);
  }

  return (
    <MessageContext.Provider
      value={{ visivel, mensagem, tipo, mostrarSucesso, mostrarErro, fechar }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
