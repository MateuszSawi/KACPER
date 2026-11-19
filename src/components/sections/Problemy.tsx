import styles from "./Problemy.module.scss";

// Opisujemy sytuację klienta, nie nazwy schorzeń.
const zdania = [
  "Plecy bolą po całym dniu siedzenia lub stania.",
  "Rano wstają sztywni i obolali.",
  "Kark i barki są stale napięte.",
  "Ból głowy wraca kilka razy w tygodniu.",
  "Ból odbiera im trening i ulubiony sport.",
  "Boją się, że z wiekiem będzie tylko gorzej.",
  "Nie chcą, żeby ból decydował, co mogą robić.",
];

/**
 * Akcent między sekcjami: mała etykieta i jeden rząd zdań. Sama typografia.
 * Rząd jest szerszy niż ekran (widać 4 zdania naraz) i przesuwa się w poziomie
 * razem z przewijaniem strony (data-scroll-x, obsługa w Engine.tsx).
 * Bez JS lub przy ograniczonym ruchu rząd można przesunąć palcem.
 */
export function Problemy() {
  return (
    <section className={styles.section} data-theme="deep" aria-labelledby="problemy-tytul">
      <div className="container">
        <h2 id="problemy-tytul" className={`eyebrow ${styles.label}`}>
          Z tym najczęściej przychodzą do mnie klienci
        </h2>
      </div>
      <div className={styles.viewport} data-reveal>
        <ul className={styles.row} data-scroll-x>
          {zdania.map((z) => (
            <li key={z}>{z}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
