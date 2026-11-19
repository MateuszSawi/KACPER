import clsx from "clsx";
import { Fragment } from "react";
import { BookLink } from "@/components/ui/BookLink";
import { Img, type ObrazSlug } from "@/components/ui/Img";
import { site } from "@/data/site";
import styles from "./Hero.module.scss";

// Nagłówek dzielony na słowa w HTML - wejście robi czysty CSS (bez JS),
// więc tekst jest w dokumencie od razu i nie opóźnia LCP.
const naglowek: { t: string; em?: boolean }[] = [
  { t: "Ból" },
  { t: "nie" },
  { t: "powinien" },
  { t: "decydować," },
  { t: "jak" },
  { t: "wygląda" },
  { t: "Twój", em: true },
  { t: "dzień.", em: true },
];

export function Hero() {
  const wideo: string = site.hero.wideo;
  const obraz = site.hero.obraz as ObrazSlug | "";

  return (
    <section id="hero" className={styles.hero} data-theme="deep">
      {/* Tło: zdjęcie (ładowane z priorytetem) + opcjonalne wideo z preload="none" - nie blokuje LCP. */}
      <div className={styles.media} aria-hidden="true">
        {obraz ? (
          <Img slug={obraz} alt="" sizes="100vw" priority className={styles.cover} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.blobA} />
            <span className={styles.blobB} />
          </div>
        )}
        {wideo && <video className={styles.cover} src={wideo} autoPlay muted loop playsInline preload="none" />}
      </div>
      {/* zielony filtr nad zdjęciem */}
      <div className={styles.tint} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />

      <div className={clsx("container", styles.inner)}>
        <p className={clsx(styles.kicker, styles.fade)} style={{ "--d": "0.2s" } as React.CSSProperties}>
          Gabinet Terapii Manualnej · Rumia
        </p>

        <h1 className={clsx("display", styles.title)}>
          {naglowek.map((w, i) => (
            <Fragment key={i}>
              <span className={styles.word}>
                <span style={{ "--i": i } as React.CSSProperties}>{w.em ? <em>{w.t}</em> : w.t}</span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <div className={styles.bottom}>
          <div className={clsx(styles.actions, styles.fade)} style={{ "--d": "1.1s" } as React.CSSProperties}>
            <BookLink section="hero" />
            <div className={styles.badge}>
              <span className={styles.stars} aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} viewBox="0 0 12 12">
                    <path d="M6 .8 7.5 4.3l3.8.3-2.9 2.5.9 3.7L6 8.8 2.7 10.8l.9-3.7L.7 4.6l3.8-.3L6 .8Z" />
                  </svg>
                ))}
              </span>
              <span>
                <strong>{site.ocena.wartosc}</strong> · {site.ocena.zrodlo}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.meta, styles.fade)} style={{ "--d": "1.6s" } as React.CSSProperties}>
        <div className={clsx("container", styles.metaInner)}>
          <span>
            {site.adres.miasto} · {site.adres.ulica}, {site.adres.kod}
          </span>
          {!wideo && !obraz && (
            <span className={styles.slotNote}>
              tu: wideo w tle - dłonie przy pracy, zbliżenie, ciepłe boczne światło, pętla 8–12 s
            </span>
          )}
          <a href="#znasz-to" className={styles.scroll}>
            Przewiń
            <span aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
