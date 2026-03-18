import Style from "./CampoSelecionarDieta.module.css"
import Global from "@/app/globals.module.css";
import { useDietaStore } from "@/hooks/admin/dieta/clienteDieta/useDietaStore";

import { DadosDietas } from "@/service/admin/dieta/interfaces";

interface SelecionarDietaProps {
  onClick: (valor: DadosDietas) => void;
  title: string
}

export default function SelecionarDieta({ onClick, title }: SelecionarDietaProps) {

    const todasDietas = useDietaStore((state) => state.todasDietas);

    return (
        <div className={Style.body}>
              <p className={Global.subtitulo}>
                {title}
              </p>

              <div className={Style.listaDietas}>
                {todasDietas?.map((dieta) => (
                  <button
                    key={dieta.dieta_id}
                    onClick={() => {onClick(dieta)}}
                    className={Style.botaoPossuiDietas}
                  >
                    {dieta.nome_dieta}
                  </button>
                ))}
              </div>
            </div>
    );
}