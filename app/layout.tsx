import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://futureimoveisce.com.br"),
  title: "Lotes à venda em Paraipaba-CE | Future Imóveis",
  description:
    "Lotes disponíveis no Condomínio Marbello, próximo à Praia da Lagoinha, com financiamento direto e sem burocracia bancária.",
  openGraph: {
    title: "Seu lote na Praia da Lagoinha está disponível agora",
    description:
      "Conheça os lotes disponíveis no Condomínio Marbello e fale diretamente com um corretor.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2F3EF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const theme = localStorage.getItem("future-theme");
                if (theme === "light" || theme === "dark") {
                  document.documentElement.dataset.theme = theme;
                }
              } catch (_) {}
            })();`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
