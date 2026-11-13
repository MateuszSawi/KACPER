import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { poradniki } from "@/lib/poradniki";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // tylko opublikowane wpisy - szkice (draft: true) nie trafiają do mapy strony
  const wpisy = poradniki();
  const ostatni = wpisy.map((p) => p.updatedDate ?? p.pubDate).filter(Boolean).sort().at(-1);

  return [
    { url: `${site.url}/` },
    { url: `${site.url}/poradniki/`, lastModified: ostatni ?? undefined },
    ...wpisy.map((p) => ({
      url: `${site.url}/poradniki/${p.slug}/`,
      lastModified: p.updatedDate ?? p.pubDate ?? undefined,
    })),
  ];
}
