/** Usługi i pakiety - nazwy zgodne z profilem Booksy. */

export const sesja = {
  cena: 200,
  minuty: 60,
} as const;

export type UslugaId =
  | "pierwsza-wizyta"
  | "kolejna-wizyta"
  | "powieziowy"
  | "tkanki-glebokie"
  | "plecy"
  | "sportowy"
  | "kark";

export type Usluga = {
  id: UslugaId;
  nazwa: string;
  opis: string;
};

export const uslugi: Record<UslugaId, Usluga> = {
  "pierwsza-wizyta": {
    id: "pierwsza-wizyta",
    nazwa: "Pierwsza wizyta",
    opis: "Rozmowa wstępna, ocena napięć i ruchomości, pierwsza praca manualna i plan na dalej.",
  },
  "kolejna-wizyta": {
    id: "kolejna-wizyta",
    nazwa: "Kolejna wizyta",
    opis: "Kontynuacja pracy według planu ustalonego na pierwszym spotkaniu.",
  },
  powieziowy: {
    id: "powieziowy",
    nazwa: "Masaż powięziowy",
    opis: "Powolna praca z powięzią - dla ciała, które jest „sklejone” i sztywne.",
  },
  "tkanki-glebokie": {
    id: "tkanki-glebokie",
    nazwa: "Masaż tkanek głębokich",
    opis: "Głęboka, precyzyjna praca z przewlekle napiętymi mięśniami.",
  },
  plecy: {
    id: "plecy",
    nazwa: "Masaż pleców i kręgosłupa",
    opis: "Od karku po lędźwia - dla osób, które większość dnia spędzają na siedząco.",
  },
  sportowy: {
    id: "sportowy",
    nazwa: "Masaż sportowy",
    opis: "Regeneracja i przygotowanie tkanek dla osób trenujących regularnie.",
  },
  kark: {
    id: "kark",
    nazwa: "Masaż karku i szyi",
    opis: "Dla sztywnego karku, ciężkiej głowy i barków podciągniętych pod uszy.",
  },
};

export type Pakiet = {
  sesje: number;
  cena: number;
  wyrozniony?: boolean;
};

/**
 * DO POTWIERDZENIA: ceny poniżej to propozycja.
 * Drabinka jest celowo nierówna: pakiet 3 daje mały rabat, żeby pakiet 5 był oczywistym wyborem.
 */
export const pakiety: Pakiet[] = [
  { sesje: 3, cena: 570 },
  { sesje: 5, cena: 850, wyrozniony: true },
  { sesje: 10, cena: 1500 },
];

export function pakietWyliczenia(p: Pakiet) {
  const pelna = p.sesje * sesja.cena;
  return {
    pelna,
    zaSesje: Math.round(p.cena / p.sesje),
    oszczednosc: pelna - p.cena,
    znizka: Math.round((1 - p.cena / pelna) * 100),
  };
}

export const zl = (n: number) => `${n.toLocaleString("pl-PL")} zł`;
