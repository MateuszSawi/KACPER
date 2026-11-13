// Przygotowuje filmy „przed / po”: wideo-zrodla/*.{mp4,mov,m4v} → public/video/<nazwa>.mp4 + <nazwa>.webp
// Wynik: 720×1280 (9:16, przycięte do środka), H.264, bez dźwięku, maks. 12 s, gotowe do streamingu.
// Uruchom: npm run wideo   (wymaga ffmpeg w PATH)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = "wideo-zrodla";
const OUT = "public/video";
fs.mkdirSync(OUT, { recursive: true });

const pliki = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((f) => /\.(mp4|mov|m4v)$/i.test(f)) : [];
if (!pliki.length) {
  console.log(`Brak nagrań w ${SRC}/ — wrzuć tam pliki, np. historia-1-przed.mov`);
  process.exit(0);
}

const vf = "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=30";
for (const plik of pliki) {
  const nazwa = path.parse(plik).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const src = path.join(SRC, plik);
  const mp4 = path.join(OUT, `${nazwa}.mp4`);
  const poster = path.join(OUT, `${nazwa}.webp`);
  const run = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args]);

  run(["-i", src, "-t", "12", "-an", "-vf", vf, "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", "-crf", "27", "-preset", "slow", "-movflags", "+faststart", mp4]);
  run(["-i", mp4, "-frames:v", "1", "-quality", "70", poster]);

  const kb = Math.round(fs.statSync(mp4).size / 1024);
  console.log(`✓ ${plik} → /video/${nazwa}.mp4 (${kb} kB), poster: /video/${nazwa}.webp`);
}
