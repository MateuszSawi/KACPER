import { opinie } from "@/data/opinie";
import { Marquee } from "./Marquee";
import styles from "./Opinie.module.scss";

export function Opinie() {
  // dłuższe opinie w jednym rzędzie, krótsze w drugim - karty w rzędzie mają równą wysokość
  const rows = [opinie.filter((o) => o.dlugie), opinie.filter((o) => !o.dlugie)];

  return (
    <section id="opinie" className={`section ${styles.section}`} data-theme="deep" aria-labelledby="opinie-tytul">
      <div className="container">
        <header className="sectionHead">
          <h2 id="opinie-tytul" className="eyebrow" data-reveal>
            Opinie
          </h2>
        </header>
      </div>

      <div className={styles.stage} data-reveal>
        <span className={styles.mark} aria-hidden="true">
          ”
        </span>
        <Marquee rows={rows} />
      </div>

    </section>
  );
}
