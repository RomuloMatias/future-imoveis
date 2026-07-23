import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    metadataBase: new URL(content.settings.domain),
    title: content.settings.seoTitle,
    description: content.settings.seoDescription,
    openGraph: {
      title: content.hero.heading.replaceAll("*", ""),
      description: content.settings.seoDescription,
      locale: "pt_BR",
      type: "website",
    },
  };
}

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
