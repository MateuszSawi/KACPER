import styles from "./Dojazd.module.scss";

/**
 * Mapa Google widoczna od razu, bez klikania. `loading="lazy"` sprawia, że przeglądarka
 * pobiera ją dopiero, gdy użytkownik zbliża się do sekcji - nie spowalnia startu strony.
 */
export function MapEmbed({ adres }: { adres: string }) {
  return (
    <div className={styles.map}>
      <iframe
        title={`Mapa dojazdu: ${adres}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(adres)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
