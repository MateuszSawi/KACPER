/**
 * Pięć gwiazdek. Z `label` to obrazek z opisem dla czytników ekranu (np. „Ocena: 5 na 5 gwiazdek”),
 * bez niego - sama dekoracja. Rozmiar i kolor ustawia klasa przekazana z sekcji.
 */
export function Gwiazdki({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {[0, 1, 2, 3, 4].map((g) => (
        <svg key={g} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M6 .8 7.5 4.3l3.8.3-2.9 2.5.9 3.7L6 8.8 2.7 10.8l.9-3.7L.7 4.6l3.8-.3L6 .8Z" />
        </svg>
      ))}
    </span>
  );
}
