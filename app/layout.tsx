import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shelbyeletromecanica.com.br"),
  title: "Shelby Eletromecânica | Engenharia Elétrica em Caieiras",
  description: "Engenharia elétrica, eletromecânica, média tensão, manutenção e atendimento emergencial 24h em Caieiras e São Paulo.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
