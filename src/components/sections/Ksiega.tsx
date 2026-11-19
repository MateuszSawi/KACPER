"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Gwiazdki } from "@/components/ui/Gwiazdki";
import { ocenaOpinii, zrodloOpinii, type Opinia } from "@/data/opinie";
import styles from "./Opinie.module.scss";

const MNIEJ_RUCHU = "(prefers-reduced-motion: reduce)";
const sluchajRuchu = (zmiana: () => void) => {
  const mq = window.matchMedia(MNIEJ_RUCHU);
  mq.addEventListener("change", zmiana);
  return () => mq.removeEventListener("change", zmiana);
};

/**
 * Ile sekund opinia zostaje na stronie, zanim księga przewróci kartkę:
 * spokojne tempo czytania (200 słów na minutę) plus zapas - dłuższa opinia czeka dłużej.
 */
const czas = (tresc: string) => Math.max(8, Math.round(tresc.split(/\s+/).length * 0.3 + 5));

/** Krótka opinia dostaje większe pismo, długa mniejsze - strona jest zawsze podobnie wypełniona */
const rozmiar = (tresc: string) => (tresc.length < 140 ? styles.s : tresc.length < 240 ? styles.m : styles.l);

/**
 * Księga gości: jedna opinia naraz na lewej stronie, spis wszystkich na prawej (tylko desktop).
 * - kartki przewracają się same; czas zależy od długości opinii
 * - przycisk z pierścieniem odliczającym czas zatrzymuje i wznawia przewracanie
 * - pauza, gdy kursor jest nad księgą, gdy ktoś chodzi po niej klawiaturą i gdy sekcja jest poza ekranem
 * - strzałki, spis i przesunięcie palcem zmieniają opinię ręcznie
 * - prefers-reduced-motion: bez samoczynnego przewracania, zostaje nawigacja ręczna
 * Wszystkie opinie są w kodzie HTML od razu (ułożone jedna na drugiej), więc strona księgi
 * ma wysokość najdłuższej opinii i nic pod nią nie skacze.
 */
export function Ksiega({ opinie }: { opinie: Opinia[] }) {
  const n = opinie.length;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const [klawiatura, setKlawiatura] = useState(false);
  const mniejRuchu = useSyncExternalStore(
    sluchajRuchu,
    () => window.matchMedia(MNIEJ_RUCHU).matches,
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const idz = (k: number) => setI(((k % n) + n) % n);
  const gra = auto && !mniejRuchu;
  const wstrzymane = !inView || hover || klawiatura;

  return (
    <div
      ref={root}
      className={clsx(styles.book, gra && wstrzymane && styles.paused)}
      data-reveal
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setKlawiatura(true)}
      onBlur={() => setKlawiatura(false)}
    >
      <div className={clsx(styles.page, styles.pageL)}>
        <p className={styles.run}>Opinia {i + 1}</p>

        {/* aria-live tylko przy ręcznym przeglądaniu - samoczynne przewracanie nie zagaduje czytników ekranu */}
        <div
          className={styles.sheets}
          aria-live={gra ? "off" : "polite"}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") startX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 48) idz(i + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          {opinie.map((o, k) => (
            <figure key={k} className={clsx(styles.sheet, k === i && styles.on)}>
              <blockquote className={clsx(styles.bq, rozmiar(o.tresc))}>
                <p>{o.tresc}</p>
              </blockquote>
              <figcaption className={styles.sig}>
                <span>{o.imie || zrodloOpinii}</span>
                <Gwiazdki className={styles.stars} label={ocenaOpinii} />
                {o.przyklad && <span className="przyklad">Przykład</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.nav}>
          <button type="button" className={styles.pn} onClick={() => idz(i - 1)}>
            <svg className={clsx(styles.ico, styles.icoL)} viewBox="0 0 18 18" aria-hidden="true">
              <path d="M16 9H2M7 4 2 9l5 5" />
            </svg>
            <span>Poprzednia</span>
          </button>

          {!mniejRuchu && (
            <button
              type="button"
              className={styles.toggle}
              aria-label={auto ? "Zatrzymaj samoczynną zmianę opinii" : "Wznów samoczynną zmianę opinii"}
              onClick={() => setAuto((a) => !a)}
            >
              <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden="true">
                <circle className={styles.ringTrack} cx="24" cy="24" r="22.5" />
                {/* Koniec odliczania przewraca kartkę - pierścień i zmiana opinii są zawsze zgrane */}
                {gra && (
                  <circle
                    key={i}
                    className={styles.ringOn}
                    cx="24"
                    cy="24"
                    r="22.5"
                    pathLength={1}
                    style={{ "--czas": `${czas(opinie[i].tresc)}s` } as React.CSSProperties}
                    onAnimationEnd={() => idz(i + 1)}
                  />
                )}
              </svg>
              <svg className={styles.state} viewBox="0 0 24 24" aria-hidden="true">
                {auto ? <path d="M8 6h2.5v12H8zM13.5 6H16v12h-2.5z" /> : <path d="M9 6v12l9.5-6L9 6Z" />}
              </svg>
            </button>
          )}

          <button type="button" className={styles.pn} onClick={() => idz(i + 1)}>
            <span>Następna</span>
            <svg className={clsx(styles.ico, styles.icoR)} viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 9h14M11 4l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Spis opinii - tylko na szerokich ekranach; na telefonie zostają same opinie */}
      <nav className={clsx(styles.page, styles.pageR)} aria-label="Przykładowe opinie">
        <p className={styles.run}>Przykładowe opinie</p>
        <ol className={styles.toc}>
          {opinie.map((o, k) => (
            <li key={k}>
              <button
                type="button"
                className={clsx(styles.row, k === i && styles.rowOn)}
                aria-current={k === i ? "true" : undefined}
                onClick={() => idz(k)}
              >
                <span className={styles.rName}>{o.imie || "Klient"}</span>
                {/* całe zdanie w jednej linii, ucięte wielokropkiem na końcu dostępnego miejsca */}
                <span className={styles.rText}>{o.tresc}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
