"use client";

import { useEffect, useRef, useState } from "react";
import type { Klip } from "@/data/historie";
import styles from "./VideoPair.module.scss";

/**
 * Dwa filmy 9:16 obok siebie („Przed” i „Po”), odtwarzane równocześnie w pętli.
 * - nic się nie pobiera, dopóki sekcja nie zbliży się do ekranu (preload="none" + poster)
 * - poza ekranem filmy są zatrzymywane
 * - oba startują razem i są dosynchronizowywane, żeby pokazywały tę samą fazę ruchu
 * - prefers-reduced-motion: bez autoodtwarzania, tylko przycisk
 * Dopóki klip nie ma `src`, w jego miejscu jest placeholder z opisem kadru.
 */
/** Ile sekund przed końcem pętli zaczyna się wygaszanie (musi odpowiadać czasowi przejścia w CSS) */
const PRZEJSCIE = 0.45;

export function VideoPair({ przed, po, etykieta }: { przed: Klip; po: Klip; etykieta: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // użytkownik sam zatrzymał - nie wznawiamy automatycznie
  const userPaused = useRef(false);
  const maFilmy = Boolean(przed.src && po.src);

  const play = () => {
    const [va, vb] = [a.current, b.current];
    if (!va || !vb) return;
    vb.currentTime = va.currentTime;
    Promise.all([va.play(), vb.play()])
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const pause = () => {
    a.current?.pause();
    b.current?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    const el = wrap.current;
    const [va, vb] = [a.current, b.current];
    if (!el || !va || !vb) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!reduce && !userPaused.current) play();
        } else {
          pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    // pilnuj synchronizacji (różne długości plików, przycięcia w pętli)
    const sync = () => {
      if (Math.abs(va.currentTime - vb.currentTime) > 0.25 && va.currentTime < vb.duration) {
        vb.currentTime = va.currentTime;
      }
    };
    va.addEventListener("timeupdate", sync);

    // Miękkie przejście na końcu pętli: tuż przed końcem film wygasa do pierwszej klatki
    // (poster jest tłem panelu), a po starcie od nowa pojawia się z powrotem.
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (reduce || va.paused || !va.duration) return;
      el.classList.toggle(styles.fading, va.duration - va.currentTime < PRZEJSCIE);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      va.removeEventListener("timeupdate", sync);
    };
  }, [maFilmy]);

  const pane = (klip: Klip, tag: string, ref: React.RefObject<HTMLVideoElement | null>) => (
    <div className={styles.pane} style={klip.poster ? { backgroundImage: `url(${klip.poster})` } : undefined}>
      {klip.src ? (
        <video
          ref={ref}
          className={styles.video}
          src={klip.src}
          poster={klip.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${tag}: ${klip.opis}`}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={`Miejsce na film: ${klip.opis}`}>
          <span className={styles.playIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
          <p className={styles.caption}>
            <strong>tu: film 9:16 w pętli</strong>
            <br />
            {klip.opis}
          </p>
        </div>
      )}
      {/* nagrania mają podpis „Przed / Po” w obrazie - etykieta tylko na placeholderze */}
      {!klip.src && <span className={styles.tag}>{tag}</span>}
    </div>
  );

  return (
    <div ref={wrap} className={styles.pair} role="group" aria-label={`${etykieta} - nagranie przed i po`}>
      {pane(przed, "Przed", a)}
      {pane(po, "Po", b)}

      {maFilmy && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => {
            if (playing) {
              userPaused.current = true;
              pause();
            } else {
              userPaused.current = false;
              play();
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5-11-6.5Z" />}
          </svg>
          <span className="srOnly">{playing ? "Zatrzymaj filmy" : "Odtwórz filmy"}</span>
        </button>
      )}
    </div>
  );
}
