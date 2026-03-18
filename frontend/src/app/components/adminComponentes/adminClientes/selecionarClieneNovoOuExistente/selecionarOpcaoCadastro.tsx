
"use client";

import Global from "@/app/globals.module.css";
import Style from "./selecionarOpcaoCadastro.module.css";
import { useRouter } from "next/navigation";
import useClienteUi from "@/hooks/admin/cliente/useClienteUi";
import { useClienteUiStore } from "@/hooks/admin/cliente/useClienteUiStore";

export default function OpcoesCadastro() {

  const router = useRouter();

  const setCampoOpcoesParaCadastrarCliente = useClienteUiStore((state) => state.setCampoOpcoesParaCadastrarCliente);
  const setCampoSelecionarUsuarioParaNovoCadastroCliente = useClienteUiStore((state) => state.setCampoSelecionarUsuarioParaNovoCadastroCliente);

  function handleUsuarioJaCadastrado() {
    setCampoOpcoesParaCadastrarCliente(false);
    setCampoSelecionarUsuarioParaNovoCadastroCliente(true);
  }

  return (
    <>
      <h3 className={`${Global.tituloInformativo}`}>Cadastrar usuário</h3>
      <p className={`${Global.subtitulo} ${Style.subtituloCampoOpcao}`}>
        Escolha uma das opções para cadastrar o cliente:
      </p>
      <div className={Style.campoEscolherFormaCadastro}>
        <button
          onClick={handleUsuarioJaCadastrado}
        >
          Usuario já cadastrado
        </button>
        <button
          onClick={() => {
            router.push("/admin/usuarios?modoCadastro=true");
          }}
        >
          Cadastrar novo usuario
        </button>
      </div>
    </>
  )

}

