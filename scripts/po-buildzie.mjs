// Uruchamiany po `next build`. Eksport statyczny zapisuje pliki do wstępnego ładowania podstron
// w podkatalogach (out/poradniki/__next.poradniki/__PAGE__.txt), a przeglądarka prosi o nazwę
// z kropkami (out/poradniki/__next.poradniki.__PAGE__.txt). Bez tej kopii zwykły serwer plików
// odpowiada 404 i przejście na podstronę trwa dłużej. Kopiujemy więc pliki pod oczekiwane nazwy.
import fs from "node:fs/promises";
import path from "node:path";

const OUT = "out";
let kopie = 0;

async function splaszcz(katalog, prefiks, cel) {
  for (const w of await fs.readdir(katalog, { withFileTypes: true })) {
    const p = path.join(katalog, w.name);
    if (w.isDirectory()) await splaszcz(p, `${prefiks}.${w.name}`, cel);
    else {
      await fs.copyFile(p, path.join(cel, `${prefiks}.${w.name}`));
      kopie++;
    }
  }
}

async function przejdz(katalog) {
  for (const w of await fs.readdir(katalog, { withFileTypes: true })) {
    if (!w.isDirectory() || w.name === "_next") continue;
    const p = path.join(katalog, w.name);
    if (w.name.startsWith("__next.")) await splaszcz(p, w.name, katalog);
    else await przejdz(p);
  }
}

await przejdz(OUT);
console.log(`✓ pliki wstępnego ładowania podstron: ${kopie}`);
