import { historie } from "@/data/historie";
import { opinie } from "@/data/opinie";
import { site } from "@/data/site";

/** Lista miejsc, w których wciąż są treści przykładowe (zmyślone). */
export function znajdzPrzyklady(): string[] {
  const gdzie: string[] = [];
  const o = opinie.filter((x) => x.przyklad).length;
  const h = historie.filter((x) => x.przyklad).length;
  if (o) gdzie.push(`src/data/opinie.ts - ${o} opinii`);
  if (h) gdzie.push(`src/data/historie.ts - ${h} historii`);
  if (site.ocena.przyklad) gdzie.push("src/data/site.ts → ocena");
  return gdzie;
}

export const saPrzyklady = znajdzPrzyklady().length > 0;

const g = globalThis as { __ostrzezeniePrzyklady?: boolean };

/** Wypisuje ostrzeżenie raz na proces (build / dev). */
export function ostrzezOPrzykladach() {
  if (!saPrzyklady || g.__ostrzezeniePrzyklady) return;
  g.__ostrzezeniePrzyklady = true;
  console.warn(
    [
      "",
      "⚠️  UWAGA: strona zawiera treści PRZYKŁADOWE (przyklad: true).",
      "    Cała witryna dostaje <meta name=\"robots\" content=\"noindex\">.",
      ...znajdzPrzyklady().map((x) => `    • ${x}`),
      "    Podmień je na prawdziwe dane, zanim opublikujesz stronę.",
      "",
    ].join("\n"),
  );
}
