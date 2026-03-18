"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Global from "../globals.module.css";
import Style from "./page.module.css"; // novo css só pra essa página

export default function DefinirSenha() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [novaSenhaConfirmar, setNovaSenhaConfirmar] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== novaSenhaConfirmar) {
      setMensagem("Senhas não conferem!")
      return
    }

    if (!token) {
      setMensagem("Token inválido ou expirado.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.nutrianaprado.com.br/auth/definir-senha?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ novaSenha }),
        }
      );

      if (resp.ok) {
        setMensagem("✅ Senha definida com sucesso! Você já pode fazer login.");
        setTimeout(() => router.push("/"), 2000);
      } else {
        const error = await resp.text();
        setMensagem("❌ Erro: " + error);
      }
    } catch (err) {
      setMensagem("⚠️ Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Global.body}>
      <div className={Global.container}>
        <h2 className={Style.titulo}>Definir Nova Senha</h2>

        <form onSubmit={handleSubmit} className={Style.formulario}>
          <label htmlFor="novaSenha" className={Style.label}>
            🔑 Digite sua nova senha:
          </label>
          <input
            id="novaSenha"
            type="password"
            placeholder="********"
            className={Style.input}
            value={novaSenha}
            onChange={(e) => {
              setNovaSenha(e.target.value);
              setMensagem("");
            }}
            minLength={8}
          />

          <label htmlFor="novaSenhaConfirmar" className={Style.label}>
            🔐 Digite novamente:
          </label>
          <input
            id="novaSenhaConfirmar"
            type="password"
            placeholder="********"
            className={Style.input}
            value={novaSenhaConfirmar}
            onChange={(e) => {
              setNovaSenhaConfirmar(e.target.value);
              setMensagem("");
            }}
            minLength={8}
          />

          <button
            type="submit"
            disabled={loading}
            className={Style.botao}
          >
            {loading ? "Enviando..." : "Confirmar"}
          </button>

          {mensagem && (
            <p
              className={`${Style.mensagem} ${mensagem.startsWith("✅")
                  ? Style.sucesso
                  : Style.erro
                }`}
            >
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
