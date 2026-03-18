import { useState } from "react";

import { FormularioLogin } from "@/service/login/interfaces";

export function useFormularioLogin(){

  // FORMULARIO
  const FORMULARIO_LOGIN: FormularioLogin = {
    email: "",
    senha: "",
  };

  const [formularioLogin, setFormularioLogin] =
    useState<FormularioLogin>(FORMULARIO_LOGIN);

  const alterarFormularioLogin = <T extends keyof FormularioLogin>(
    campo: T,
    valor: FormularioLogin[T]
  ) => setFormularioLogin((prev) => ({ ...prev, [campo]: valor }));

    return {
        formularioLogin,
        alterarFormularioLogin
    }

}