"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookLink, PhoneLink } from "@/components/ui/BookLink";
import { site } from "@/data/site";
import styles from "./Header.module.scss";

const nav = [
  { href: "/#o-mnie", label: "O mnie" },
  { href: "/#sesja", label: "Jak pracuję" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/#faq", label: "Pytania" },
  { href: "/#dojazd", label: "Dojazd" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const hero = document.getElementById("hero");

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(hero ? y > hero.offsetHeight - 120 : true);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={clsx(
        styles.header,
        scrolled && styles.scrolled,
        open && styles.open,
      )}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark} aria-hidden="true" />
          <span>{site.nazwaKrotka}</span>
        </Link>

        <nav className={styles.nav} aria-label="Główna nawigacja">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={styles.navLink}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <PhoneLink section="naglowek" className={styles.phone} />
          <div className={clsx(styles.cta, pastHero && styles.ctaOn)} aria-hidden={!pastHero}>
            <BookLink section="naglowek" small>
              Zarezerwuj
            </BookLink>
          </div>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="srOnly">{open ? "Zamknij menu" : "Otwórz menu"}</span>
            <span className={styles.burgerLines} aria-hidden="true" />
          </button>
        </div>
      </div>

      <span className={styles.progress} data-progress aria-hidden="true" />

      <div id="menu-mobilne" className={styles.menu} hidden={!open}>
        <nav aria-label="Menu mobilne">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={styles.menuLink}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={styles.menuFoot}>
          <PhoneLink section="menu-mobilne" className="link" />
          <BookLink section="menu-mobilne" />
        </div>
      </div>
    </header>
  );
}
