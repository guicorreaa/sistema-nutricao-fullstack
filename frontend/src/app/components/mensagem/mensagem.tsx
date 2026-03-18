"use client";

import Style from "./mensagem.module.css";
import { useMessage } from "@/app/context/mensagem/MensagemContext";
import Image from "next/image";

import ImagemErro from "../../images/erro.png";
import ImagemSucesso from "../../images/sucesso.png";

export default function ModalMensagem() {
  const mensagem = useMessage();

  if (!mensagem.visivel) return null;

  return (
    <div className={Style.overlay} onClick={mensagem.fechar}>
      <div
        className={Style.modal}
        onClick={(e) => e.stopPropagation()} // impede fechar clicando dentro
      >
        {mensagem.tipo === "success" && (
          <Image
            className={Style.imagem}
            src={ImagemSucesso}
            alt="Sucesso"
          />
        )}

        {mensagem.tipo === "error" && (
          <Image
            className={Style.imagem}
            src={ImagemErro}
            alt="Erro"
          />
        )}
        <p className={Style.texto}>{mensagem.mensagem}</p>
        <button className={Style.botao} onClick={mensagem.fechar}>
          Fechar
        </button>
      </div>
    </div>
  );
}
