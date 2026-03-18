import { useState } from "react";
import StyleNav from "../navigation/nav.module.css";
import logo from "../../images/logo.png";
import Link from "next/link";
import { logout } from "@/service/login/requisicoes";

export default function Nav() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className={StyleNav.nav}>
      <div className={StyleNav.logoContainer}>
        <Link href="/perfil">
          <img src={logo.src} alt="Logo" className={StyleNav.logo} />
        </Link>
      </div>

      {/* Hamburger customizado que vira um X via CSS se você quiser, 
          ou apenas o botão funcional atual */}
      <button
        className={StyleNav.hamburger}
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay para fechar o menu ao clicar fora no mobile */}
      {menuAberto && <div className={StyleNav.overlay} onClick={() => setMenuAberto(false)} />}

      <div className={`${StyleNav.menu} ${menuAberto ? StyleNav.menuAtivo : ""}`}>
        <ul>         
          <li>
            <Link href="/cliente/relatorio" onClick={() => setMenuAberto(false)}>
              <span>📊</span> Relatório
            </Link>
          </li>
          <li>
            <Link href="/cliente/dieta" onClick={() => setMenuAberto(false)}>
              <span>🍋</span> Dieta
            </Link>
          </li>
          <li>
            <button className={StyleNav.linkButton} onClick={logout}>
              <span className={StyleNav.linkIcon}>🚪</span>
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}