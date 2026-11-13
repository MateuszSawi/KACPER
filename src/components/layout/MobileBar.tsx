import { site, telHref } from "@/data/site";
import styles from "./MobileBar.module.scss";

/** Stałe CTA na mobile: „Zarezerwuj” + „Zadzwoń”. */
export function MobileBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Szybka rezerwacja">
      <a href={telHref} className={styles.call} data-track="telefon" data-section="pasek-mobilny">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 3h3l1.5 4-2 1.5a10 10 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 2.5 4.6 1.5 1.5 0 0 1 4 3Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        Zadzwoń
      </a>
      <a
        href={site.linki.booksy}
        target="_blank"
        rel="noopener"
        className={styles.book}
        data-track="rezerwacja"
        data-section="pasek-mobilny"
      >
        Zarezerwuj termin
      </a>
    </div>
  );
}
