import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shelbyeletromecanica.com.br"),
  title: "Shelby Eletromecânica | Engenharia Elétrica em Caieiras",
  description: "Engenharia elétrica, eletromecânica, média tensão, manutenção e atendimento emergencial 24h em Caieiras e São Paulo.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Shelby Eletromecânica | Energia em movimento",
    description: "Engenharia elétrica, eletromecânica e média tensão para operações que não podem parar.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1536, height: 910, alt: "Shelby Eletromecânica - Energia em movimento" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shelby Eletromecânica | Energia em movimento",
    description: "Engenharia elétrica, eletromecânica e média tensão.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
