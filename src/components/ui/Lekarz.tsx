import styles from "./Lekarz.module.scss";

const objawy = [
  "drętwienie w okolicy krocza",
  "problemy z kontrolą pęcherza lub zwieraczy",
  "narastające osłabienie nogi lub ręki",
  "ból po upadku, wypadku lub urazie",
  "ból z gorączką",
  "ból, który budzi w nocy i nie zależy od pozycji",
  "niewyjaśniona utrata wagi",
];

/** Dyskretny blok bezpieczeństwa - na stronie głównej i każdej stronie usługi/problemu. */
export function Lekarz() {
  return (
    <aside className={styles.box} aria-labelledby="lekarz-tytul" data-reveal>
      <h3 id="lekarz-tytul" className={styles.title}>
        Kiedy najpierw do lekarza
      </h3>
      <p className={styles.text}>
        Praca manualna nie jest właściwym pierwszym krokiem, jeśli zauważasz u siebie którykolwiek z tych objawów.
        Wtedy skontaktuj się z lekarzem, a przy nagłym pogorszeniu - z pogotowiem.
      </p>
      <ul className={styles.list}>
        {objawy.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </aside>
  );
}
