import styles from "./ZnaszTo.module.scss";

/** Akcent pod hero: jedno zdanie na miękkim gradiencie - pas, nie pełna sekcja. */
export function ZnaszTo() {
  return (
    <aside id="znasz-to" className={styles.band} data-theme="green">
      <div className="container">
        <p className={`display ${styles.text}`} data-split>
          <span className={styles.part}>Ciało ostrzega długo, zanim drobny ból </span>
          <span className={styles.part}>zrobi się poważnym problemem.</span>
        </p>
      </div>
    </aside>
  );
}
