import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";
import { Certyfikaty } from "./Certyfikaty";
import styles from "./OMnie.module.scss";

export function OMnie() {
  const { kwalifikacje } = site.terapeutaInfo;

  return (
    <section id="o-mnie" className="section" data-theme="green" aria-labelledby="o-mnie-tytul">
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
                Nazywam się {site.terapeuta}. Regularnie trenuję na siłowni, a wcześniej przez lata rywalizowałem
                w trójboju siłowym i przygotowywałem się do zawodów ninja. To dyscypliny, w których kręgosłup, biodra
                i barki pracują na granicy swoich możliwości.
              </p>
              <p>
                Wiem, jak zachowuje się ciało przeciążone, bo sam je przeciążałem, regenerowałem i uczyłem się go
                słuchać. Tę samą uważność przenoszę do gabinetu. Niezależnie od tego, czy dźwigasz ciężary na treningu,
                czy odpowiedzialność za firmę i codzienny stres - napięcie odkłada się w tych samych miejscach.
              </p>
            </div>

            <div className={styles.lists}>
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

        <Certyfikaty />
      </div>
    </section>
  );
}
