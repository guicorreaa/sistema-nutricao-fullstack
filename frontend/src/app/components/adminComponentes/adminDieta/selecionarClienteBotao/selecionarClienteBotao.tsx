import { useDietaUiStore } from "@/hooks/admin/dieta/clienteDieta/useDietaUiStore";
import Style from "./selecionarClienteBotao.module.css";

export default function SelecionarCliente() {

  const setCampoEscolherCliente = useDietaUiStore((state) => state.setCampoEscolherCliente);

  return (
    <>
      <div className={Style.divSelecionarCliente}>
        <div
          className={`${Style.card} ${Style.selecionarCliente}`}
          onClick={() => {
            setCampoEscolherCliente(true);
          }}
        >
          <h2>Selecionar cliente</h2>
          <p>Selecione o cliente que deseja.</p>
        </div>
      </div>
    </>
  );
}
