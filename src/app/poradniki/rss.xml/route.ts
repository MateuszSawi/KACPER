import { site } from "@/data/site";
import { poradniki } from "@/lib/poradniki";

// Eksport statyczny: plik powstaje raz, przy buildzie (out/poradniki/rss.xml).
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  // poradniki() zwraca tylko opublikowane wpisy - szkice nie trafiają do kanału
  const wpisy = poradniki();
  const items = wpisy
    .map((p) => {
      const url = `${site.url}/poradniki/${p.slug}/`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        p.description ? `      <description>${esc(p.description)}</description>` : "",
        p.category ? `      <category>${esc(p.category)}</category>` : "",
        p.pubDate ? `      <pubDate>${new Date(`${p.pubDate}T08:00:00Z`).toUTCString()}</pubDate>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`Poradniki - ${site.nazwa}`)}</title>
    <link>${site.url}/poradniki/</link>
    <description>Poradniki o napięciu pleców, karku i barków.</description>
    <language>pl</language>
    <atom:link href="${site.url}/poradniki/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
