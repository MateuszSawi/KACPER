import { obrazBloga } from "@/lib/poradniki";

type Props = {
  /** Ścieżka zapisana przez CMS, np. /images/blog/plecy.jpg */
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Zdjęcie poradnika w lekkich wersjach (AVIF/WebP) wygenerowanych przez scripts/obrazy-blog.mjs. */
export function BlogImg({ src, alt, sizes, priority, className }: Props) {
  const o = obrazBloga(src);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- lekkie wersje robi nasz skrypt, nie next/image
    <img
      className={className}
      src={o.src}
      width={o.width}
      height={o.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
  if (!o.avif || !o.webp) return img;

  return (
    <picture>
      <source type="image/avif" srcSet={o.avif} sizes={sizes} />
      <source type="image/webp" srcSet={o.webp} sizes={sizes} />
      {img}
    </picture>
  );
}
