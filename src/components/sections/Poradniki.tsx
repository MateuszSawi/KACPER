import Link from "next/link";
import { Karta } from "@/components/poradniki/Karta";
import { Arrow } from "@/components/ui/BookLink";
import { poradniki } from "@/lib/poradniki";
import styles from "./Poradniki.module.scss";

/** Trzy najnowsze poradniki. Gdy nie ma żadnego opublikowanego wpisu, sekcja się nie pokazuje. */
export function Poradniki() {
  const wpisy = poradniki().slice(0, 3);
  if (!wpisy.length) return null;

  return (
    <section id="poradniki" className="section" data-theme="paper" aria-labelledby="poradniki-tytul">
      <div className="container">
        <header className={styles.head}>
          <h2 id="poradniki-tytul" className="eyebrow" data-reveal>
            Poradniki
          </h2>
          <Link href="/poradniki/" className={`link ${styles.all}`} data-reveal>
            Wszystkie poradniki
            <Arrow />
          </Link>
        </header>

        <div className={styles.grid}>
          {wpisy.map((p) => (
            <Karta key={p.slug} poradnik={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
