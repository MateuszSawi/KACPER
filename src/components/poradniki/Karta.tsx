import Link from "next/link";
import { site } from "@/data/site";
import { dataPoPolsku, type Poradnik } from "@/lib/poradniki";
import { BlogImg } from "./BlogImg";
import styles from "./Karta.module.scss";

/** Karta poradnika na liście: zdjęcie, kategoria, tytuł, opis, data. Cała karta jest linkiem. */
export function Karta({ poradnik: p, naglowek: H = "h3" }: { poradnik: Poradnik; naglowek?: "h2" | "h3" }) {
  return (
    <article className={styles.card} data-reveal>
      <Link href={`/poradniki/${p.slug}/`} className={styles.link}>
        <div className={styles.media}>
          {p.cover ? (
            <BlogImg
              src={p.cover}
              alt={p.coverAlt}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
              className={styles.img}
            />
          ) : null}
        </div>
        {p.category ? <p className={styles.category}>{p.category}</p> : null}
        <H className={`h3 ${styles.title}`}>{p.title}</H>
        {p.description ? <p className={styles.desc}>{p.description}</p> : null}
        <p className={styles.meta}>
          {site.terapeuta}
          {" · "}
          {p.pubDate ? <time dateTime={p.pubDate}>{dataPoPolsku(p.pubDate)}</time> : null}
          {p.pubDate ? " · " : null}
          {p.minuty} min czytania
        </p>
      </Link>
    </article>
  );
}
