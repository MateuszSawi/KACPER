import type { UslugaId } from "./oferta";

export type StrefaId =
  | "glowa"
  | "kark"
  | "barki"
  | "lopatki"
  | "ledzwia"
  | "biodra"
  | "przedramiona"
  | "nogi";

export type Strefa = {
  id: StrefaId;
  nazwa: string;
  /** Na której sylwetce strefa jest zaznaczona */
  widok: "przod" | "tyl";
  /** Dwa zdania językiem klienta: co zwykle za tym stoi */
  opis: string;
  usluga: UslugaId;
};

export const strefy: Strefa[] = [
  {
    id: "glowa",
    nazwa: "Głowa",
    widok: "przod",
    opis: "Ucisk w skroniach albo obręcz wokół głowy pod koniec dnia często zaczyna się niżej - w napiętym karku, szczęce i barkach. Im dłużej patrzysz w ekran, tym mocniej to czuć.",
    usluga: "kark",
  },
  {
    id: "kark",
    nazwa: "Kark",
    widok: "tyl",
    opis: "Sztywność przy obracaniu głowy, najgorsza rano albo po całym dniu przy laptopie. Zwykle to efekt godzin spędzonych z głową wysuniętą do przodu.",
    usluga: "kark",
  },
  {
    id: "barki",
    nazwa: "Barki",
    widok: "przod",
    opis: "Barki podciągnięte pod uszy i twarde jak kamień, kiedy ktoś ich dotknie. Tak ciało odkłada stres, pracę przy biurku i ciężkie treningi góry.",
    usluga: "tkanki-glebokie",
  },
  {
    id: "lopatki",
    nazwa: "Między łopatkami",
    widok: "tyl",
    opis: "Tępe, piekące napięcie, którego nie da się samemu rozmasować ani rozciągnąć. Typowe dla osób, które godzinami siedzą z zaokrąglonymi plecami.",
    usluga: "plecy",
  },
  {
    id: "ledzwia",
    nazwa: "Lędźwia",
    widok: "tyl",
    opis: "Po dwóch godzinach w aucie albo na krześle trudno się wyprostować, a pierwsze kroki są sztywne. Napięcie w odcinku lędźwiowym rzadko jest tylko „sprawą pleców” - często trzymają też biodra.",
    usluga: "plecy",
  },
  {
    id: "biodra",
    nazwa: "Biodra i pośladki",
    widok: "tyl",
    opis: "Ciągnięcie w pośladku, sztywne biodra po wstaniu z fotela, dyskomfort przy dłuższym siedzeniu. Siedzący tryb pracy skraca i usztywnia tkanki, które powinny być sprężyste.",
    usluga: "powieziowy",
  },
  {
    id: "przedramiona",
    nazwa: "Przedramiona",
    widok: "przod",
    opis: "Zmęczone, twarde przedramiona i napięte dłonie po dniu z myszką, telefonem albo sztangą. Drobne mięśnie pracują godzinami bez przerwy i w końcu przestają odpuszczać.",
    usluga: "powieziowy",
  },
  {
    id: "nogi",
    nazwa: "Nogi",
    widok: "przod",
    opis: "Ciężkie uda i łydki, które nie nadążają z regeneracją między treningami albo sztywnieją po dniu na stojąco. Tkanki potrzebują pracy, której samo rolowanie nie zastąpi.",
    usluga: "sportowy",
  },
];
