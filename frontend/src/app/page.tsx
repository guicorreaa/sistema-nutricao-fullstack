"use client";

import { useEffect, useState } from "react";
import Style from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

import LogoInstagram from "./images/instagram.ico";
import LogoWhatsapp from "./images/wpp.svg";
import LogoEmail from "./images/email.svg";
import ImagemAnaHistoria from "./images/historiaAna.jpg";

import LogoNav from "./images/logoPaginaPrincipal.png";

export default function NutricaoPage() {
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll suave ao clicar no link
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 100; // altura do header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActive(id);
      setMenuOpen(false); // fecha menu mobile
    }
  };

  // Scroll spy para marcar link ativo
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sec = section as HTMLElement;
        const sectionTop = sec.offsetTop;
        const sectionBottom = sectionTop + sec.offsetHeight;

        const scrollMiddle = scrollY + viewportHeight / 2;

        if (scrollMiddle >= sectionTop && scrollMiddle < sectionBottom) {
          current = sec.id;
        }
      });

      if (current) setActive(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // roda no carregamento
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <div id="app-nutri" className={Style.appNutri}>
      {/* CABEÇALHO / NAVEGAÇÃO */}
      <header className={Style.header}>
        <div className={Style.container}>
          <nav className={Style.navbar}>
            {/* <a className={Style.logo}>
              <i className="logo-icon fas fa-leaf"></i> ANA PRADO
            </a> */}
            <Image src={LogoNav} alt="Logo Ana Nutrição" className={Style.logo}></Image>

            {/* Botão do menu hambúrguer */}
            <div
              className={`${Style.hamburger} ${menuOpen ? Style.activeHamburger : ""
                }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div
              className={`${Style.navLinks} ${menuOpen ? Style.showNav : ""}`}
            >
              <a
                onClick={() => handleScroll("inicio")}
                className={active === "inicio" ? Style.active : ""}
              >
                INÍCIO
              </a>
              <a
                onClick={() => handleScroll("historia")}
                className={active === "historia" ? Style.active : ""}
              >
                MINHA HISTÓRIA
              </a>
              {/* <a
                onClick={() => handleScroll("depoimentos")}
                className={active === "depoimentos" ? Style.active : ""}
              >
                DEPOIMENTOS
              </a> */}
              <a
                onClick={() => handleScroll("duvidas")}
                className={active === "duvidas" ? Style.active : ""}
              >
                DÚVIDAS
              </a>
              <a
                onClick={() => handleScroll("contato")}
                className={active === "contato" ? Style.active : ""}
              >
                CONTATO
              </a>
              <Link href={"/login"}>LOGIN</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* SEÇÃO HERO (Banner Principal) */}
      <section id="inicio" className={Style.hero}>
        <div className={Style.containerBanner}>
          <div className={Style.heroContent}>
            <h1>Vida saudável começa com escolhas inteligentes</h1>
            <p>Planejamento alimentar para resultados reais.</p>
            <a href="#contato" className={Style.btnCta}>
              AGENDE SUA CONSULTA
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO MINHA HISTÓRIA */}
      <section id="historia" className={`${Style.section} ${Style.historia}`}>
        <div className={Style.container}>
          <h2 className={Style.h2}>MINHA HISTÓRIA</h2>
          <div className={Style.historiaContent}>
            <div className={Style.historiaImg}>
              {/* Troque <img> pelo componente <Image> do Next.js para otimização */}
              <Image
                src={ImagemAnaHistoria}
                alt="Ana Gabriela, Nutricionista">
              </Image>

            </div>
            <div className={Style.historiaText}>
              <h3>Ana Gabriela, Nutricionista</h3>
              <p>
                Olá, meu nome é Ana Gabriela do Prado, e sou nutricionista. A
                minha grande paixão é mostrar às pessoas como a alimentação pode
                transformar as suas vidas. Quero guiar você rumo ao bem-estar,
                simplificando o mundo das dietas e incentivando um estilo de
                vida que seja saudável, duradouro e, acima de tudo, que traga
                alegria.
              </p>
              <p>
                Com diploma em Nutrição, penso que comer é o caminho para ter o
                que você quer na saúde: melhorar no esporte, emagrecer como
                sonha ou ter uma vida melhor, sem complicação e podendo
                acompanhar seus dados constantemente pelo nosso{" "}
                <Link className={Style.link} href={"/login"}>
                  site
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      {/* <section id="depoimentos" className={Style.section}>
        <div className={Style.container}>
          <h2 className={Style.h2}>DEPOIMENTOS</h2>
          <div className={Style.depoimentosGrid}>
            <div className={Style.depoimentoCard}>
              <p>
                "Com a Ana, consegui emagrecer sem sofrer com dietas malucas!"
              </p>
              <span>- Juliana M.</span>
            </div>
            <div className={Style.depoimentoCard}>
              <p>"Aprendi a me alimentar de forma saudável e divertida."</p>
              <span>- Lucas S.</span>
            </div>
            <div className={Style.depoimentoCard}>
              <p>
                "Super recomendo! Atendimento personalizado e resultados reais."
              </p>
              <span>- Mariana P.</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Duvidas frequentes */}
      <section id="duvidas">
        <div className={Style.container}>
          <h2 className={Style.h2}>DÚVIDAS FREQUENTES</h2>
          <div className={Style.content}>
            <div className={Style.minhaConsultaText}>
              <h3>Sobre a consulta</h3>
              <p>
                Para marcar sua consulta, entre em contato comigo através do
                nosso{" "}
                <Link className={Style.link} href={"/login"}>
                  canal de atendimento
                </Link>
                . Assim que receber sua mensagem, te envio todos os detalhes e
                os horários disponíveis para que possamos agendar sua consulta
                com tranquilidade. 💖
              </p>

              <h3>Qual a duração de cada consulta?</h3>
              <p>
                Cada sessão dura em média entre 45 e 60 minutos, mas isso pode
                variar dependendo da avaliação e das necessidades individuais.
              </p>

              <h3>Com que frequência devo fazer as consultas?</h3>
              <p>
                A frequência varia conforme seu objetivo, mas normalmente sugiro
                consultas a cada 15 ou 30 dias para acompanhar resultados e
                fazer ajustes no plano alimentar.
              </p>

              <h3>Posso cancelar ou reagendar uma consulta?</h3>
              <p>
                Sim! Apenas peço que me avise com antecedência para que possamos
                reorganizar o horário sem problemas.
              </p>
            </div>
            <div className={Style.imagemMinhaConsulta}>
              <img
                src="https://picsum.photos/250/250?random=8"
                alt="Minha foto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className={`${Style.section} ${Style.contato}`}>
        <div className={Style.container}>
          <h2>Contato</h2>

          <div className={Style.contentContato}>
            <div className={Style.contatoWpp}>
              <h3>WhatsApp</h3>
              <p>Entre em contato pelo WhatsApp:</p>
              {/* Exemplo de botão/link */}
              <a
                href="https://wa.me/19981388250"
                target="_blank"
                rel="noopener noreferrer"
                className={Style.btnContato}
              >
                Falar no WhatsApp
              </a>
            </div>

            <div className={Style.contatoEmail}>
              <h3>📨 E-mail</h3>
              <p>Prefere mandar um e-mail? Fique à vontade:</p>
              <a
                className={`${Style.btnContato} ${Style.btnEmail}`}
                href="https://docs.google.com/forms/d/e/1FAIpQLScQ83C9nqOTcGrZBYbt1yg_svXB_HYu9O1Xbhi4ygcEtsZDBw/viewform?usp=header" // substitui pelo link do teu formulário
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className={Style.footer}>
        <div className={Style.containerFooter}>
          <div className={Style.instagram}>
            <div className={Style.minhaRedeSocial}>
              <h3>MINHA</h3>
              <h3>REDE SÓCIAL</h3>
            </div>
            <a href="https://www.instagram.com/anaprado_nutrii?igsh=MXFoeDU5eXliODNhYw==">
              <Image
                src={LogoInstagram}
                alt="Logo instagram"
                className={Style.logoInstagram}
              ></Image>
              @anaprado_nutrii
            </a>
          </div>

          <div className={Style.br}></div>

          <div className={Style.contatoFooter}>
            <h3>CONTATO</h3>
            <div>
              <Image
                src={LogoWhatsapp}
                alt="Logo Whatsapp"
                className={Style.logoWpp}
              ></Image>{" "}
              <a
                href="https://wa.me/19981388250"
                target="_blank"
                rel="noopener noreferrer"
                className={Style.numero}
              >
                (19) 99650-5240
              </a>
            </div>
            <div>
              <Image
                src={LogoEmail}
                alt="Logo E-mail"
                className={Style.logoEmail}
              ></Image>{" "}
              <p> anapradonutricionista@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>

      {/* RODAPÉ SECUNDARIO */}
      <footer className={Style.footerCreditos}>
        <div className={Style.container}>
          <p>
            © 2026 <span>Ana Gabriela do Prado Faria</span>. Todos os direitos reservados.
          </p>
          <p>
            <a href="https://www.freepik.com" target="_blank" rel="noopener" className={Style.Freepik}>Imagens por Freepik</a> | Desenvolvido por <span>Guilherme Corrêa</span>
          </p>

        </div>
      </footer>
    </div>
  );
}
