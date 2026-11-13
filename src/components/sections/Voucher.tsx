import { Arrow } from "@/components/ui/BookLink";
import { mailHref, site, telHref } from "@/data/site";
import styles from "./Voucher.module.scss";

export function Voucher() {
  return (
    <section id="voucher" className="section" data-theme="deep" aria-labelledby="voucher-tytul">
      <div className={`container ${styles.layout}`}>
        <div className={styles.text}>
          <p className="eyebrow" data-reveal>
            Voucher
          </p>
          <h2 id="voucher-tytul" className="h2" data-split>
            Zadbaj o zdrowie <em>najbliższych.</em>
          </h2>
          <p className="lead" data-reveal>
            Dla kogoś, kto dba o wszystkich oprócz siebie. Voucher na pojedynczą sesję lub pakiet, w eleganckiej formie
            gotowej do wręczenia - imienny albo na okaziciela.
          </p>
          <div className={styles.actions} data-reveal>
            <a href={telHref} className="btn btn--ghost" data-track="telefon" data-section="voucher">
              <span>Zamów voucher telefonicznie</span>
              <Arrow />
            </a>
            <a href={mailHref} className="link" data-track="email" data-section="voucher">
              lub napisz wiadomość
            </a>
          </div>
        </div>

        {/* karta vouchera - czysty CSS, bez zdjęcia */}
        <div className={styles.scene} aria-hidden="true" data-reveal>
          <div className={styles.cardBack} />
          <div className={styles.card}>
            <span className={styles.cardTop}>
              <span>Voucher</span>
              <span>Nº 001</span>
            </span>
            <span className={styles.cardTitle}>
              Prezent dla
              <br />
              Twojego ciała.
            </span>
            <span className={styles.cardBottom}>
              <span>{site.nazwaKrotka}</span>
              <span>Rumia</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
