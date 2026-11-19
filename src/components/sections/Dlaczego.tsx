import { Photo } from "@/components/ui/Photo";
import styles from "./Dlaczego.module.scss";

const punkty = [
  {
    tytul: "Pełne 60 minut",
    opis: "Pełna godzina pracy z Tobą. Bez skracania i bez zerkania na zegarek.",
  },
  {
    tytul: "Jeden terapeuta",
    opis: "Za każdym razem ta sama osoba, która pamięta Twoją historię. Nie opowiadasz wszystkiego od nowa.",
  },
  {
    tytul: "Plan po wizycie",
    opis: "Wychodzisz z konkretem: co robić w domu, czego unikać i kiedy - albo czy w ogóle - warto wrócić.",
  },
  {
    tytul: "Dyskrecja",
    opis: "W gabinecie jesteś tylko Ty i terapeuta. Nikt Cię nie widzi, nikt niczego nie słyszy i nic nie wychodzi poza te drzwi.",
  },
  {
    tytul: "Parking i dojazd",
    opis: "Łatwy dojazd i darmowy parking.",
  },
  {
    tytul: "Termin w minutę",
    opis: "Rezerwujesz online o dowolnej porze, przekładasz jednym kliknięciem. Bez dzwonienia.",
  },
];

export function Dlaczego() {
  return (
    <section className="section" data-theme="green" aria-labelledby="dlaczego-tytul">
      <div className="container">
        <header className="sectionHead">
          <h2 id="dlaczego-tytul" className="h2" data-split>
            U mnie to Ty jesteś <em>najważniejszy.</em>
          </h2>
        </header>

        <ul className={styles.grid}>
          {punkty.map((p, i) => (
            <li key={p.tytul} className={styles.item} data-reveal>
              <span className={styles.index} aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="h3">{p.tytul}</h3>
              <p className={styles.desc}>{p.opis}</p>
            </li>
          ))}
        </ul>

        <div className={styles.photos}>
          <div data-reveal>
            <Photo
              src="dlaczego-1"
              temat="Kacper Łapiński rozciąga ramię klientki leżącej na boku na stole terapeutycznym"
              kadr="zbliżenie dłoni"
              ratio="4 / 5"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </div>
          <div data-reveal>
            <Photo
              src="dlaczego-2"
              temat="Kacper Łapiński pracuje z karkiem klienta siedzącego na stole"
              kadr="zbliżenie dłoni"
              ratio="4 / 5"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </div>
          <div data-reveal>
            <Photo
              src="dlaczego-3"
              temat="Kacper Łapiński prowadzi klientkę przez ćwiczenie na macie"
              kadr="zbliżenie dłoni"
              ratio="4 / 5"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
