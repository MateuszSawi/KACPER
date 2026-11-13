import { BookLink, PhoneLink } from "@/components/ui/BookLink";
import { adresLinia, site } from "@/data/site";
import { MapEmbed } from "./MapEmbed";
import styles from "./Dojazd.module.scss";

export function Dojazd() {
  const { adres, godziny } = site;

  return (
    <section id="dojazd" className="section" data-theme="deep" aria-labelledby="dojazd-tytul">
      <div className="container">
        <header className="sectionHead">
          <h2 id="dojazd-tytul" className="eyebrow" data-reveal>
            Dojazd
          </h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.info}>
            <p className={`h3 ${styles.name}`} data-reveal>
              {site.nazwa}
            </p>

            <dl className={styles.details}>
              <div data-reveal>
                <dt>Adres</dt>
                <dd>
                  {adres.ulica}
                  <br />
                  {adres.kod} {adres.miasto}
                </dd>
              </div>
              <div data-reveal>
                <dt>Godziny</dt>
                <dd>
                  {godziny.map((g) => (
                    <span key={g.dni} className={styles.hours}>
                      {g.dni}: {g.od}–{g.do}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className={styles.actions} data-reveal>
              <BookLink section="dojazd" />
              <PhoneLink section="dojazd" className="link" />
            </div>
          </div>

          <div data-reveal>
            <MapEmbed adres={adresLinia} />
          </div>
        </div>
      </div>
    </section>
  );
}
