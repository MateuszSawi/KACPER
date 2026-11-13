// Zdjęcia poradników (wgrywane przez Pages CMS do public/images/blog) → lekkie wersje
// AVIF + WebP w kilku szerokościach w public/images/opt/blog oraz manifest src/data/obrazy-blog.json.
// Uruchamia się samo przed `npm run dev` i `npm run build`, więc zdjęcie 8 MB z telefonu
// nigdy nie trafia do czytelnika w oryginale. Wyniki nie są commitowane (patrz .gitignore).
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/images/blog";
const OUT = "public/images/opt/blog";
const MANIFEST = "src/data/obrazy-blog.json";
const SZEROKOSCI = [480, 800, 1200, 1600];
const OBSLUGIWANE = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);

async function pliki(dir) {
  const wpisy = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const wynik = [];
  for (const w of wpisy) {
    const p = path.join(dir, w.name);
    if (w.isDirectory()) wynik.push(...(await pliki(p)));
    else wynik.push(p);
  }
  return wynik;
}

const mtime = (p) => fs.stat(p).then((s) => s.mtimeMs).catch(() => 0);

await fs.mkdir(OUT, { recursive: true });
const manifest = {};
let nowe = 0;

for (const src of await pliki(SRC)) {
  const rel = path.relative(SRC, src).split(path.sep).join("/");
  const ext = path.extname(src).toLowerCase();
  if (rel.startsWith(".")) continue;
  if (!OBSLUGIWANE.has(ext)) {
    console.warn(`⚠️  ${rel}: format ${ext || "?"} nie jest obsługiwany - użyj JPG, PNG lub WebP.`);
    continue;
  }

  try {
    const meta = await sharp(src).metadata();
    const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
    const widths = SZEROKOSCI.filter((x) => x <= w);
    if (!widths.length) widths.push(w);
    // nazwa plików wynikowych: ścieżka bez rozszerzenia, same bezpieczne znaki
    const base = rel
      .slice(0, -ext.length)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/ł/g, "l")
      .replace(/Ł/g, "L")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
    const zrodloMtime = await mtime(src);

    for (const width of widths) {
      const avif = path.join(OUT, `${base}-${width}.avif`);
      const webp = path.join(OUT, `${base}-${width}.webp`);
      // gotowe i nowsze od źródła - nie przeliczamy ponownie
      if ((await mtime(avif)) >= zrodloMtime && (await mtime(webp)) >= zrodloMtime) continue;
      const obraz = sharp(src).rotate().resize({ width });
      await obraz.clone().avif({ quality: 50, effort: 3 }).toFile(avif);
      await obraz.clone().webp({ quality: 72 }).toFile(webp);
      nowe++;
    }
    manifest[rel] = { base, w, h, widths };
  } catch (e) {
    // jedno zepsute zdjęcie nie może zatrzymać publikacji - strona pokaże wtedy oryginał
    console.warn(`⚠️  ${rel}: nie udało się przetworzyć (${e.message}).`);
  }
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`✓ zdjęcia poradników: ${Object.keys(manifest).length} (przeliczono wersji: ${nowe})`);
