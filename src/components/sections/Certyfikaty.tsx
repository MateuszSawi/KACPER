"use client";

/* eslint-disable @next/next/no-img-element -- gotowe pliki WebP robi scripts/certyfikaty.mjs, nie next/image */

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import lista from "@/data/certyfikaty.json";
import styles from "./Certyfikaty.module.scss";

const plik = (id: string, miniatura?: boolean) => `/images/certyfikaty/${id}${miniatura ? "-m" : ""}.webp`;

/**
 * Dyplomy i certyfikaty: jeden rząd miniatur o wspólnej wysokości (szerokość wynika z proporcji
 * dokumentu, więc pionowe i poziome leżą obok siebie bez przycinania). Rząd przesuwa się palcem,
 * gładzikiem, przeciągnięciem myszą i strzałkami po bokach; brzeg, za którym jest więcej dokumentów,
 * jest rozmyty i wygaszony.
 * Kliknięcie otwiera okno z karuzelą: strzałki na ekranie i klawiaturze, przesunięcie palcem,
 * pasek miniatur do skoku do wybranego dokumentu. Esc albo klik obok dokumentu zamyka okno.
 * Lista i pliki powstają w scripts/certyfikaty.mjs.
 */
export function Certyfikaty() {
  const n = lista.length;
  const [i, setI] = useState<number | null>(null);
  const okno = useRef<HTMLDialogElement>(null);
  const pasek = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const rzad = useRef<HTMLUListElement>(null);
  /** Czy rząd miniatur da się jeszcze przesunąć w lewo / w prawo - od tego zależą strzałki i wygaszenie brzegów */
  const [dalej, setDalej] = useState({ lewo: false, prawo: false });
  /** Przeciąganie rzędu myszą: po przeciągnięciu najbliższe kliknięcie nie otwiera dokumentu */
  const ciag = useRef<{ x: number; start: number; ruszyl: boolean } | null>(null);
  const pominKlik = useRef(false);
  const otwarte = i !== null;

  useEffect(() => {
    const el = rzad.current;
    if (!el) return;
    const sprawdz = () => {
      const lewo = el.scrollLeft > 4;
      const prawo = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
      setDalej((d) => (d.lewo === lewo && d.prawo === prawo ? d : { lewo, prawo }));
    };
    sprawdz();
    el.addEventListener("scroll", sprawdz, { passive: true });
    const ro = new ResizeObserver(sprawdz);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sprawdz);
      ro.disconnect();
    };
  }, []);

  const przesun = (kierunek: 1 | -1) => {
    const el = rzad.current;
    if (!el) return;
    const mniejRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: kierunek * el.clientWidth * 0.8, behavior: mniejRuchu ? "auto" : "smooth" });
  };

  // Przeciąganie myszą (dotyk i gładzik przewijają rząd same z siebie)
  const zacznijCiag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = e.currentTarget;
    ciag.current = { x: e.clientX, start: el.scrollLeft, ruszyl: false };
    const ruch = (ev: PointerEvent) => {
      const c = ciag.current;
      if (!c) return;
      const dx = ev.clientX - c.x;
      if (!c.ruszyl && Math.abs(dx) < 6) return;
      c.ruszyl = true;
      el.scrollLeft = c.start - dx;
    };
    const koniec = () => {
      window.removeEventListener("pointermove", ruch);
      window.removeEventListener("pointerup", koniec);
      window.removeEventListener("pointercancel", koniec);
      if (ciag.current?.ruszyl) {
        pominKlik.current = true;
        // kliknięcie kończące przeciągnięcie przychodzi zaraz po puszczeniu przycisku myszy
        setTimeout(() => {
          pominKlik.current = false;
        }, 0);
      }
      ciag.current = null;
    };
    window.addEventListener("pointermove", ruch);
    window.addEventListener("pointerup", koniec);
    window.addEventListener("pointercancel", koniec);
  };

  // Otwarcie i zamknięcie natywnego <dialog>: pułapka fokusu, Esc i powrót fokusu są wbudowane.
  useEffect(() => {
    const d = okno.current;
    if (!d) return;
    if (otwarte && !d.open) d.showModal();
    if (!otwarte && d.open) d.close();
    document.documentElement.style.overflow = otwarte ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [otwarte]);

  // Aktualna miniatura zawsze widoczna w pasku na dole okna
  useEffect(() => {
    if (i === null) return;
    const el = pasek.current?.children[i] as HTMLElement | undefined;
    if (el && pasek.current) {
      pasek.current.scrollTo({ left: el.offsetLeft - (pasek.current.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [i]);

  const idz = (k: number) => setI(((k % n) + n) % n);
  const c = i === null ? null : lista[i];

  return (
    <div className={styles.root} data-reveal>
      <div className={styles.head}>
        <h3 className={styles.label}>Dyplomy i certyfikaty</h3>
        <p className={styles.hint}>Kliknij, aby powiększyć</p>
      </div>

      <div className={clsx(styles.strip, dalej.lewo && styles.maLewo, dalej.prawo && styles.maPrawo)}>
        <ul
          ref={rzad}
          className={styles.row}
          onPointerDown={zacznijCiag}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (pominKlik.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {lista.map((x, k) => (
            <li key={x.id}>
              <button type="button" className={styles.thumb} onClick={() => setI(k)}>
                <img
                  src={plik(x.id, true)}
                  width={x.mw}
                  height={x.mh}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="srOnly">Powiększ: {x.tytul}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Strzałki tylko dla myszy i dotyku - z klawiatury rząd przechodzi się tabulatorem po miniaturach */}
        <button
          type="button"
          className={clsx(styles.move, styles.moveL)}
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => przesun(-1)}
        >
          <svg viewBox="0 0 18 18">
            <path d="M16 9H2M7 4 2 9l5 5" />
          </svg>
        </button>
        <button
          type="button"
          className={clsx(styles.move, styles.moveR)}
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => przesun(1)}
        >
          <svg viewBox="0 0 18 18">
            <path d="M2 9h14M11 4l5 5-5 5" />
          </svg>
        </button>
      </div>

      <dialog
        ref={okno}
        className={styles.dialog}
        aria-label="Dyplomy i certyfikaty"
        data-lenis-prevent
        onClose={() => setI(null)}
        onKeyDown={(e) => {
          if (i === null) return;
          if (e.key === "ArrowRight") idz(i + 1);
          if (e.key === "ArrowLeft") idz(i - 1);
        }}
      >
        {c && i !== null && (
          <>
            <div className={styles.top}>
              <p className={styles.count} aria-live="polite">
                {i + 1} / {n}
              </p>
              <button type="button" className={styles.close} onClick={() => setI(null)}>
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M3 3l12 12M15 3 3 15" />
                </svg>
                <span className="srOnly">Zamknij</span>
              </button>
            </div>

            {/* klik w puste miejsce obok dokumentu zamyka okno */}
            <div
              className={styles.stage}
              onClick={(e) => e.target === e.currentTarget && setI(null)}
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
              <img
                key={c.id}
                className={styles.doc}
                src={plik(c.id)}
                width={c.w}
                height={c.h}
                alt={`${c.tytul} - ${c.wystawca}`}
                draggable={false}
              />
            </div>

            <button type="button" className={clsx(styles.arrow, styles.prev)} onClick={() => idz(i - 1)}>
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path d="M16 9H2M7 4 2 9l5 5" />
              </svg>
              <span className="srOnly">Poprzedni dokument</span>
            </button>
            <button type="button" className={clsx(styles.arrow, styles.next)} onClick={() => idz(i + 1)}>
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path d="M2 9h14M11 4l5 5-5 5" />
              </svg>
              <span className="srOnly">Następny dokument</span>
            </button>

            <div className={styles.foot}>
              <p className={styles.caption}>
                <strong>{c.tytul}</strong>
                <span>{c.wystawca}</span>
              </p>
              <div ref={pasek} className={styles.rail}>
                {lista.map((x, k) => (
                  <button
                    key={x.id}
                    type="button"
                    className={clsx(styles.railItem, k === i && styles.railOn)}
                    aria-current={k === i ? "true" : undefined}
                    onClick={() => setI(k)}
                  >
                    <img src={plik(x.id, true)} width={x.mw} height={x.mh} alt="" loading="lazy" decoding="async" />
                    <span className="srOnly">{x.tytul}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* sąsiednie dokumenty ładują się w tle, żeby przejście było natychmiastowe */}
            <link rel="preload" as="image" href={plik(lista[(i + 1) % n].id)} />
            <link rel="preload" as="image" href={plik(lista[(i - 1 + n) % n].id)} />
          </>
        )}
      </dialog>
    </div>
  );
}
