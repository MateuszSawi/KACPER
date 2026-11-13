"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Silnik animacji całej strony. Sekcje pozostają komponentami serwerowymi
 * i tylko oznaczają elementy atrybutami:
 *
 *   data-reveal            wejście przy scrollu (opacity + przesunięcie)
 *   data-split             nagłówek odsłaniany liniami
 *   data-line              linia rysowana od lewej (scaleX)
 *   data-parallax="0.12"   paralaksa (tylko desktop)
 *   data-count="4200"      animowany licznik (data-decimals="1")
 *   data-progress          pasek postępu przewijania
 *   data-scroll-x          rząd przesuwany w poziomie przy przewijaniu strony
 *   data-track="rezerwacja" data-section="hero"   zdarzenie analityczne
 *
 * Animowane są wyłącznie transform i opacity. prefers-reduced-motion wyłącza ruch.
 */

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function Engine() {
  const pathname = usePathname();

  // --- Raz na całą wizytę: analityka, płynne przewijanie, magnetyczne CTA ---
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    let dead = false;

    // Zdarzenia analityczne (delegacja - działa też dla treści dodanych później)
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: Record<string, string> = { sekcja: el.dataset.section ?? "nieznana" };
      if (el.dataset.detail) props.szczegol = el.dataset.detail;
      const plausible = (window as unknown as { plausible?: Plausible }).plausible;
      plausible?.(el.dataset.track!, { props });
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    // Linki do sekcji tej samej strony (menu, stopka, „Przewiń”): jedno, płynne przewinięcie.
    // Przechwytujemy klik przed routerem Next - inaczej router skacze do sekcji natychmiast,
    // a płynne przewijanie próbuje w tym samym czasie animować, co daje szarpanie.
    type Plynne = { scrollTo: (cel: HTMLElement, opcje: object) => void };
    let lenisRef: Plynne | null = null;
    const onAnchor = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const cel = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!cel) return;
      e.preventDefault();
      // Celowo nie zmieniamy adresu (#sekcja): router potraktowałby to jak przejście między
      // podstronami i uruchomił animację przejścia, która na chwilę przykrywa nagłówek.
      const naglowek = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      // klatka zwłoki: menu mobilne zdąży się zamknąć i odblokować przewijanie
      requestAnimationFrame(() => {
        if (lenisRef) {
          // wysokość nagłówka uwzględnia już scroll-padding-top ustawiony na <html>
          lenisRef.scrollTo(cel, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        } else {
          window.scrollTo({ top: cel.getBoundingClientRect().top + window.scrollY - naglowek, behavior: reduce ? "auto" : "smooth" });
        }
      });
    };
    document.addEventListener("click", onAnchor, true);
    cleanups.push(() => document.removeEventListener("click", onAnchor, true));

    if (!reduce) {
      (async () => {
        const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
          import("lenis"),
          import("@/lib/gsap"),
        ]);
        if (dead) return;

        const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
        lenisRef = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(raf);
          lenisRef = null;
          lenis.destroy();
        });

      })();
    }

    return () => {
      dead = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // --- Dla każdej podstrony: animacje wejścia ---
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("motion-on");
      return;
    }

    let dead = false;
    let revert = () => {};

    (async () => {
      const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap");
      await document.fonts.ready;
      if (dead) return;

      const desktop = window.matchMedia("(min-width: 768px)").matches;

      const ctx = gsap.context(() => {
        // Wejścia przy scrollu
        gsap.set("[data-reveal]", { y: desktop ? 36 : 18 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => {
            // Po skoku (menu, kotwica) wchodzi naraz wiele elementów. Te, które są już
            // nad ekranem, pokazujemy od razu - inaczej widoczne czekałyby w kolejce.
            const minione = els.filter((el) => el.getBoundingClientRect().bottom < 0);
            const widoczne = els.filter((el) => !minione.includes(el));
            if (minione.length) gsap.set(minione, { opacity: 1, y: 0 });
            gsap.to(widoczne, {
              opacity: 1,
              y: 0,
              duration: desktop ? 1.3 : 0.9,
              stagger: desktop ? 0.09 : 0.05,
              overwrite: true,
            });
          },
        });

        // Nagłówki odsłaniane liniami
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 108,
                duration: desktop ? 1.4 : 1,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        // Linie
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.to(el, {
            scaleX: 1,
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // Liczniki
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const fmt = (n: number) =>
            n.toLocaleString("pl-PL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          const state = { n: 0 };
          el.textContent = fmt(0);
          gsap.to(state, {
            n: target,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => (el.textContent = fmt(state.n)),
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // Pasek postępu
        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
          );
        });

        // Rząd szerszy niż ekran, przesuwany w poziomie razem z przewijaniem strony
        gsap.utils.toArray<HTMLElement>("[data-scroll-x]").forEach((el) => {
          const dystans = () => Math.max(0, el.scrollWidth - (el.parentElement?.clientWidth ?? 0));
          gsap.to(el, {
            x: () => -dystans(),
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              // Ruch zaczyna się, gdy rząd jest już dobrze widoczny, i kończy, zanim zniknie -
              // początek i koniec rzędu widać w spokoju, a nie przy samej krawędzi ekranu.
              // clamp(): jeśli rząd jest widoczny od razu po załadowaniu strony (wysokie
              // monitory), startuje od pierwszego zdania.
              start: "clamp(top 85%)",
              end: "clamp(top 18%)",
              // rząd dogania przewijanie z miękkim opóźnieniem - bez szarpania przy skokach kółka myszy
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });
        });

        // Paralaksa - tylko desktop
        if (desktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax || 0.1) * 100;
            gsap.fromTo(
              el,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });
        }
      });

      // Tryb deweloperski: po zapisaniu pliku (hot reload) React podmienia fragmenty strony
      // na nowe elementy, które miałyby stan początkowy „ukryty” i nikt by ich nie odsłonił.
      // Pokazujemy je od razu. W wersji produkcyjnej to się nie zdarza.
      let observer: MutationObserver | null = null;
      if (process.env.NODE_ENV === "development") {
        const sciezka = window.location.pathname;
        observer = new MutationObserver((records) => {
          if (window.location.pathname !== sciezka) return;
          for (const r of records) {
            r.addedNodes.forEach((n) => {
              if (!(n instanceof HTMLElement)) return;
              const els = [n, ...n.querySelectorAll<HTMLElement>("[data-reveal],[data-split],[data-line]")];
              for (const el of els) {
                if (el.matches("[data-reveal]")) gsap.set(el, { opacity: 1, y: 0 });
                if (el.matches("[data-split]")) gsap.set(el, { visibility: "visible" });
                if (el.matches("[data-line]")) gsap.set(el, { scaleX: 1 });
              }
            });
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }

      revert = () => {
        observer?.disconnect();
        ctx.revert();
      };
      root.classList.add("motion-on");
      ScrollTrigger.refresh();
    })();

    return () => {
      dead = true;
      revert();
    };
  }, [pathname]);

  return null;
}
