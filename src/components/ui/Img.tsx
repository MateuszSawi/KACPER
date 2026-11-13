import manifest from "@/data/obrazy.json";

export type ObrazSlug = keyof typeof manifest;

type Props = {
  slug: ObrazSlug;
  alt: string;
  /** Atrybut sizes - jak szeroko obraz jest wyświetlany, np. "(min-width: 1024px) 40vw, 100vw" */
  sizes: string;
  /** true tylko dla obrazu w hero (ładowany od razu, z wysokim priorytetem) */
  priority?: boolean;
  className?: string;
};

/**
 * Obraz z wersji wygenerowanych przez `npm run obrazy` (AVIF + WebP, kilka szerokości).
 * Wymiary są w kodzie, więc nic się nie przesuwa podczas ładowania.
 */
export function Img({ slug, alt, sizes, priority, className }: Props) {
  const { w, h, widths } = manifest[slug];
  const set = (ext: string) => widths.map((x) => `/images/opt/${slug}-${x}.${ext} ${x}w`).join(", ");
  const fallback = widths[Math.min(widths.length - 1, 2)];

  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        className={className}
        src={`/images/opt/${slug}-${fallback}.webp`}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
