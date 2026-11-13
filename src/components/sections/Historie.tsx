import { historie } from "@/data/historie";
import { VideoPair } from "./VideoPair";
import styles from "./Historie.module.scss";

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
                <VideoPair przed={h.wideo.przed} po={h.wideo.po} etykieta={h.kto} />
              </div>

              <div className={styles.text}>
                <p className={styles.meta} data-reveal>
                  <span>Historia 0{i + 1}</span>
                  <span>{h.sesje}</span>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
