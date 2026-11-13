"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { BookLink } from "@/components/ui/BookLink";
import { uslugi } from "@/data/oferta";
import { strefy, type Strefa, type StrefaId } from "@/data/strefy";
import styles from "./BodyMap.module.scss";

// ---------- Geometria sylwetki (viewBox 0 0 160 410, oś symetrii x = 80) ----------

const HALF =
  "M80 52 L88 52 C88 59 90 63 97 66 C107 69 117 71 123 79 C129 87 130 97 131 109 C132 125 134 139 136 153 C138 167 141 183 143 199 C144 205 146 211 145 219 C144 227 139 229 136 225 C134 217 133 209 132 201 C129 185 126 171 123 157 C121 143 119 129 117 116 C116 128 114 141 113 153 C112 165 114 175 117 187 C120 201 121 217 119 237 C117 257 114 273 112 289 C111 301 113 313 112 327 C111 345 107 363 105 381 C105 389 111 395 113 401 L97 401 C95 395 96 389 95 381 C93 363 91 345 91 327 C91 313 92 301 90 289 C88 269 85 247 83 223 L80 216";
const MIRROR = "translate(160 0) scale(-1 1)";

type Ellipse = { cx: number; cy: number; rx: number; ry: number; rot?: number };

const geom: Record<StrefaId, { shapes: Ellipse[]; dots: [number, number][] }> = {
  glowa: { shapes: [{ cx: 80, cy: 31, rx: 17, ry: 21 }], dots: [[80, 26]] },
  kark: { shapes: [{ cx: 80, cy: 60, rx: 13, ry: 10 }], dots: [[80, 60]] },
  barki: {
    shapes: [
      { cx: 110, cy: 80, rx: 19, ry: 13 },
      { cx: 50, cy: 80, rx: 19, ry: 13 },
    ],
    dots: [
      [112, 80],
      [48, 80],
    ],
  },
  lopatki: { shapes: [{ cx: 80, cy: 102, rx: 24, ry: 20 }], dots: [[80, 102]] },
  ledzwia: { shapes: [{ cx: 80, cy: 152, rx: 30, ry: 17 }], dots: [[80, 152]] },
  biodra: { shapes: [{ cx: 80, cy: 196, rx: 40, ry: 22 }], dots: [[80, 196]] },
  przedramiona: {
    shapes: [
      { cx: 133, cy: 178, rx: 10, ry: 30, rot: -9 },
      { cx: 27, cy: 178, rx: 10, ry: 30, rot: 9 },
    ],
    dots: [
      [133, 178],
      [27, 178],
    ],
  },
  nogi: {
    shapes: [
      { cx: 101, cy: 300, rx: 18, ry: 78 },
      { cx: 59, cy: 300, rx: 18, ry: 78 },
    ],
    dots: [
      [101, 275],
      [59, 275],
    ],
  },
};

const ell = (e: Ellipse, grow = 0) => ({
  cx: e.cx,
  cy: e.cy,
  rx: e.rx + grow,
  ry: e.ry + grow,
  transform: e.rot ? `rotate(${e.rot} ${e.cx} ${e.cy})` : undefined,
});

function Figure({
  widok,
  active,
  onSelect,
}: {
  widok: Strefa["widok"];
  active: StrefaId;
  onSelect: (id: StrefaId) => void;
}) {
  const clip = `sylwetka-${widok}`;
  const zones = strefy.filter((s) => s.widok === widok);

  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 160 410" className={styles.svg} role="group" aria-label={`Sylwetka - ${widok === "przod" ? "przód" : "tył"}`}>
        <defs>
          <clipPath id={clip}>
            <ellipse cx="80" cy="31" rx="16" ry="20" />
            <path d={`${HALF} Z`} />
            <path d={`${HALF} Z`} transform={MIRROR} />
          </clipPath>
        </defs>

        {/* wypełnienie */}
        <g className={styles.fill}>
          <ellipse cx="80" cy="31" rx="16" ry="20" />
          <path d={`${HALF} Z`} />
          <path d={`${HALF} Z`} transform={MIRROR} />
        </g>

        {/* podświetlenia stref - przycięte do sylwetki */}
        <g clipPath={`url(#${clip})`} aria-hidden="true">
          {zones.map((z) =>
            geom[z.id].shapes.map((e, i) => (
              <ellipse
                key={z.id + i}
                {...ell(e)}
                className={clsx(styles.glow, active === z.id && styles.glowOn)}
                data-zone={z.id}
              />
            )),
          )}
          {/* fale rozchodzące się od punktu - tylko dla wybranej strefy */}
          {zones
            .filter((z) => z.id === active)
            .map((z) =>
              geom[z.id].dots.map(([x, y], d) =>
                [0, 1, 2].map((fala) => (
                  <circle
                    key={`${z.id}-${d}-${fala}`}
                    cx={x}
                    cy={y}
                    r="4"
                    className={styles.ripple}
                    style={
                      {
                        "--s": Math.max(...geom[z.id].shapes.map((e) => Math.max(e.rx, e.ry))) / 4,
                        "--d": `${fala * 0.75}s`,
                      } as React.CSSProperties
                    }
                  />
                )),
              ),
            )}
        </g>

        {/* kontur i detale */}
        <g className={styles.outline} aria-hidden="true">
          <ellipse cx="80" cy="31" rx="16" ry="20" />
          <path d={HALF} />
          <path d={HALF} transform={MIRROR} />
          {widok === "przod" ? (
            <g className={styles.detail}>
              <path d="M82 71 C92 69 102 69 111 73" />
              <path d="M82 71 C92 69 102 69 111 73" transform={MIRROR} />
              <path d="M80 78 V150" />
              <path d="M84 112 C92 118 102 118 110 110" />
              <path d="M84 112 C92 118 102 118 110 110" transform={MIRROR} />
            </g>
          ) : (
            <g className={styles.detail}>
              <path d="M80 58 V206" strokeDasharray="2 4" />
              <path d="M88 84 C92 100 98 110 106 114" />
              <path d="M88 84 C92 100 98 110 106 114" transform={MIRROR} />
              <path d="M80 208 C88 220 100 222 110 216" />
              <path d="M80 208 C88 220 100 222 110 216" transform={MIRROR} />
            </g>
          )}
        </g>

        {/* strefy interaktywne */}
        {zones.map((z, zi) => (
          <g
            key={z.id}
            role="button"
            tabIndex={0}
            aria-label={`${z.nazwa} - wybierz strefę`}
            aria-pressed={active === z.id}
            className={clsx(styles.zone, active === z.id && styles.zoneOn)}
            onClick={() => onSelect(z.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(z.id);
              }
            }}
          >
            {geom[z.id].shapes.map((e, i) => (
              <ellipse key={i} {...ell(e, 3)} className={styles.hit} />
            ))}
            {geom[z.id].dots.map(([x, y], i) => (
              <g key={i} className={styles.dot} style={{ "--delay": `${(zi * 0.45 + i * 0.2).toFixed(2)}s` } as React.CSSProperties}>
                <circle cx={x} cy={y} r="3" className={styles.pulse} />
                <circle cx={x} cy={y} r="2.6" className={styles.core} />
              </g>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className={styles.figLabel}>{widok === "przod" ? "Przód" : "Tył"}</figcaption>
    </figure>
  );
}

/** Kolejność prezentacji: najpierw cała lewa sylwetka (przód), potem prawa (tył) - od góry do dołu */
const kolejnosc = [...strefy.filter((s) => s.widok === "przod"), ...strefy.filter((s) => s.widok === "tyl")];

/** Ile trwa pokazywanie jednej strefy = czas narastania poświaty i paska postępu */
const CZAS = "5s";

export function BodyMap() {
  const [active, setActive] = useState<StrefaId>(kolejnosc[0].id);
  // autoprezentacja: strefy zmieniają się same, dopóki użytkownik nie wybierze którejś
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const strefa = strefy.find((s) => s.id === active)!;
  const usluga = uslugi[strefa.usluga];
  const running = auto && inView && !hover;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Następną strefę uruchamia koniec animacji (pasek postępu i poświata trwają tyle samo),
  // więc przejście następuje dokładnie wtedy, gdy poświata dojdzie do maksimum.
  // Pauza (kursor nad mapą, sekcja poza ekranem) wstrzymuje animację, a z nią przejście.
  const nastepna = () => {
    if (!auto) return;
    const i = kolejnosc.findIndex((s) => s.id === active);
    setActive(kolejnosc[(i + 1) % kolejnosc.length].id);
  };

  const select = (id: StrefaId) => {
    setAuto(false);
    setActive(id);
    // na mobile panel jest pod mapą - podjedź do niego
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="mapa-ciala"
      className={clsx("section", auto && !running && styles.paused)}
      style={{ "--czas": CZAS } as React.CSSProperties}
      data-theme="deep"
      aria-labelledby="mapa-tytul"
    >
      <div className="container">
        <header className="sectionHead">
          <h2 id="mapa-tytul" className="eyebrow" data-reveal>
            Mapa ciała
          </h2>
        </header>

        <div
          className={styles.layout}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <div className={styles.stage} data-reveal>
            <div className={styles.figures}>
              <Figure widok="przod" active={active} onSelect={select} />
              <Figure widok="tyl" active={active} onSelect={select} />
            </div>
          </div>

          {/* aria-live tylko po wyborze użytkownika - autoprezentacja nie zagaduje czytników ekranu */}
          <div ref={panelRef} className={styles.panel} aria-live={auto ? "off" : "polite"} data-reveal>
            {auto && (
              <span key={`pasek-${active}`} className={styles.progress} aria-hidden="true" onAnimationEnd={nastepna} />
            )}
            <div key={strefa.id} className={styles.panelIn}>
              <p className={styles.panelEyebrow}>
                <span className={styles.panelDot} aria-hidden="true" />
                {strefa.nazwa}
              </p>
              <h3 className={clsx("h3", styles.panelTitle)}>Co zwykle za tym stoi</h3>
              <p className={styles.panelText}>{strefa.opis}</p>

              <div className={styles.rec}>
                <p className={styles.recLabel}>Rekomendowana sesja</p>
                <p className={styles.recName}>{usluga.nazwa}</p>
                <p className={styles.recDesc}>{usluga.opis}</p>
              </div>

              <BookLink section="mapa-ciala" detail={strefa.id} className={styles.panelCta}>
                Zarezerwuj tę sesję
              </BookLink>
              <p className={styles.panelNote}>
                Pierwszy raz? Wybierz w Booksy „Pierwsza wizyta” - ta sama cena, a zaczniemy od rozmowy i oceny napięć.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
