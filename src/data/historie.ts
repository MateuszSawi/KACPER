/**
 * HISTORIE KLIENTÓW (studia przypadku)
 *
 * Wpisy z `przyklad: true` to teksty robocze - obowiązują te same zasady
 * co w opinie.ts (etykieta „Przykład” + noindex całej strony).
 */

/**
 * Film do porównania „przed / po”.
 * Surowe nagrania wrzuć do folderu wideo-zrodla/ i uruchom `npm run wideo` -
 * skrypt przygotuje plik MP4 i klatkę-poster w public/video/. Potem wpisz tu ścieżki,
 * np. src: "/video/historia-1-przed.mp4", poster: "/video/historia-1-przed.webp".
 * Bez `src` na stronie jest placeholder z opisem kadru.
 */
export type Klip = { opis: string; src?: string; poster?: string };

export type Historia = {
  kto: string;
  zCzym: string;
  coZrobilismy: string;
  coSieZmienilo: string;
  sesje: string;
  /** Dwa krótkie filmy 9:16 w pętli, pokazywane obok siebie */
  wideo: { przed: Klip; po: Klip };
  przyklad?: boolean;
};

export const historie: Historia[] = [
  {
    kto: "Właściciel firmy, 47 lat, Gdynia",
    zCzym: "Sztywność w odcinku lędźwiowym po długich trasach autem. Po dwóch godzinach jazdy pierwsze kroki stawiał zgięty.",
    coZrobilismy: "Cztery sesje w pięć tygodni: praca z tkankami bioder, pośladków i dolnych pleców oraz dwa krótkie nawyki na postoje w trasie.",
    coSieZmienilo: "Wysiada z auta i po prostu idzie. Wrócił do porannych spacerów z psem, z których zrezygnował rok wcześniej.",
    sesje: "4 sesje · 5 tygodni",
    wideo: {
      przed: { opis: "uniesienie rąk nad głowę, widok z przodu - przed wizytą", src: "/video/przed-1.mp4", poster: "/video/przed-1.webp" },
      po: { opis: "uniesienie rąk nad głowę, widok z przodu - po wizycie", src: "/video/po-1.mp4", poster: "/video/po-1.webp" },
    },
    przyklad: true,
  },
  {
    kto: "Menedżerka, 38 lat, Rumia",
    zCzym: "Sztywny kark i ucisk w głowie pod koniec dnia. Osiem godzin przy laptopie, wieczorem telefon.",
    coZrobilismy: "Trzy sesje: kark, szyja, barki i okolica między łopatkami. Do tego jedna zmiana w ustawieniu monitora i ćwiczenie na 90 sekund.",
    coSieZmienilo: "Obraca głowę przy cofaniu auta bez skręcania całego tułowia. Popołudniowy ucisk w głowie pojawia się wyraźnie rzadziej.",
    sesje: "3 sesje · 4 tygodnie",
    wideo: {
      przed: { opis: "uniesienie rąk nad głowę, widok z przodu - przed wizytą", src: "/video/przed-2.mp4", poster: "/video/przed-2.webp" },
      po: { opis: "uniesienie rąk nad głowę, widok z przodu - po wizycie", src: "/video/po-2.mp4", poster: "/video/po-2.webp" },
    },
    przyklad: true,
  },
  {
    kto: "Trenujący trójbój, 29 lat, Reda",
    zCzym: "Napięte barki i ograniczone uniesienie ręki. Wyciskanie nad głowę przestało być komfortowe.",
    coZrobilismy: "Pięć sesji rozłożonych na cykl treningowy: obręcz barkowa, klatka piersiowa, przedramiona. Korekta rozgrzewki przed treningiem góry.",
    coSieZmienilo: "Ręka idzie nad głowę bez kompensowania plecami. Wrócił do pełnych jednostek treningowych.",
    sesje: "5 sesji · 8 tygodni",
    wideo: {
      przed: { opis: "uniesienie nogi w staniu - przed wizytą", src: "/video/przed-3.mp4", poster: "/video/przed-3.webp" },
      po: { opis: "uniesienie nogi w staniu - po wizycie", src: "/video/po-3.mp4", poster: "/video/po-3.webp" },
    },
    przyklad: true,
  },
];
