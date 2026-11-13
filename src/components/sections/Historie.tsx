import { historie } from "@/data/historie";
import { VideoPair } from "./VideoPair";
import styles from "./Historie.module.scss";

function Skala({ wartosc, etykieta }: { wartosc: number; etykieta: string }) {
  return (
    <div className={styles.scale}>
      <span className={styles.scaleLabel}>{etykieta}</span>
      <span className={styles.scaleBar} role="img" aria-label={`${etykieta}: ${wartosc} na 10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={i < wartosc ? styles.on : undefined} />
        ))}
      </span>
      <span className={styles.scaleValue}>{wartosc}/10</span>
    </div>
  );
}

export function Historie() {
  return (
    <section id="historie" className="section" data-theme="deep" aria-labelledby="historie-tytul">
      <div className="container">
        <header className="sectionHead">
          <p className="eyebrow" data-reveal>
            Historie klientów
          </p>
          <h2 id="historie-tytul" className="h2" data-split>
            Efekty <em>przed i po.</em>
          </h2>
        </header>

        <div className={styles.list}>
          {historie.map((h, i) => (
            <article key={h.kto} className={styles.case}>
              <div className={styles.media} data-reveal>
                <VideoPair przed={h.wideo.przed} po={h.wideo.po} etykieta={h.zakres.co} />
              </div>

              <div className={styles.text}>
                <p className={styles.meta} data-reveal>
                  <span>Historia 0{i + 1}</span>
                  <span>{h.sesje}</span>
                  {h.przyklad && <span className="przyklad">Przykład</span>}
                </p>
                <h3 className="h3" data-reveal>
                  {h.kto}
                </h3>

                <dl className={styles.story} data-reveal>
                  <div>
                    <dt>Punkt wyjścia</dt>
                    <dd>{h.zCzym}</dd>
                  </div>
                  <div>
                    <dt>Co zrobiliśmy</dt>
                    <dd>{h.coZrobilismy}</dd>
                  </div>
                  <div>
                    <dt>Co się zmieniło</dt>
                    <dd>{h.coSieZmienilo}</dd>
                  </div>
                </dl>

                <div className={styles.metrics} data-reveal>
                  <div>
                    <p className={styles.metricTitle}>Odczuwane napięcie</p>
                    <Skala wartosc={h.napiecie.przed} etykieta="Przed" />
                    <Skala wartosc={h.napiecie.po} etykieta="Po" />
                  </div>
                  <div>
                    <p className={styles.metricTitle}>{h.zakres.co}</p>
                    <p className={styles.range}>
                      <span>{h.zakres.przed}</span>
                      <svg viewBox="0 0 24 12" fill="none" aria-hidden="true">
                        <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <span className="srOnly">, po cyklu: </span>
                      <strong>{h.zakres.po}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
