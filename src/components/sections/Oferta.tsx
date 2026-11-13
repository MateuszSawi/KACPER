import clsx from "clsx";
import { BookLink } from "@/components/ui/BookLink";
import { pakietWyliczenia, pakiety, sesja, zl } from "@/data/oferta";
import styles from "./Oferta.module.scss";

const wizyt = (n: number) => (n === 1 ? "wizyta" : n < 5 ? "wizyty" : "wizyt");

type Karta = {
  sesje: number;
  zaWizyte: number;
  razem: number;
  pelna?: number;
  oszczednosc?: number;
  znizka?: number;
  wyrozniony?: boolean;
};

const karty: Karta[] = [
  {
    sesje: 1,
    zaWizyte: sesja.cena,
    razem: sesja.cena,
  },
  ...pakiety.map((p) => {
    const w = pakietWyliczenia(p);
    return {
      sesje: p.sesje,
      zaWizyte: w.zaSesje,
      razem: p.cena,
      pelna: w.pelna,
      oszczednosc: w.oszczednosc,
      znizka: w.znizka,
      wyrozniony: p.wyrozniony,
    };
  }),
];

export function Oferta() {
  return (
    <section id="oferta" className="section" data-theme="paper" aria-labelledby="oferta-tytul">
      <div className="container">
        <header className="sectionHead">
          <h2 id="oferta-tytul" className="eyebrow" data-reveal>
            Oferta i pakiety
          </h2>
        </header>

        <div className={styles.grid}>
          {karty.map((k) => {
            const pakiet = k.sesje > 1;
            return (
              <article key={k.sesje} className={clsx(styles.card, k.wyrozniony && styles.featured)} data-reveal>
                {k.wyrozniony && <p className={styles.flag}>Najczęstszy wybór</p>}
                <div className={styles.top}>
                  <h3 className={styles.title}>
                    {pakiet ? `Pakiet ${k.sesje} ${wizyt(k.sesje)}` : "1 wizyta"}
                  </h3>
                  {pakiet && <span className={styles.pill}>−{k.znizka}%</span>}
                </div>

                {/* Główna cena = cena za wizytę, obok przekreślona cena regularna */}
                <div className={styles.priceRow}>
                  <p className={styles.price}>
                    {k.zaWizyte}
                    <span className={styles.unit}> zł</span>
                  </p>
                  <p className={styles.priceMeta}>
                    {pakiet && (
                      <s>
                        <span className="srOnly">zamiast </span>
                        {zl(sesja.cena)}
                      </s>
                    )}
                    <span>za wizytę</span>
                  </p>
                </div>

                {/* Całość - tylko w pakietach */}
                {pakiet && (
                  <>
                    <p className={styles.total}>
                      <span>Razem</span>
                      <span className={styles.totalValue}>
                        <strong>{zl(k.razem)}</strong>
                        <s>
                          <span className="srOnly">zamiast </span>
                          {zl(k.pelna!)}
                        </s>
                      </span>
                    </p>
                    <p className={styles.save}>Oszczędzasz {zl(k.oszczednosc!)}</p>
                  </>
                )}

                <BookLink
                  section="oferta"
                  detail={pakiet ? `pakiet-${k.sesje}` : "wizyta"}
                  variant={k.wyrozniony ? "primary" : "ghost"}
                  className={styles.cta}
                >
                  {pakiet ? "Zarezerwuj termin" : "Zarezerwuj wizytę"}
                </BookLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
