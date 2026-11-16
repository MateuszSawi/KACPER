/**
 * JEDNO ŹRÓDŁO PRAWDY - wszystkie dane firmy.
 * Niczego stąd nie hardkoduj w komponentach.
 * Pola „[UZUPEŁNIJ: ...]” trzeba wypełnić przed publikacją (lista w README.md).
 */

export const site = {
  nazwa: "Gabinet Terapii Manualnej Kacper Łapiński",
  /** Krótka forma do logotypu w nagłówku */
  nazwaKrotka: "Kacper Łapiński",
  terapeuta: "Kacper Łapiński",
  /** Pełny adres strony, bez końcowego ukośnika */
  url: "https://example.pl", // [UZUPEŁNIJ: domena]
  jezyk: "pl-PL",

  kontakt: {
    telefon: "+48 726 400 409",
    /** Numer w formacie do linku tel: (np. +48500600700) */
    telefonHref: "+48726400409",
    email: "naturopatakacperlapinski@gmail.com",
    emailHref: "naturopatakacperlapinski@gmail.com",
  },

  adres: {
    ulica: "ul. Lotników 4",
    kod: "84-230",
    miasto: "Rumia",
    region: "pomorskie",
    kraj: "PL",
    /** Współrzędne do danych strukturalnych - [UZUPEŁNIJ] (teraz: centrum Rumi) */
    geo: { lat: 54.5709, lng: 18.3879 },
  },

  godziny: [
    // [UZUPEŁNIJ: godziny otwarcia]
    { dni: "Poniedziałek – piątek", od: "09:00", do: "20:00", schema: ["Mo", "Tu", "We", "Th", "Fr"] },
    { dni: "Sobota", od: "09:00", do: "14:00", schema: ["Sa"] },
  ],

  linki: {
    /** Profil Booksy - tu prowadzi każde „Zarezerwuj” */
    booksy: "https://booksy.com/pl-pl/instant-experiences/widget/252373?instant_experiences_enabled=true",
    opinieGoogle: "https://www.google.com/maps", // [UZUPEŁNIJ: link do opinii Google]
    /** Przycisk „Zobacz wszystkie opinie” pod księgą - puste = przycisk widać, ale nigdzie nie prowadzi */
    wszystkieOpinie: "", // [UZUPEŁNIJ: adres strony ze wszystkimi opiniami]
    instagram: "", // [UZUPEŁNIJ] - puste = nie pokazuj
    facebook: "", // [UZUPEŁNIJ]
  },

  dojazd: {
    /** Orientacyjne czasy dojazdu autem - [UZUPEŁNIJ po ustaleniu adresu] */
    czasy: [
      { miasto: "Reda", minuty: 10 },
      { miasto: "Wejherowo", minuty: 20 },
      { miasto: "Gdynia", minuty: 25 },
    ],
  },

  terapeutaInfo: {
    kwalifikacje: [
      "[UZUPEŁNIJ: kurs / dyplom 1]",
      "[UZUPEŁNIJ: kurs / dyplom 2]",
      "[UZUPEŁNIJ: kurs / dyplom 3]",
    ],
    osiagniecia: [
      "[UZUPEŁNIJ: tytuł w trójboju siłowym, rok]",
      "[UZUPEŁNIJ: rekord, rok]",
      "[UZUPEŁNIJ: start / medal, rok]",
    ],
  },

  /** Badge w hero - bez liczby opinii, żeby nie trzeba było go aktualizować */
  ocena: { wartosc: "5,0", zrodlo: "ocena klientów w Booksy", przyklad: true },

  hero: {
    /** Zdjęcie w tle - slug z scripts/obrazy.mjs ("" = nastrojowy placeholder) */
    obraz: "hero",
    /** Opcjonalne wideo w tle (ścieżka w /public); zdjęcie służy wtedy jako poster */
    wideo: "", // np. "/video/hero.mp4"
  },

  analityka: {
    /** Plausible (bez cookies). Puste = analityka wyłączona. Podaj samą domenę. */
    plausibleDomena: "",
  },
} as const;

export const telHref = `tel:${site.kontakt.telefonHref}`;
export const mailHref = `mailto:${site.kontakt.emailHref}`;
export const adresLinia = `${site.adres.ulica}, ${site.adres.kod} ${site.adres.miasto}`;
