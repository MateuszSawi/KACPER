"use client";

import { useEffect, useRef } from "react";
import { zrodloOpinii, type Opinia } from "@/data/opinie";
import styles from "./Opinie.module.scss";

const BASE = 42; // px/s

/**
 * Dwa rzędy kart płynące w przeciwnych kierunkach.
 * - prędkość reaguje na tempo przewijania strony (rzędy przyspieszają i lekko się pochylają)
 * - zatrzymanie po najechaniu kursorem
 * - przeciąganie myszą / palcem z bezwładnością
 * - pętla działa tylko, gdy sekcja jest widoczna; prefers-reduced-motion wyłącza autoprzesuw
 */
export function Marquee({ rows }: { rows: Opinia[][] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tracks = Array.from(el.querySelectorAll<HTMLElement>("[data-row]")).map((t, i) => ({
      el: t,
      x: 0,
      dir: i % 2 ? 1 : -1,
      half: t.scrollWidth / 2,
    }));

    let raf = 0;
    let running = false;
    let hover = false;
    let dragging = false;
    let lastPointer = 0;
    let dragDelta = 0;
    let inertia = 0;
    let mul = reduce ? 0 : 1;
    let skew = 0;
    let lastT = 0;
    let lastScroll = window.scrollY;

    const measure = () => tracks.forEach((t) => (t.half = t.el.scrollWidth / 2));
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const tick = (t: number) => {
      const dt = Math.min(t - lastT, 64) / 1000;
      lastT = t;

      const sy = window.scrollY;
      const sv = reduce ? 0 : sy - lastScroll;
      lastScroll = sy;

      const target = hover || dragging || reduce ? 0 : 1;
      mul += (target - mul) * Math.min(1, dt * 5);

      if (!dragging) inertia *= 0.94;
      const push = dragging ? dragDelta : inertia;
      if (dragging) inertia = dragDelta;
      dragDelta = 0;

      const skewTarget = Math.max(-5, Math.min(5, sv * 0.12 + push * 0.08));
      skew += (skewTarget - skew) * 0.12;

      for (const tr of tracks) {
        if (!tr.half) continue;
        tr.x += tr.dir * (BASE * dt * mul + sv * 0.35) + push;
        tr.x = ((tr.x % tr.half) - tr.half) % tr.half;
        tr.el.style.transform = `translate3d(${tr.x.toFixed(2)}px,0,0) skewX(${(skew * -tr.dir).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastT = performance.now();
      lastScroll = window.scrollY;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    io.observe(el);

    const enter = (e: PointerEvent) => e.pointerType === "mouse" && (hover = true);
    const leave = () => (hover = false);
    const down = (e: PointerEvent) => {
      dragging = true;
      lastPointer = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add(styles.dragging);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      dragDelta += e.clientX - lastPointer;
      lastPointer = e.clientX;
    };
    const up = () => {
      dragging = false;
      el.classList.remove(styles.dragging);
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={wrap} className={styles.marquee}>
      {rows.map((row, r) => (
        <div key={r} className={styles.row}>
          <div className={styles.track} data-row>
            {[0, 1].map((copy) =>
              row.map((o, i) => (
                <figure key={`${copy}-${i}`} className={styles.card} aria-hidden={copy === 1 || undefined}>
                  <blockquote className={styles.quote}>
                    <p>{o.tresc}</p>
                  </blockquote>
                  <figcaption className={styles.who}>
                    <span className={styles.stars} role="img" aria-label="Ocena: 5 na 5 gwiazdek">
                      {[0, 1, 2, 3, 4].map((g) => (
                        <svg key={g} viewBox="0 0 12 12" aria-hidden="true">
                          <path d="M6 .8 7.5 4.3l3.8.3-2.9 2.5.9 3.7L6 8.8 2.7 10.8l.9-3.7L.7 4.6l3.8-.3L6 .8Z" />
                        </svg>
                      ))}
                    </span>
                    {o.imie && <span className={styles.name}>{o.imie}</span>}
                    <span className={styles.what}>{zrodloOpinii}</span>
                    {o.przyklad && <span className="przyklad">Przykład</span>}
                  </figcaption>
                </figure>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
