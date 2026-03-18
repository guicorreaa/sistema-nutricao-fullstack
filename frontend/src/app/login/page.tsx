"use client";
import style from "./page.module.css";
import logo from "../images/logo.png";

import { useFormularioLogin } from "@/hooks/login/useFormularioLogin";
import { useEnviarLogin } from "@/hooks/login/useEnviarLogin";

export default function Home() {
  const { formularioLogin, alterarFormularioLogin } = useFormularioLogin();

  const {
    erroLogin,
    fazerLogin
  } = useEnviarLogin(formularioLogin);


  return (
    <div className={style.container_geral}>
      <div className={style.background}></div>

      <form className={style.loginCard} onSubmit={fazerLogin}>
        <img className={style.logo} src={logo.src} alt="Logo Ana Prado" />
        <h1 className={style.titulo}>
          Ana <span className={style.tituloSec}>Prado</span>
        </h1>

        <div className={style.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            className={style.inputField}
            id="email"
            value={formularioLogin.email}
            onChange={(e) => alterarFormularioLogin("email", e.target.value)}
            required
            type="email"
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            className={style.inputField}
            id="password"
            type="password"
            value={formularioLogin.senha}
            onChange={(e) => alterarFormularioLogin("senha", e.target.value)}
            required
          />
        </div>

        {erroLogin && <p className={style.mensagemErro}>{erroLogin}</p>}

        <button type="submit" className={style.botao_login}>
          Entrar
        </button>
      </form>
    </div>
  );
}
