import clsx from "clsx";
import { Img, type ObrazSlug } from "./Img";
import styles from "./Photo.module.scss";

type Props = {
  /** Co ma być na zdjęciu (opis placeholdera, a przy prawdziwym zdjęciu - tekst alt) */
  temat: string;
  /** Wskazówka dla fotografa: kadr, światło */
  kadr: string;
  /** Slug zdjęcia z scripts/obrazy.mjs - bez niego pokazujemy placeholder */
  src?: ObrazSlug;
  /** Jak szeroko zdjęcie jest wyświetlane (atrybut sizes) */
  sizes?: string;
  /** Proporcje, np. "4 / 5" */
  ratio?: string;
  parallax?: boolean;
  tone?: "deep" | "green";
  captionTop?: boolean;
  className?: string;
};

/**
 * Zdjęcie z zielonym tonowaniem albo - gdy nie podano `src` - placeholder z opisem kadru.
 * Lista ujęć dla fotografa: ZDJECIA.md
 */
export function Photo({
  temat,
  kadr,
  src,
  sizes = "(min-width: 1024px) 42vw, 100vw",
  ratio = "4 / 5",
  parallax = true,
  tone = "deep",
  captionTop,
  className,
}: Props) {
  if (src) {
    return (
      <figure className={clsx(styles.photo, styles.real, className)} style={{ aspectRatio: ratio }}>
        <div className={styles.inner} data-parallax={parallax ? "0.07" : undefined}>
          <Img slug={src} alt={temat} sizes={sizes} className={styles.img} />
        </div>
      </figure>
    );
  }

  return (
    <figure
      className={clsx(styles.photo, styles[tone], className)}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Miejsce na zdjęcie: ${temat}`}
    >
      <div className={styles.inner} data-parallax={parallax ? "0.07" : undefined}>
        <div className={styles.light} />
      </div>
      <figcaption className={clsx(styles.caption, captionTop && styles.captionTop)}>
        <span className={styles.mark} aria-hidden="true" />
        <span>
          <strong>tu: zdjęcie - {temat}</strong>
          <br />
          kadr: {kadr}
        </span>
      </figcaption>
    </figure>
  );
}
