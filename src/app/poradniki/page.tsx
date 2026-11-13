import type { Metadata } from "next";
import { Karta } from "@/components/poradniki/Karta";
import { poradniki } from "@/lib/poradniki";
import styles from "./poradniki.module.scss";

const opis =
  "Krótkie poradniki o napięciu pleców, karku i barków: co możesz zrobić sam w domu, w pracy i po treningu.";

export const metadata: Metadata = {
  title: "Poradniki",
  description: opis,
  alternates: {
    canonical: "/poradniki/",
    types: { "application/rss+xml": "/poradniki/rss.xml" },
  },
  openGraph: { type: "website", url: "/poradniki/", title: "Poradniki", description: opis },
};

export default function PoradnikiPage() {
  const wpisy = poradniki();

  return (
    <>
      <header className={styles.top} data-theme="deep">
        <div className="container">
          <p className="eyebrow" data-reveal>
            Poradniki
          </p>
          <h1 className={`display ${styles.title}`} data-split>
            Co możesz zrobić dla swojego ciała sam.
          </h1>
          <p className="lead" data-reveal>
            {opis}
          </p>
        </div>
      </header>

      <section className="section" data-theme="paper" aria-label="Lista poradników">
        <div className="container">
          {wpisy.length ? (
            <div className={styles.grid}>
              {wpisy.map((p) => (
                <Karta key={p.slug} poradnik={p} naglowek="h2" />
              ))}
            </div>
          ) : (
            <p className="lead">Pierwsze poradniki pojawią się tutaj wkrótce.</p>
          )}
        </div>
      </section>
    </>
  );
}
