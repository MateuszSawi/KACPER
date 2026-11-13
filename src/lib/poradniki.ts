// Poradniki (blog): pliki Markdown z content/poradniki, edytowane w Pages CMS (.pages.yml).
// Wszystko dzieje się przy buildzie - bez backendu i bazy.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

const KATALOG = path.join(process.cwd(), "content", "poradniki");
const MANIFEST = path.join(process.cwd(), "src", "data", "obrazy-blog.json");
const PREFIKS = "/images/blog/";

/** Musi zgadzać się z listą `category` w .pages.yml */
export const KATEGORIE = [
  "Gabinet i wizyta",
  "Plecy i kręgosłup",
  "Kark i barki",
  "Praca przy biurku",
  "Sport i regeneracja",
  "Codzienne nawyki",
] as const;

/** Domyślna zachęta pod wpisem - ta sama co `default` pola `cta` w .pages.yml */
export const DOMYSLNE_CTA = "Napięcie wraca mimo ćwiczeń? Popracujmy nad nim razem.";

export type Poradnik = {
  slug: string;
  title: string;
  description: string;
  /** RRRR-MM-DD albo null, gdy nie podano */
  pubDate: string | null;
  updatedDate: string | null;
  category: string | null;
  cover: string | null;
  coverAlt: string;
  /** Zdanie nad przyciskiem rezerwacji na końcu wpisu */
  cta: string;
  /** Treść wpisu jako gotowy HTML */
  html: string;
  /** Szacowany czas czytania w minutach */
  minuty: number;
};

// ---------- zdjęcia ----------

type Warianty = { base: string; w: number; h: number; widths: number[] };

function manifest(): Record<string, Warianty> {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return {}; // skrypt obrazy-blog jeszcze nie działał - pokażemy oryginały
  }
}

export type ObrazBloga = {
  src: string;
  width?: number;
  height?: number;
  avif?: string;
  webp?: string;
};

/** Zamienia ścieżkę z CMS (/images/blog/…) na zestaw lekkich wersji; bez nich zwraca oryginał. */
export function obrazBloga(sciezka: string): ObrazBloga {
  const czysta = sciezka.replace(/^\/?public\//, "/").replace(/^(?!\/|https?:)/, "/");
  if (!czysta.startsWith(PREFIKS)) return { src: czysta };
  let rel = czysta.slice(PREFIKS.length);
  try {
    rel = decodeURIComponent(rel);
  } catch {}
  const m = manifest()[rel];
  if (!m) return { src: czysta };
  const set = (ext: string) => m.widths.map((x) => `/images/opt/blog/${m.base}-${x}.${ext} ${x}w`).join(", ");
  const fallback = m.widths[Math.min(m.widths.length - 1, 2)];
  return {
    src: `/images/opt/blog/${m.base}-${fallback}.webp`,
    width: m.w,
    height: m.h,
    avif: set("avif"),
    webp: set("webp"),
  };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Zdjęcie w treści wpisu: <picture> z AVIF/WebP zamiast oryginału z telefonu. */
function obrazHtml(href: string, alt: string) {
  const o = obrazBloga(href);
  const wymiary = o.width && o.height ? ` width="${o.width}" height="${o.height}"` : "";
  const img = `<img src="${esc(o.src)}" alt="${esc(alt)}"${wymiary} loading="lazy" decoding="async">`;
  if (!o.avif || !o.webp) return img;
  const sizes = "(min-width: 768px) 720px, 100vw";
  return `<picture><source type="image/avif" srcset="${o.avif}" sizes="${sizes}"><source type="image/webp" srcset="${o.webp}" sizes="${sizes}">${img}</picture>`;
}

// ---------- Markdown ----------

const md = new Marked({ gfm: true });
md.use({
  // tytuł wpisu jest jedynym <h1> na stronie - nagłówek 1. stopnia w treści staje się <h2>
  walkTokens(token) {
    if (token.type === "heading" && token.depth === 1) token.depth = 2;
  },
  renderer: {
    image({ href, text }) {
      return obrazHtml(href, text);
    },
  },
});

// ---------- wczytywanie wpisów ----------

function data(v: unknown): string | null {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === "string") {
    const m = v.trim().match(/^\d{4}-\d{2}-\d{2}/);
    if (m) return m[0];
  }
  return null;
}

const tekst = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function slugZPliku(plik: string) {
  return plik
    .replace(/\.md$/i, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Słowa, których gabinet nie może używać (terapeuta nie jest fizjoterapeutą) - tylko ostrzeżenie.
const ZAKAZANE = /fizjoterap|rehabilitac|leczeni|leczy|diagnoz|pacjent/i;

const g = globalThis as { __poradnikiOstrzezenia?: Set<string> };
function ostrzez(komunikat: string) {
  const widziane = (g.__poradnikiOstrzezenia ??= new Set());
  if (widziane.has(komunikat)) return;
  widziane.add(komunikat);
  console.warn(`⚠️  poradniki: ${komunikat}`);
}

function wczytaj(): Poradnik[] {
  let pliki: string[] = [];
  try {
    pliki = fs.readdirSync(KATALOG).filter((p) => p.toLowerCase().endsWith(".md"));
  } catch {
    return [];
  }

  const wpisy: Poradnik[] = [];
  for (const plik of pliki) {
    let fm: Record<string, unknown>;
    let tresc: string;
    try {
      const parsed = matter(fs.readFileSync(path.join(KATALOG, plik), "utf8"));
      fm = parsed.data;
      tresc = parsed.content;
    } catch (e) {
      ostrzez(`${plik}: nie da się odczytać nagłówka pliku (${(e as Error).message}) - wpis pominięty.`);
      continue;
    }

    // Brakujące pola nie zatrzymują builda: szkic albo brak pola `draft` = wpis nieopublikowany.
    if (fm.draft !== false) continue;

    const slug = slugZPliku(plik);
    if (!slug) continue;
    const title = tekst(fm.title) || plik.replace(/\.md$/i, "");
    const description = tekst(fm.description);
    const pubDate = data(fm.pubDate);
    if (!tekst(fm.title)) ostrzez(`${plik}: brak tytułu - użyto nazwy pliku.`);
    if (!description) ostrzez(`${plik}: brak opisu do Google.`);
    if (!pubDate) ostrzez(`${plik}: brak daty publikacji - wpis trafi na koniec listy.`);
    if (ZAKAZANE.test(`${title} ${description} ${tresc}`))
      ostrzez(`${plik}: w treści jest słowo z listy zakazanych (fizjoterapia, rehabilitacja, leczenie, diagnoza, pacjent).`);

    wpisy.push({
      slug,
      title,
      description,
      pubDate,
      updatedDate: data(fm.updatedDate),
      category: tekst(fm.category) || null,
      cover: tekst(fm.cover) || null,
      coverAlt: tekst(fm.coverAlt),
      cta: tekst(fm.cta) || DOMYSLNE_CTA,
      html: md.parse(tresc, { async: false }),
      minuty: Math.max(1, Math.round(tresc.split(/\s+/).filter(Boolean).length / 200)),
    });
  }

  // najnowsze na górze; wpisy bez daty na końcu
  return wpisy.sort((a, b) => (b.pubDate ?? "").localeCompare(a.pubDate ?? "") || a.title.localeCompare(b.title, "pl"));
}

let pamiec: Poradnik[] | null = null;

/** Opublikowane poradniki (bez szkiców), od najnowszego. */
export function poradniki(): Poradnik[] {
  // w trybie dev czytamy pliki za każdym razem, żeby nowy wpis był widać po odświeżeniu
  if (process.env.NODE_ENV !== "production") return wczytaj();
  return (pamiec ??= wczytaj());
}

export const znajdzPoradnik = (slug: string) => poradniki().find((p) => p.slug === slug);

const format = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-11-12" → "12 listopada 2026" */
export const dataPoPolsku = (iso: string) => format.format(new Date(`${iso}T00:00:00Z`));
