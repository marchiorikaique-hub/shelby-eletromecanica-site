import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shelbyeletromecanica.com"),
  title: "Shelby Eletromecânica | Engenharia Elétrica em Caieiras",
  description: "Cabines primárias, subestações, média e baixa tensão, manutenção e plantão 24h em Caieiras e Grande São Paulo. Fale direto no WhatsApp.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0b0718" };

// O site é uma apresentação autocontida, pré-renderizada pro Pages.
export const dynamic = "force-static";

const CONTRATO = `<!--
THESIS: o site é um palco de energia: a caveira da Shelby sobe na luz como no site da Marchiotech; recusa a construtora cinza com cards de ícone.
OWN-WORLD: noite #0b0718 com roxo #5b12c9 em campos inteiros, claro #f1eef8 pra respirar, amarelo raio #ffe11a só em botão e faísca; pilares de luz, poeira, letreiro correndo, faixas de serviço com foto inclinada, vitrine arrastável; Archivo condensado.
STORY: o visitante vê obra real, entende média e baixa tensão de ponta a ponta e chama no WhatsApp.
FIRST VIEWPORT: palco escuro, caveira grande subindo com anel de luz, fotos reais girando ao lado, título curto à esquerda e botão amarelo Chamar no WhatsApp.
FORM: palco Marchiotech (pedido do Kaique, direção fixada pelo brief), paleta Acinzentado adaptada.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRATO }} />
        {children}
      </body>
    </html>
  );
}
