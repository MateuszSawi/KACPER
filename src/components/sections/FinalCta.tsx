import { BookLink } from "@/components/ui/BookLink";
import { Img } from "@/components/ui/Img";
import styles from "./FinalCta.module.scss";

export function FinalCta() {
  return (
    <section className={styles.final} data-theme="green" aria-labelledby="final-tytul">
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgInner} data-parallax="0.08">
          <Img slug="final" alt="" sizes="100vw" className={styles.bgImg} />
        </div>
      </div>
      <span className={styles.ring} aria-hidden="true" data-parallax="0.18" />
      <div className={`container ${styles.inner}`}>
        <h2 id="final-tytul" className={`display ${styles.title}`} data-split>
          Napięcie nie zniknie od <em>czekania.</em>
        </h2>
        <div data-reveal>
          <BookLink section="final" />
        </div>
      </div>
    </section>
  );
}
