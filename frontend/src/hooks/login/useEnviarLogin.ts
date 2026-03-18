import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormularioLogin } from "@/service/login/interfaces";
import { login } from "@/service/login/requisicoes";

export function useEnviarLogin(formularioLogin: FormularioLogin) {
  const router = useRouter();
  const [erroLogin, setErroLogin] = useState("");

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();
    try {

      const resultado = await login(e, formularioLogin);

      if (!resultado) {
        setErroLogin("Usuário ou senha inválidos");
        return;
      }

      const [resposta, userData] = resultado;

      if (!userData) {
        // aqui já trata direto e não deixa o navegador logar a URL
        console.warn("Falha ao obter dados do usuário");
        return;
      }

      // Agora redireciona conforme a role
      if (userData.role === "ROLE_ADMIN") {
        window.location.href = "/admin/usuarios";
      } else if (userData.role === "ROLE_CLIENTE") {
        window.location.href = "/cliente/relatorio";
      } else {
        router.push("/");
      }
    } catch (error) {
      setErroLogin("Erro ao tentar fazer o login.");
    }
  }

  return {
    erroLogin,
    fazerLogin
  };
}
