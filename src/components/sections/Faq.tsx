import { PhoneLink } from "@/components/ui/BookLink";
import { faq } from "@/data/faq";
import styles from "./Faq.module.scss";

export function Faq() {
  return (
    <section id="faq" className="section" data-theme="green" aria-labelledby="faq-tytul">
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.head}>
            <p className="eyebrow" data-reveal>
              Częste pytania
            </p>
            <h2 id="faq-tytul" className="h2" data-split>
              Zanim <em>zarezerwujesz.</em>
            </h2>
            <p className="lead" data-reveal>
              Nie ma tu Twojego pytania?
              <br />
              Zadzwoń <PhoneLink section="faq" className="link" />. Odpowiem osobiście.
            </p>
          </header>

          {/* natywne <details> - działa bez JS, z klawiatury i w czytnikach ekranu */}
          <div className={styles.list}>
            {faq.map((q) => (
              <details key={q.pytanie} name="faq" className={styles.item} data-reveal>
                <summary className={styles.q}>
                  <span>{q.pytanie}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </summary>
                <div className={styles.a}>
                  <p>{q.odpowiedz}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
