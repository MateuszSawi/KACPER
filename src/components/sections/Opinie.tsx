import { Arrow } from "@/components/ui/BookLink";
import { Gwiazdki } from "@/components/ui/Gwiazdki";
import { opinie, opisOpinii } from "@/data/opinie";
import { site } from "@/data/site";
import { Ksiega } from "./Ksiega";
import styles from "./Opinie.module.scss";

export function Opinie() {
  const wszystkie: string = site.linki.wszystkieOpinie;

  return (
    <section id="opinie" className={`section ${styles.section}`} data-theme="deep" aria-labelledby="opinie-tytul">
      <div className="container">
        <header className={styles.head}>
          <h2 id="opinie-tytul" className="eyebrow" data-reveal>
            Opinie
          </h2>
          <p className={styles.src} data-reveal>
            <Gwiazdki className={styles.stars} />
            <span>{opisOpinii}</span>
          </p>
        </header>

        <div className={styles.stage}>
          <span className={styles.mark} aria-hidden="true">
            ”
          </span>
          <Ksiega opinie={opinie} />
        </div>

        {/* Przejście do wszystkich opinii. Dopóki w site.ts nie ma adresu, przycisk nigdzie nie prowadzi. */}
        <div className={styles.all} data-reveal>
          {wszystkie ? (
            <a
              href={wszystkie}
              target="_blank"
              rel="noopener"
              className="btn btn--ghost"
              data-track="wszystkie-opinie"
              data-section="opinie"
            >
              <span>Zobacz wszystkie opinie</span>
              <Arrow />
              <span className="srOnly"> (otwiera się w nowej karcie)</span>
            </a>
          ) : (
            <button type="button" className="btn btn--ghost">
              <span>Zobacz wszystkie opinie</span>
              <Arrow />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
