import type { Metadata } from "next";
import Link from "next/link";
import { BlogImg } from "@/components/poradniki/BlogImg";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookLink } from "@/components/ui/BookLink";
import { site } from "@/data/site";
import { dataPoPolsku, obrazBloga, poradniki, znajdzPoradnik } from "@/lib/poradniki";
import styles from "../poradniki.module.scss";

// Eksport statyczny wymaga co najmniej jednej ścieżki - gdy nie ma opublikowanych wpisów,
// budujemy jedną stronę zastępczą (bez linków do niej i poza indeksem).
const PUSTY = "brak-wpisow";

export const dynamicParams = false;

export function generateStaticParams() {
  const wpisy = poradniki();
  return wpisy.length ? wpisy.map((p) => ({ slug: p.slug })) : [{ slug: PUSTY }];
}

export async function generateMetadata({ params }: PageProps<"/poradniki/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = znajdzPoradnik(slug);
  if (!p) return { title: "Poradniki", robots: { index: false, follow: false } };

  const url = `/poradniki/${p.slug}/`;
  const okladka = p.cover ? obrazBloga(p.cover).src : undefined;
  return {
    title: p.title,
    description: p.description || undefined,
    alternates: { canonical: url, types: { "application/rss+xml": "/poradniki/rss.xml" } },
    openGraph: {
      type: "article",
      url,
      title: p.title,
      description: p.description || undefined,
      publishedTime: p.pubDate ?? undefined,
      modifiedTime: p.updatedDate ?? p.pubDate ?? undefined,
      images: okladka ? [{ url: okladka, alt: p.coverAlt }] : undefined,
    },
  };
}

export default async function PoradnikPage({ params }: PageProps<"/poradniki/[slug]">) {
  const { slug } = await params;
  const p = znajdzPoradnik(slug);

  if (!p) {
    return (
      <header className={styles.top} data-theme="deep">
        <div className="container">
          <h1 className={`display ${styles.articleTitle}`}>Pierwsze poradniki pojawią się wkrótce.</h1>
          <Link href="/" className={`link ${styles.back}`}>
            Wróć na stronę główną
          </Link>
        </div>
      </header>
    );
  }

  const url = `${site.url}/poradniki/${p.slug}/`;
  const okladka = p.cover ? obrazBloga(p.cover).src : null;

  return (
    <article>
      <header className={styles.top} data-theme="deep">
        <div className="container">
          <Link href="/poradniki/" className={`link ${styles.back}`}>
            ← Wszystkie poradniki
          </Link>
          <p className={styles.meta}>
            {p.category ? `${p.category} · ` : null}
            {p.pubDate ? <time dateTime={p.pubDate}>{dataPoPolsku(p.pubDate)}</time> : null}
            {p.pubDate ? " · " : null}
            {p.minuty} min czytania
          </p>
          <h1 className={`display ${styles.articleTitle}`}>{p.title}</h1>
          {p.description ? <p className="lead">{p.description}</p> : null}
        </div>
      </header>

      <div className={styles.article} data-theme="paper">
        <div className="container">
          {p.cover ? (
            <div className={styles.cover}>
              <BlogImg src={p.cover} alt={p.coverAlt} sizes="(min-width: 1152px) 1088px, 100vw" priority />
            </div>
          ) : null}

          {/* Treść pochodzi z naszych plików Markdown w content/poradniki */}
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: p.html }} />

          {p.updatedDate && p.updatedDate !== p.pubDate ? (
            <p className={`${styles.cta} ${styles.meta}`}>
              <span>
                Zaktualizowano: <time dateTime={p.updatedDate}>{dataPoPolsku(p.updatedDate)}</time>
              </span>
            </p>
          ) : null}

          <aside className={styles.cta}>
            <p className={`display ${styles.ctaText}`}>{p.cta}</p>
            <BookLink section="poradnik" detail={p.slug} />
          </aside>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description || undefined,
          datePublished: p.pubDate ?? undefined,
          dateModified: p.updatedDate ?? p.pubDate ?? undefined,
          image: okladka ? `${site.url}${okladka}` : undefined,
          mainEntityOfPage: url,
          author: { "@type": "Person", name: site.terapeuta },
          publisher: { "@id": `${site.url}/#gabinet` },
        }}
      />
    </article>
  );
}
