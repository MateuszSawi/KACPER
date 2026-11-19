import { Photo } from "@/components/ui/Photo";
import styles from "./Sesja.module.scss";

const kroki = [
  {
    tytul: "Rozmowa wstępna",
    opis: "Zaczynamy od rozmowy: co czujesz, od kiedy, w jakich sytuacjach, jak pracujesz, jak trenujesz, jak śpisz. Bez presji i bez pośpiechu.",
  },
  {
    tytul: "Ocena napięć i ruchomości",
    opis: "Sprawdzam, jak porusza się Twoje ciało i gdzie tkanki stawiają opór. Źródło napięcia często leży gdzie indziej niż miejsce, które je sygnalizuje.",
  },
  {
    tytul: "Praca manualna",
    opis: "Spokojna, precyzyjna praca. Intensywność ustalamy na bieżąco - ma być konkretnie, nie na pokaz.",
  },
  {
    tytul: "Plan do domu",
    opis: "Wychodzisz z dwoma, trzema prostymi zaleceniami: co robić, czego unikać i czy w ogóle warto wracać. Jeśli nie - powiem to wprost.",
  },
];

export function Sesja() {
  return (
    <section id="sesja" className="section" data-theme="paper" aria-labelledby="sesja-tytul">
      <div className="container">
        <header className="sectionHead">
          <p className="eyebrow" data-reveal>
            Jak wygląda sesja
          </p>
          <h2 id="sesja-tytul" className={`h2 ${styles.title}`} data-split>
            Pracuję tak, żebyś nie musiał do mnie <em>wracać.</em>
          </h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.media}>
            <Photo
              temat="dłonie terapeuty przy pracy na plecach klienta"
              kadr="zbliżenie z boku, miękkie boczne światło, płytka głębia ostrości"
              ratio="4 / 5"
              src="sesja"
            />
          </div>

          <ol className={styles.steps}>
            {kroki.map((k, i) => (
              <li key={k.tytul} className={styles.step} data-reveal>
                <span className={styles.line} data-line aria-hidden="true" />
                <span className={styles.num} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="h3">{k.tytul}</h3>
                  <p className={styles.desc}>{k.opis}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
