import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { getSiteContent } from "@/lib/content";
import { TrackingManager } from "@/components/tracking/tracking-manager";
import { TrackingScripts } from "@/components/tracking/tracking-scripts";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    metadataBase: new URL(content.settings.domain),
    title: content.settings.seoTitle,
    description: content.settings.seoDescription,
    icons: {
      icon: {
        url: "/brand/future-logo.svg",
        type: "image/svg+xml",
      },
      shortcut: "/brand/future-logo.svg",
    },
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { tracking } = await getSiteContent();
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
        <TrackingScripts settings={tracking} />
        <TrackingManager />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
