import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";
import styles from "./OMnie.module.scss";

export function OMnie() {
  const { kwalifikacje, osiagniecia } = site.terapeutaInfo;

  return (
    <section id="o-mnie" className={`section ${styles.root}`} data-theme="green" aria-labelledby="o-mnie-tytul">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.media}>
            <Photo
              temat="portret terapeuty"
              kadr="półpostać, spokojne spojrzenie w obiektyw, ciemne tło, światło z jednej strony"
              ratio="3 / 4"
              src="portret"
            />
            <Photo
              className={styles.second}
              temat="terapeuta na pomoście ze sztangą"
              kadr="szeroki plan z zawodów lub treningu, kreda na dłoniach, kontrastowe światło"
              ratio="1 / 1"
              src="pomost"
              sizes="(min-width: 1024px) 22vw, 50vw"
              parallax={false}
            />
          </div>

          <div className={styles.text}>
            <p className="eyebrow" data-reveal>
              O mnie
            </p>
            <h2 id="o-mnie-tytul" className={`h2 ${styles.title}`} data-split>
              To, z czym przychodzisz, znam z <em>własnego ciała.</em>
            </h2>

            <div className={styles.body} data-reveal>
              <p>
                Nazywam się {site.terapeuta}. Od lat startuję w trójboju siłowym - w sporcie, w którym kręgosłup, biodra
                i barki pracują na granicy swoich możliwości. Wiem, jak zachowuje się ciało przeciążone, bo sam je
                przeciążałem, regenerowałem i uczyłem się go słuchać.
              </p>
              <p>
                Tę samą uważność przenoszę do gabinetu. Niezależnie od tego, czy dźwigasz sztangę, czy odpowiedzialność
                za firmę - napięcie odkłada się w tych samych miejscach.
              </p>
            </div>

            <div className={styles.lists}>
              <div data-reveal>
                <h3 className={styles.label}>Osiągnięcia sportowe</h3>
                <ul className={styles.list}>
                  {osiagniecia.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              <div data-reveal>
                <h3 className={styles.label}>Kwalifikacje</h3>
                <ul className={styles.list}>
                  {kwalifikacje.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
