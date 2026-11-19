// Generuje lekkie wersje zdjęć (AVIF + WebP w kilku szerokościach) do public/images/opt
// oraz manifest src/data/obrazy.json. Uruchom: npm run obrazy
// Żeby podmienić zdjęcie: zmień ścieżkę źródła poniżej i uruchom skrypt ponownie.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/images/opt";

/** slug -> plik źródłowy (względem public/images) */
const zrodla = {
  hero: "images/hero.jpg",
  sesja: "images/6.jpg",
  portret: "626408662_18141166651463135_3812015191030352293_n.jpg",
  pomost: "366587934_2514081082101405_3687324628428713161_n.jpg",
  "dlaczego-1": "images/23.jpg",
  "dlaczego-2": "images/1.jpg",
  "dlaczego-3": "images/18.jpg",
  final: "images/5.jpg",
};

const SZEROKOSCI = { hero: [640, 1024, 1600, 2400], final: [640, 1024, 1600, 2400] };
const DOMYSLNE = [480, 800, 1200, 1800];

// Skrypt NICZEGO nie usuwa z public/images/opt. Wpisy, których nie ma już na liście `zrodla`
// (np. "hero-stary" — poprzednie zdjęcie hero), zostają w manifeście i na dysku,
// więc można do nich wrócić, wpisując ich slug w kodzie.
const MANIFEST = "src/data/obrazy.json";
await fs.mkdir(OUT, { recursive: true });

const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8").catch(() => "{}"));
for (const [slug, plik] of Object.entries(zrodla)) {
  const src = path.join(SRC, plik);
  const meta = await sharp(src).rotate().metadata();
  const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
  const widths = (SZEROKOSCI[slug] ?? DOMYSLNE).filter((x) => x <= w);
  if (!widths.length) widths.push(w);
  for (const width of widths) {
    const base = sharp(src).rotate().resize({ width });
    await base.clone().avif({ quality: 50, effort: 5 }).toFile(path.join(OUT, `${slug}-${width}.avif`));
    await base.clone().webp({ quality: 72 }).toFile(path.join(OUT, `${slug}-${width}.webp`));
  }
  manifest[slug] = { w, h, widths };
  console.log(`✓ ${slug} (${w}×${h}) → ${widths.join(", ")}`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
