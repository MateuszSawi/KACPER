import Link from "next/link";
import { BookLink, PhoneLink } from "@/components/ui/BookLink";
import { mailHref, site } from "@/data/site";
import styles from "./Footer.module.scss";

export function Footer() {
  const { adres, kontakt, godziny, linki } = site;
  const social: { href: string; label: string }[] = [
    { href: linki.instagram as string, label: "Instagram" },
    { href: linki.facebook as string, label: "Facebook" },
  ].filter((s) => s.href);

  return (
    <footer className={styles.footer} data-theme="deep">
      <div className="container">
        <div className={styles.top}>
          <p className={styles.name}>{site.nazwa}</p>
          <BookLink section="stopka" />
        </div>

        <div className={styles.grid}>
          <address className={styles.col}>
            <h2 className={styles.label}>Gabinet</h2>
            <p>
              {site.nazwa}
              <br />
              {adres.ulica}
              <br />
              {adres.kod} {adres.miasto}
            </p>
          </address>

          <div className={styles.col}>
            <h2 className={styles.label}>Kontakt</h2>
            <p>
              <PhoneLink section="stopka" className="link" />
              <br />
              <a href={mailHref} className="link">
                {kontakt.email}
              </a>
            </p>
          </div>

          <div className={styles.col}>
            <h2 className={styles.label}>Godziny</h2>
            <p>
              {godziny.map((g) => (
                <span key={g.dni} className={styles.hours}>
                  {g.dni}: {g.od}–{g.do}
                </span>
              ))}
            </p>
          </div>

          <nav className={styles.col} aria-label="Stopka">
            <h2 className={styles.label}>Na skróty</h2>
            <ul>
              <li>
                <Link href="/#oferta" className="link">
                  Oferta i pakiety
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="link">
                  Częste pytania
                </Link>
              </li>
              <li>
                <Link href="/#dojazd" className="link">
                  Dojazd
                </Link>
              </li>
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link" target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {site.nazwa}
          </p>
          <p className={styles.note}>
            Terapia manualna i masaż nie zastępują porady lekarskiej. Gabinet nie udziela świadczeń zdrowotnych.
          </p>
        </div>
      </div>
    </footer>
  );
}
