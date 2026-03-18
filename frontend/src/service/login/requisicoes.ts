import { FormularioLogin } from "@/service/login/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  e: React.FormEvent,
  formularioLogin: FormularioLogin
): Promise<[Response, any] | undefined> => {
  e.preventDefault();

  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formularioLogin.email.toLocaleLowerCase(),
          senha: formularioLogin.senha,
        }),
      }
    );

    // Agora que está logado, chama /auth/me para pegar os dados do usuário
    const responseUser = await fetch(
      `${API_BASE_URL}/auth/me`,
      {
        method: "GET",
        credentials: "include", // manda o cookie de autenticação
      }
    );

    if (!responseUser.ok) {
      // aqui já trata direto e não deixa o navegador logar a URL
      console.warn("Falha ao obter dados do usuário", responseUser.status);
      return;
    }

    const userData = await responseUser.json();

    return [response, userData];
  } catch (error) {
    console.error("Erro ao tentar fazer o login.");
  }
};

export async function logout() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao fazer logout: ${response.status} - ${text}`);
    }

    const text = await response.text();

    window.location.href = "/login"; // 👈 redireciona pra página de login

    return text;
  } catch (err) {
    console.error(err);
    throw err; // propaga o erro pro componente tratar
  }
}
