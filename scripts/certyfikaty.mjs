// Dyplomy i certyfikaty: ze zdjęć z telefonu (certyfikaty-zrodla/) robi lekkie pliki WebP
// w public/images/certyfikaty oraz listę src/data/certyfikaty.json. Uruchom: npm run certyfikaty
//
// Żeby dodać certyfikat: wrzuć zdjęcie do certyfikaty-zrodla/, dopisz wpis na liście poniżej
// (kolejność na liście = kolejność na stronie) i uruchom skrypt.
//
// UWAGA: surowe zdjęcia zawierają dane osobowe (PESEL, data urodzenia), dlatego leżą poza
// katalogiem public/ i poza repozytorium. Pola do zamazania podaje `zamaz` - prostokąty
// [lewo, góra, prawo, dół] jako ułamki szerokości i wysokości zdjęcia (po obróceniu).
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "certyfikaty-zrodla";
const OUT = "public/images/certyfikaty";
const MANIFEST = "src/data/certyfikaty.json";

const lista = [
  {
    id: "dyplom-technik-masazysta",
    plik: "20261117_194745.jpg",
    tytul: "Dyplom zawodowy: technik masażysta",
    wystawca: "2024",
    zamaz: [
      [0.235, 0.342, 0.415, 0.375], // data urodzenia
      [0.615, 0.342, 0.775, 0.375], // PESEL
    ],
  },
  {
    id: "dyplom-czeladniczy-naturopata",
    plik: "20261117_195001.jpg",
    tytul: "Dyplom czeladniczy: naturopata",
    wystawca: "Lubelska Izba Rzemieślnicza, 2024",
    zamaz: [[0.405, 0.412, 0.57, 0.458]], // data urodzenia
  },
  {
    id: "swiadectwo-czeladnicze-naturopata",
    plik: "20261117_195226.jpg",
    tytul: "Świadectwo czeladnicze: naturopata",
    wystawca: "Lubelska Izba Rzemieślnicza, 2024",
    zamaz: [[0.6, 0.228, 0.775, 0.257]], // data urodzenia
  },
  {
    id: "cech-naturopatow",
    plik: "20261117_200015.jpg",
    tytul: "Członkostwo w Lubelskim Cechu Naturopatów, Radiestetów i Bioenergoterapeutów",
    wystawca: "2025",
  },
  {
    id: "masaz-tkanek-glebokich",
    plik: "20261117_193835.jpg",
    tytul: "Masaż tkanek głębokich w ujęciu klinicznym",
    wystawca: "Neuro Projekt, 2024",
  },
  {
    id: "terapia-manualna-aun",
    plik: "20261117_194007.jpg",
    tytul: "Terapia manualna autonomicznego układu nerwowego",
    wystawca: "Neuro Projekt, 2024",
  },
  {
    id: "terapia-wisceralna",
    plik: "20261117_194058.jpg",
    tytul: "Terapia wisceralna",
    wystawca: "Neuro Projekt, 2024",
  },
  {
    id: "pinoterapia",
    plik: "20261117_193703.jpg",
    tytul: "Pinoterapia",
    wystawca: "FRSc by dr Składowski, 2024",
  },
  {
    id: "gral-1",
    plik: "20261117_194211.jpg",
    tytul: "Medycyna manualna - GRAL I",
    wystawca: "Bielecki Szkolenia",
  },
  {
    id: "gral-2",
    plik: "20261117_194348.jpg",
    tytul: "Terapie odruchowe w holistycznym usprawnianiu człowieka - GRAL II",
    wystawca: "Bielecki Szkolenia",
  },
  {
    id: "gral-3",
    plik: "20261117_194507.jpg",
    tytul: "Komplementarne metody terapii - GRAL III",
    wystawca: "Bielecki Szkolenia",
  },
  { id: "masaz-medyczny", plik: "20261117_195920.jpg", tytul: "Masaż medyczny", wystawca: "TEB Edukacja" },
  { id: "masaz-sportowy", plik: "20261117_195946.jpg", tytul: "Masaż sportowy", wystawca: "TEB Edukacja" },
  { id: "masaz-profilaktyczny", plik: "20261117_195908.jpg", tytul: "Masaż profilaktyczny", wystawca: "TEB Edukacja" },
  { id: "masaz-kosmetyczny", plik: "20261117_195851.jpg", tytul: "Masaż kosmetyczny", wystawca: "TEB Edukacja" },
  { id: "podstawy-fizjoterapii", plik: "20261117_195742.jpg", tytul: "Podstawy fizjoterapii", wystawca: "TEB Edukacja" },
  {
    id: "kettlebell",
    plik: "20261117_195814.jpg",
    tytul: "Trening kettlebell „300 Maxwella”",
    wystawca: "Polskie Stowarzyszenie Kettlebell i Fitness",
  },
  {
    id: "bulgarian-bag",
    plik: "20261117_195759.jpg",
    tytul: "Bulgarian Bag",
    wystawca: "Suples Training Systems, 2025",
  },
];

/** Najdłuższy bok dużej wersji (okno podglądu) i wysokość miniatury (rząd na stronie, ×2 dla ostrych ekranów) */
const DUZY = 1800;
const MINIATURA = 240;

await fs.mkdir(OUT, { recursive: true });
const manifest = [];

for (const c of lista) {
  // 1. obrót według danych z aparatu
  let obraz = await sharp(path.join(SRC, c.plik)).rotate().toBuffer();
  const { width: W, height: H } = await sharp(obraz).metadata();

  // 2. zamazanie danych osobowych: fragment zmniejszony do kilku pikseli i rozciągnięty z powrotem
  //    (nie da się go odtworzyć, w przeciwieństwie do zwykłego rozmycia)
  if (c.zamaz?.length) {
    const laty = [];
    for (const [l, t, r, b] of c.zamaz) {
      const pole = {
        left: Math.round(l * W),
        top: Math.round(t * H),
        width: Math.round((r - l) * W),
        height: Math.round((b - t) * H),
      };
      const maly = await sharp(obraz).extract(pole).resize(6, 2, { fit: "fill" }).toBuffer();
      const lata = await sharp(maly).resize(pole.width, pole.height, { fit: "fill", kernel: "cubic" }).toBuffer();
      laty.push({ input: lata, left: pole.left, top: pole.top });
    }
    obraz = await sharp(obraz).composite(laty).toBuffer();
  }

  // 3. obcięcie tła (blat stołu) dookoła dokumentu
  obraz = await sharp(obraz).trim({ threshold: 60 }).toBuffer();

  const duzy = await sharp(obraz)
    .resize({ width: DUZY, height: DUZY, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${c.id}.webp`));
  const mini = await sharp(obraz)
    .resize({ height: MINIATURA })
    .webp({ quality: 74 })
    .toFile(path.join(OUT, `${c.id}-m.webp`));

  manifest.push({ id: c.id, tytul: c.tytul, wystawca: c.wystawca, w: duzy.width, h: duzy.height, mw: mini.width, mh: mini.height });
  console.log(`✓ ${c.id} (${duzy.width}×${duzy.height}, ${Math.round(duzy.size / 1024)} kB)`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`✓ certyfikaty: ${manifest.length}`);
