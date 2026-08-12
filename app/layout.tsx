import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shelbyeletromecanica.com"),
  title: "Shelby Eletromecânica | Engenharia Elétrica em Caieiras",
  description: "Engenharia elétrica, eletromecânica, média tensão, manutenção e atendimento emergencial 24h em Caieiras e São Paulo.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

// The site is a self-contained presentation and can be pre-rendered for Pages.
export const dynamic = "force-static";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
