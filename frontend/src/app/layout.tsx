import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Global from "./globals.module.css";

import "./global.css";

import { MensagemProvider } from "./context/mensagem/MensagemContext";
import { ConfirmarProvider } from "@/app/context/confirmar/ConfirmarContext";
import ModalMensagem from "@/app/components/mensagem/mensagem";


import ConfirmarModal from "@/app/components/campoConfirmar/Confirmar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nutri Ana Prado",
  description: "Site de nutrição de Ana Gabriela Prado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${Global.htmlBody}`}
      >
        <ConfirmarProvider>
          <MensagemProvider>
            {children}
            <ModalMensagem />
          </MensagemProvider>
          <ConfirmarModal />
        </ConfirmarProvider>
      </body>
    </html>
  );
}
