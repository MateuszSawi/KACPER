import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ViewTransition } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { Engine } from "@/components/motion/Engine";
import { businessLd, JsonLd, personLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { ostrzezOPrzykladach, saPrzyklady } from "@/lib/przyklady";
import "@/styles/globals.scss";

// Fonty są pobierane przy buildzie i serwowane z naszej domeny (self-host).
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

ostrzezOPrzykladach();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Terapia manualna Rumia - ${site.nazwa}`,
    template: `%s - ${site.nazwa}`,
  },
  description:
    "Gabinet terapii manualnej w Rumi. Pełne 60 minut pracy z napięciem pleców, karku i barków - jeden terapeuta, bez pośpiechu. Rezerwacja online. Dojazd z Redy, Wejherowa i Gdyni.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.nazwa,
    url: "/",
  },
  // Dopóki w danych są treści przykładowe, cała strona jest wyłączona z indeksowania.
  robots: saPrzyklady ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f2e25",
  colorScheme: "dark",
};

// Klasa .js włącza stany początkowe animacji; jeśli silnik nie wystartuje w 4 s,
// zdejmujemy ją, żeby treść nigdy nie została ukryta.
const bootScript = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-on'))d.classList.remove('js')},4000)})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const plausible = site.analityka.plausibleDomena;

  return (
    <html lang="pl" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {plausible ? (
          <script defer data-domain={plausible} src="https://plausible.io/js/script.tagged-events.js" />
        ) : null}
      </head>
      <body>
        <a href="#tresc" className="skip">
          Przejdź do treści
        </a>
        <Header />
        <ViewTransition>
          <main id="tresc">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBar />
        <Engine />
        <JsonLd data={businessLd} />
        <JsonLd data={personLd} />
      </body>
    </html>
  );
}
