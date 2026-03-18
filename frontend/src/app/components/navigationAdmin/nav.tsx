import { useState } from "react";
import Style from "../navigationAdmin/nav.module.css";
import logo from "../../images/logo.png";
import Link from "next/link";
import { logout } from "@/service/login/requisicoes";

export default function NavAdmin() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <nav className={Style.nav}>
      {/* <Link className={Style.linkLogo} href="/perfil">
        <img className={Style.logo} src={logo.src} alt="Logo" />
      </Link> */}

      <button className={Style.hamburger} onClick={toggleMenu}>
        {menuAberto ? "✖" : "☰"}
      </button>

      <div
        className={`${Style.containerGeral} ${
          menuAberto ? Style.mostrarMenu : ""
        }`}
      >
        <ul className={Style.lista}>
          <li>
            <Link className={Style.links} href="/admin/agenda">
              <span className={Style.linkIcon}>📖</span>
              <span>Agendamentos</span>
            </Link>
          </li>
          <li>
            <Link className={Style.links} href="/admin/usuarios">
              <span className={Style.linkIcon}>👤</span>
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link className={Style.links} href="/admin/cliente">
              <span className={Style.linkIcon}>🥼</span>
              <span>Cliente</span>
            </Link>
          </li>
          <li>
            <Link className={Style.links} href="/admin/dadosAntropometricos">
              <span className={Style.linkIcon}>📊</span>
              <span>Dados Antropométricos</span>
            </Link>
          </li>
          <li>
            <Link className={Style.links} href="/admin/dieta">
              <span className={Style.linkIcon}>🥗</span>
              <span>Dieta</span>
            </Link>
          </li>
          <li>
            <button className={`${Style.links} ${Style.button}`} onClick={logout}>
              <span className={Style.linkIcon}>🚪</span>
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
