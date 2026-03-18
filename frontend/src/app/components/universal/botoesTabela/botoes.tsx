"use client"

import Style from "./botoes.module.css";



interface botoesProps<T> {
  item: T,
  cadastrar: () => void;
  editar: () => void;
  excluir?: () => void;
  novaAvaliacao?: () => void;
  campo: "normal" | "antropometria";
}

export default function Botoes<T>({
  item,
  cadastrar,
  editar,
  excluir,
  novaAvaliacao,
  campo
}: botoesProps<T>) {

  return (
    <div className={Style.botaoMenu}>
      {item && (
        <>
          <button
            onClick={editar}
          >
            Editar cadastro
          </button>

          {campo === "antropometria" && (
            <button
              onClick={novaAvaliacao}
            >
              Nova avaliação
            </button>
          )}

          {campo === "normal" && (
            <button
              onClick={excluir}
            >
              Excluir
            </button>
          )}
        </>
      )}

      <button
        onClick={cadastrar}
      >
        Cadastrar
      </button>
    </div>
  )
}